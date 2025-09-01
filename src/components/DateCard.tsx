import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { ExtendedPrayerData } from '../data/prayer-time';

interface DateCardProps {
  extendedData: ExtendedPrayerData | null;
}

const DateCard: React.FC<DateCardProps> = ({ extendedData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = useCallback((): string => {
    return currentTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }, [currentTime]);

  const formatCurrentDate = useCallback((): string => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [currentTime]);

  const formatHijriDate = useCallback((hijri: string): string => {
    if (!hijri) return '';
    return hijri.replace(/(\d+)-(\d+)-(\d+)/, '$3 Hijri $2, $1 AH');
  }, []);

  if (!extendedData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingBar} />
          <Text style={styles.loadingText}>Loading date information...</Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.calendarIcon}>
          <Text style={styles.calendarEmoji}>📅</Text>
        </View>
        <Text style={styles.headerTitle}>Today's Date</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.timeSection}>
          <Text style={styles.currentTime}>{formatCurrentTime()}</Text>
          <Text style={styles.currentDate}>{formatCurrentDate()}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.hijriSection}>
          <View style={styles.hijriHeader}>
            <Text style={styles.hijriIcon}>🌙</Text>
            <Text style={styles.hijriLabel}>Islamic Date</Text>
          </View>
          <Text style={styles.hijriDate}>
            {formatHijriDate(extendedData.hijri) || extendedData.hijri}
          </Text>
        </View>

        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Imsak</Text>
            <Text style={styles.infoValue}>{extendedData.imsak}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Sunrise</Text>
            <Text style={styles.infoValue}>{extendedData.syuruk}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d3748',
    borderRadius: 20,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  loadingContainer: {
    backgroundColor: '#2d3748',
  },
  loadingContent: {
    padding: 24,
    alignItems: 'center',
  },
  loadingBar: {
    width: 80,
    height: 4,
    backgroundColor: '#4a5568',
    borderRadius: 2,
    marginBottom: 12,
  },
  loadingText: {
    color: '#a0aec0',
    fontSize: 14,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  calendarIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  calendarEmoji: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#90cdf4',
    letterSpacing: 0.3,
  },
  content: {
    padding: 20,
  },
  timeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 36,
    fontWeight: '800',
    color: '#64b5f6',
    letterSpacing: 1,
    marginBottom: 8,
  },
  currentDate: {
    fontSize: 16,
    color: '#cbd5e0',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#4a5568',
    marginVertical: 16,
    opacity: 0.5,
  },
  hijriSection: {
    marginBottom: 20,
  },
  hijriHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hijriIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  hijriLabel: {
    fontSize: 14,
    color: '#90cdf4',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  hijriDate: {
    fontSize: 16,
    color: '#f7fafc',
    fontWeight: '600',
    lineHeight: 22,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#1a1f2e',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#90cdf4',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#f7fafc',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default DateCard;