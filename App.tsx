import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, ScrollView, RefreshControl, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PrayerTimeListItem from './src/components/PrayerTimeListItem';
import { PrayerTime } from './src/data/prayer-time';

export default function App() {
  const [prayerTime, setFormattedPrayerTime] = useState<PrayerTime[]>([]);
  const [zone, setZone] = useState<string>('WLY01');
  const [refreshing, setRefreshing] = useState(false);

  React.useEffect(() => {
    fetchData(zone);
  }, [zone]);

  const fetchData = (zone: string) => {
    setZone(zone);
    fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${zone}`)
      .then((resp) => resp.json())
      .then((data) => {
        const { date, day, hijri, imsak, syuruk, ...time } = data.prayerTime[0];
        const formatted = Object.entries(time).map(([key, value]) => {
          const timeDate = new Date("1970-01-01 " + value);
          return {
            name: key,
            time: timeDate
          };
        });
        setFormattedPrayerTime(formatted);
      })
      .catch(err => Alert.alert('Error', 'Failed to fetch prayer times'));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchData(zone);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prayer Time</Text>
      <View style={styles.zoneContainer}>
        <Text>Zone:</Text>
        <Pressable onPress={() => setZone('WLY01')} style={styles.button}><Text>WLY01</Text></Pressable>
        <Pressable onPress={() => setZone('WLY02')} style={styles.button}><Text>WLY02</Text></Pressable>
      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <FlatList
          data={prayerTime}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PrayerTimeListItem prayerTime={item} />}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  zoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});