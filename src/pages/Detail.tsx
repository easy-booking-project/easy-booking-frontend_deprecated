import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, useIonAlert, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';

export const Detail: React.FC<RouteComponentProps<{ _id: string }>> = ({ match }) => {
  const _id = match.params._id;
  const history = useHistory();
  const [item, setItem] = React.useState<{
    _id?: string,
    name?: string,
    age?: number,
    gender?: string
  }>({} as any);
  React.useEffect(() => {
    async function fetchItem() {
      const response = await fetch(`/api/test?_id=${_id}`);
      const result = await response.json();
      setItem(result[0]);
    }
    if (_id) {
      fetchItem();
    }
  }, []);
  const [present] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/list" />
          </IonButtons>
          <IonTitle>{_id ? `Modify` : 'Create'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput
            type="text"
            value={item.name}
            onIonChange={({ detail }) => item.name = detail.value || undefined}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Age</IonLabel>
          <IonInput
            type="number"
            value={item.age}
            onIonChange={({ detail }) => item.age = +(detail.value || '0')}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Gender</IonLabel>
          <IonInput
            type="text"
            value={item.gender}
            onIonChange={({ detail }) => item.gender = detail.value || undefined}
          ></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={async () => {
          item._id = undefined;
          const response = await fetch(`/api/test${_id ? `?_id=${_id}` : ''}`, {
            method: _id ? 'PUT' : 'POST',
            body: JSON.stringify({
              name: item.name,
              age: item.age,
              gender: item.gender
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            history.push('/list');
          } else {
            present({
              header: 'Error',
              message: 'Please try again.',
              buttons: ['OK']
            });
          }
        }}>Save</IonButton>
      </IonContent>
    </IonPage >
  );
}