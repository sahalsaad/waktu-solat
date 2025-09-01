import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { PrayerTime } from '../data/prayer-time';

interface NextPrayerCardProps {
  nextPrayer: PrayerTime;
  loading: boolean;
}

const NextPrayerCard: React.FC<NextPrayerCardProps> = ({ nextPrayer, loading }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Pulse animation for the next prayer indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  useEffect(() => {
    const updateTimeRemaining = () => {
      if (!nextPrayer) return;

      const now = new Date();
      const prayerTime = new Date();
      prayerTime.setHours(nextPrayer.time.getHours(), nextPrayer.time.getMinutes(), 0, 0);
      
      let diff = prayerTime.getTime() - now.getTime();
      
      // If the prayer time has passed today, it's tomorrow's first prayer
      if (diff < 0) {
        prayerTime.setDate(prayerTime.getDate() + 1);
        diff = prayerTime.getTime() - now.getTime();
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else if (seconds > 0) {
        setTimeRemaining(`${seconds}s`);
      } else {
        setTimeRemaining('Now');
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [nextPrayer]);

  const getPrayerIcon = useCallback((name: string): string => {
    const icons: { [key: string]: string } = {
      'Fajr': '🌅',
      'Dhuhr': '☀️',
      'Asr': '🌤️',
      'Maghrib': '🌇',
      'Isha': '🌙'
    };
    return icons[name] || '🕌';
  }, []);

  const formatTime = useCallback((time: Date): string => {
    return time.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }, []);

  // Conditional rendering AFTER all hooks
  if (loading || !nextPrayer) {
    return (
      <Animated.View style={[styles.container, styles.loadingContainer, { opacity: fadeAnim }]}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingBar} />
          <Text style={styles.loadingText}>Loading next prayer...</Text>
        </View>
      </Animated.View>
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
        <Text style={styles.headerTitle}>Next Prayer</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <Animated.View 
        style={[
          styles.content,
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <View style={styles.prayerInfo}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{getPrayerIcon(nextPrayer.name)}</Text>
          </View>
          <View style={styles.textInfo}>
            <Text style={styles.prayerName}>{nextPrayer.name}</Text>
            <Text style={styles.prayerTime}>{formatTime(nextPrayer.time)}</Text>
          </View>
        </View>
        
        <View style={styles.countdown}>
          <Text style={styles.countdownLabel}>Time Remaining</Text>
          <Text style={styles.countdownTime}>{timeRemaining}</Text>
        </View>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
    </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e3a5f',
    borderRadius: 20,
    marginVertical: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#64b5f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#64b5f6',
  },
  loadingContainer: {
    backgroundColor: '#2d3748',
    borderColor: '#4a5568',
  },
  loadingContent: {
    padding: 24,
    alignItems: 'center',
  },
  loadingBar: {
    width: 60,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#90cdf4',
    letterSpacing: 0.5,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53e3e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 4,
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
  },
  prayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 28,
  },
  textInfo: {
    flex: 1,
  },
  prayerName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f7fafc',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  prayerTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64b5f6',
    letterSpacing: 0.3,
  },
  countdown: {
    alignItems: 'center',
    backgroundColor: '#2d3748',
    borderRadius: 16,
    padding: 16,
  },
  countdownLabel: {
    fontSize: 14,
    color: '#90cdf4',
    fontWeight: '500',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  countdownTime: {
    fontSize: 32,
    fontWeight: '800',
    color: '#64b5f6',
    letterSpacing: 1,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2d3748',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#64b5f6',
    width: '70%',
  },
});

export default NextPrayerCard;