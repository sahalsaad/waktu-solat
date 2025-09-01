import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { PrayerTime } from '../data/prayer-time';

interface PrayerTimeListItemProps {
  prayerTime: PrayerTime;
  isNext?: boolean;
  index: number;
}

const { width } = Dimensions.get('window');

const PrayerTimeListItem: React.FC<PrayerTimeListItemProps> = ({ 
  prayerTime, 
  isNext = false, 
  index 
}) => {
  const slideAnim = useRef(new Animated.Value(50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getPrayerIcon = (name: string): string => {
    const icons: { [key: string]: string } = {
      'Fajr': '🌅',
      'Dhuhr': '☀️',
      'Asr': '🌤️',
      'Maghrib': '🌇',
      'Isha': '🌙'
    };
    return icons[name] || '🕌';
  };

  const formatTime = (time: Date): string => {
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const getTimeUntil = (time: Date): string => {
    const now = new Date();
    const prayerTime = new Date();
    prayerTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
    
    const diff = prayerTime.getTime() - now.getTime();
    
    if (diff < 0) return '';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `in ${minutes}m`;
    } else {
      return 'now';
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        isNext && styles.nextPrayerContainer,
        {
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim }
          ],
          opacity: opacityAnim,
        }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, isNext && styles.nextIconContainer]}>
            <Text style={styles.icon}>{getPrayerIcon(prayerTime.name)}</Text>
          </View>
          <View style={styles.prayerInfo}>
            <Text style={[styles.prayerName, isNext && styles.nextPrayerName]}>
              {prayerTime.name}
            </Text>
            {isNext && (
              <Text style={styles.nextLabel}>Next Prayer</Text>
            )}
          </View>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={[styles.time, isNext && styles.nextTime]}>
            {formatTime(prayerTime.time)}
          </Text>
          {isNext && (
            <Text style={styles.timeUntil}>
              {getTimeUntil(prayerTime.time)}
            </Text>
          )}
        </View>
      </View>
      
      {isNext && <View style={styles.nextIndicator} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3748',
    borderRadius: 16,
    marginVertical: 6,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nextPrayerContainer: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#64b5f6',
    elevation: 4,
    shadowOpacity: 0.2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4a5568',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  nextIconContainer: {
    backgroundColor: '#64b5f6',
  },
  icon: {
    fontSize: 20,
  },
  prayerInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f7fafc',
    letterSpacing: 0.3,
  },
  nextPrayerName: {
    color: '#64b5f6',
    fontSize: 19,
    fontWeight: '700',
  },
  nextLabel: {
    fontSize: 12,
    color: '#90cdf4',
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e0',
    letterSpacing: 0.5,
  },
  nextTime: {
    color: '#64b5f6',
    fontSize: 20,
    fontWeight: '700',
  },
  timeUntil: {
    fontSize: 12,
    color: '#90cdf4',
    marginTop: 4,
    fontWeight: '500',
  },
  nextIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#64b5f6',
  },
});

export default PrayerTimeListItem;