import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrayerTime } from '../data/prayer-time';

interface PrayerTimeListItemProps {
  prayerTime: PrayerTime;
}

const PrayerTimeListItem: React.FC<PrayerTimeListItemProps> = ({ prayerTime }) => {
  return (
    <View style={styles.item}>
      <View style={styles.label}>
        <Text style={styles.name}>{prayerTime.name}</Text>
        <Text style={styles.date}>
          {prayerTime.time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PrayerTimeListItem;
