import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { YStack, ScrollView, Text, Button, Spinner } from 'tamagui'
import { useToastController } from '@tamagui/toast'
import { PrayerTimeService } from '../../services/prayerService'
import { PrayerResponse, Zone, MALAYSIAN_ZONES, MAIN_PRAYER_TIMES } from '../../types/prayer'
import { getCurrentPrayer, getNextPrayerCountdown } from '../../utils/prayerUtils'
import { CombinedHeader } from '../../components/prayer/CombinedHeader'
import { PrayerTimeCard } from '../../components/prayer/PrayerTimeCard'
import { QiblaDirection } from '../../components/prayer/QiblaDirection'
import { ZoneSelector } from '../../components/prayer/ZoneSelector'

export default function PrayerTimesScreen() {
  const [prayerData, setPrayerData] = useState<PrayerResponse | null>(null)
  const [selectedZone, setSelectedZone] = useState<Zone>(MALAYSIAN_ZONES[0]) // Default to KL
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const toast = useToastController()
  
  const fetchPrayerTimes = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      const data = await PrayerTimeService.fetchPrayerTimes(selectedZone.code)
      setPrayerData(data)
    } catch (error) {
      toast.show('Ralat', {
        message: error instanceof Error ? error.message : 'Gagal memuat waktu solat',
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }
  
  const onRefresh = () => {
    setRefreshing(true)
    fetchPrayerTimes(false)
  }
  
  useEffect(() => {
    fetchPrayerTimes()
  }, [selectedZone])
  
  // Auto-refresh countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (prayerData) {
        // Force re-render to update countdown
        setPrayerData({ ...prayerData })
      }
    }, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [prayerData])
  
  if (loading && !prayerData) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="#0d1117">
        <Spinner size="large" color="#1793d1" />
        <Text fontSize="$4" color="#f0f6fc" marginTop="$4">Memuat waktu solat...</Text>
      </YStack>
    )
  }
  
  if (!prayerData) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="#0d1117" padding="$4">
        <Text fontSize="$5" color="#f0f6fc" textAlign="center" marginBottom="$4">
          Gagal memuat waktu solat
        </Text>
        <Button onPress={() => fetchPrayerTimes()} backgroundColor="#1793d1">
          <Text color="#0d1117">Cuba Lagi</Text>
        </Button>
      </YStack>
    )
  }
  
  const todayPrayer = prayerData.prayerTime[0]
  const { current, next } = getCurrentPrayer(todayPrayer)
  const { timeLeft, nextPrayer } = getNextPrayerCountdown(todayPrayer)
  
  return (
    <YStack flex={1} backgroundColor="#0d1117">
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding="$4">
          {/* Zone Selector */}
          <ZoneSelector
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
          />
          
          {/* Combined Date Header and Next Prayer Countdown */}
          <CombinedHeader
            hijriDate={todayPrayer.hijri}
            gregorianDate={todayPrayer.date}
            zoneName={selectedZone.name}
            day={todayPrayer.day}
            nextPrayer={nextPrayer}
            timeLeft={timeLeft}
            currentPrayer={current}
          />
          
          {/* All Prayer Times in API Order */}
          {/* Imsak */}
          <PrayerTimeCard
            prayer={{ key: 'imsak', name: 'Imsak', nameArabic: 'إمساك' }}
            time={todayPrayer.imsak}
            isAdditional={true}
          />
          
          {/* Fajr (Subuh) */}
          <PrayerTimeCard
            prayer={{ key: 'fajr', name: 'Subuh', nameArabic: 'فجر' }}
            time={todayPrayer.fajr}
            isNext={nextPrayer === 'Subuh'}
            isCurrent={current === 'Subuh'}
            isAdditional={false}
          />
          
          {/* Syuruk */}
          <PrayerTimeCard
            prayer={{ key: 'syuruk', name: 'Syuruk', nameArabic: 'شروق' }}
            time={todayPrayer.syuruk}
            isAdditional={true}
          />
          
          {/* Dhuha */}
          <PrayerTimeCard
            prayer={{ key: 'dhuha', name: 'Dhuha', nameArabic: 'ضحى' }}
            time={todayPrayer.dhuha}
            isAdditional={true}
          />
          
          {/* Dhuhr (Zohor) */}
          <PrayerTimeCard
            prayer={{ key: 'dhuhr', name: 'Zohor', nameArabic: 'ظهر' }}
            time={todayPrayer.dhuhr}
            isNext={nextPrayer === 'Zohor'}
            isCurrent={current === 'Zohor'}
            isAdditional={false}
          />
          
          {/* Asr (Asar) */}
          <PrayerTimeCard
            prayer={{ key: 'asr', name: 'Asar', nameArabic: 'عصر' }}
            time={todayPrayer.asr}
            isNext={nextPrayer === 'Asar'}
            isCurrent={current === 'Asar'}
            isAdditional={false}
          />
          
          {/* Maghrib */}
          <PrayerTimeCard
            prayer={{ key: 'maghrib', name: 'Maghrib', nameArabic: 'مغرب' }}
            time={todayPrayer.maghrib}
            isNext={nextPrayer === 'Maghrib'}
            isCurrent={current === 'Maghrib'}
            isAdditional={false}
          />
          
          {/* Isha (Isyak) */}
          <PrayerTimeCard
            prayer={{ key: 'isha', name: 'Isyak', nameArabic: 'عشاء' }}
            time={todayPrayer.isha}
            isNext={nextPrayer === 'Isyak'}
            isCurrent={current === 'Isyak'}
            isAdditional={false}
          />
          
          {/* Qibla Direction */}
          <QiblaDirection bearing={prayerData.bearing} />
        </YStack>
      </ScrollView>
    </YStack>
  )
}
