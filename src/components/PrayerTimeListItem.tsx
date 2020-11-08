import React from 'react';
import {
    IonItem,
    IonLabel, IonNote,
} from '@ionic/react';
import { PrayerTime } from '../data/prayer-time';
import './PrayerTimeListItem.css';

interface PrayerTimeListItemProps {
  prayerTime: PrayerTime;
}

const PrayerTimeListItem: React.FC<PrayerTimeListItemProps> = ({ prayerTime }) => {
  return (
    <IonItem detail={false}>
      <IonLabel className="ion-text-wrap">
        <h1>
          {prayerTime.name}
        <span className="date">
            <IonNote><h1>{prayerTime.time.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            })}</h1></IonNote>
        </span>
        </h1>

      </IonLabel>
    </IonItem>
  );
};

export default PrayerTimeListItem;
