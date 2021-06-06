import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { NoUse } from '../components/NoUse';

import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Easy Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <NoUse></NoUse>
        <IonButton routerLink="/list">See List</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
