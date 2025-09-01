import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ScrollView, 
  RefreshControl, 
  Alert,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PrayerTimeListItem from './src/components/PrayerTimeListItem';
import Header from './src/components/Header';
import NextPrayerCard from './src/components/NextPrayerCard';
import ZoneSelector from './src/components/ZoneSelector';
import DateCard from './src/components/DateCard';
import { PrayerTime, ExtendedPrayerData } from './src/data/prayer-time';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [extendedData, setExtendedData] = useState<ExtendedPrayerData | null>(null);
  const [zone, setZone] = useState<string>('WLY01');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchData(zone);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [zone]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateNextPrayer();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [prayerTimes]);

  const fetchData = async (selectedZone: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=today&zone=${selectedZone}`
      );
      const data = await response.json();
      
      if (data.prayerTime && data.prayerTime.length > 0) {
        const { date, day, hijri, imsak, syuruk, ...times } = data.prayerTime[0];
        
        // Set extended data
        setExtendedData({
          date,
          day,
          hijri,
          imsak,
          syuruk,
          zone: selectedZone
        });

        // Format prayer times
        const formatted = Object.entries(times).map(([key, value]) => {
          const timeDate = new Date(`1970-01-01 ${value}`);
          return {
            name: formatPrayerName(key),
            time: timeDate,
            originalName: key
          };
        });

        setPrayerTimes(formatted);
        updateNextPrayer(formatted);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch prayer times. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrayerName = (name: string): string => {
    const nameMap: { [key: string]: string } = {
      'subuh': 'Fajr',
      'zohor': 'Dhuhr',
      'asar': 'Asr',
      'maghrib': 'Maghrib',
      'isyak': 'Isha'
    };
    return nameMap[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);
  };

  const updateNextPrayer = (times: PrayerTime[] = prayerTimes) => {
    if (times.length === 0) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (const prayer of times) {
      const prayerTime = prayer.time.getHours() * 60 + prayer.time.getMinutes();
      if (prayerTime > currentTime) {
        setNextPrayer(prayer);
        return;
      }
    }
    
    // If no prayer is found for today, next prayer is tomorrow's first prayer
    setNextPrayer(times[0]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(zone);
    setRefreshing(false);
  };

  const handleZoneChange = (newZone: string) => {
    setZone(newZone);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#1a1f2e" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <Header />
          
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                tintColor="#64b5f6"
                colors={['#64b5f6']}
                progressBackgroundColor="#2d3748"
              />
            }
          >
            <DateCard extendedData={extendedData} />
            
            <ZoneSelector 
              selectedZone={zone} 
              onZoneChange={handleZoneChange}
              loading={loading}
            />

            {nextPrayer && (
              <NextPrayerCard 
                nextPrayer={nextPrayer}
                loading={loading}
              />
            )}

            <View style={styles.prayerTimesContainer}>
              <Text style={styles.sectionTitle}>Today's Prayer Times</Text>
              <FlatList
                data={prayerTimes}
                keyExtractor={(item) => item.originalName || item.name}
                renderItem={({ item, index }) => (
                  <PrayerTimeListItem 
                    prayerTime={item} 
                    isNext={nextPrayer?.name === item.name}
                    index={index}
                  />
                )}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f2e',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  prayerTimesContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f7fafc',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#2d3748',
    marginVertical: 8,
    opacity: 0.3,
  },
});