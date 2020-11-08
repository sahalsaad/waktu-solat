import PrayerTimeList from '../components/PrayerTimeListItem';
import React, { useState } from 'react';
import {
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import {PrayerTime} from '../data/prayer-time';
import { timeOutline } from 'ionicons/icons';

const Home: React.FC = () => {

  const [prayerTime, setFormattedPrayerTime] = useState<PrayerTime[]>([]);
  const [zone, setZone] = useState<string>('WLY01');


  useIonViewWillEnter(() => {
    fetchData(zone);
  });

  const fetchData = (zone: string) => {
    setZone(zone);
    fetch(
        `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${zone}`
    )
        .then((resp) => resp.json())
        .then((data) => {
          const {
            date,
            day,
            hijri,
            imsak,
            syuruk,
            ...time
          } = data.prayerTime[0];
          const formatted = Object.entries(time).map(([key, value]) => {
            const time = new Date("1970-01-01 " + value);
            return {
              name: key,
              time: time
            };
          });
          setFormattedPrayerTime(formatted)
        });
  }

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
      <IonPage id="home-page">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Prayer Time <IonIcon icon={timeOutline}></IonIcon></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonRefresher slot="fixed" onIonRefresh={refresh}>
            <IonRefresherContent></IonRefresherContent>
          </IonRefresher>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">
                Waktu Solat
              </IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonItem>
            <IonLabel>Zone</IonLabel>
            <IonSelect value={zone} placeholder="Select One" onIonChange={e => fetchData(e.detail.value)}>
              <IonSelectOption value="WLY01">Kuala Lumpur, Putrajaya</IonSelectOption>
              <IonSelectOption value="WLY02">Labuan</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonList>
            {prayerTime.map(m => <PrayerTimeList key={m.name} prayerTime={m} />)}
          </IonList>
        </IonContent>
      </IonPage>
  );
};

export default Home;
