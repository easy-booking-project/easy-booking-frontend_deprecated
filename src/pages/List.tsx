import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { add } from "ionicons/icons";
import React from 'react';

export const List: React.FC = () => {
  const [items, setItems] = React.useState<{
    _id: string,
    name: string,
    age: number,
    gender: string
  }[]>();
  React.useEffect(() => {
    async function fetchItems() {
      const response = await fetch('/api/test');
      const result = await response.json();
      setItems(result);
    }
    fetchItems();
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={`/detail`}>
              <IonIcon slot="icon-only" icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          items?.map(item => (
            <IonItem button routerLink={`/detail/${item._id}`}>
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ))
        }
      </IonContent>
    </IonPage>
  );
}