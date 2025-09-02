import React, { useState, useEffect } from 'react'
import { RefreshControl } from 'react-native'
import { YStack, XStack, ScrollView, Text, Button, Spinner, H2 } from 'tamagui'
import { Settings } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { PrayerTimeService } from '../services/prayerService'
import { PrayerResponse, PrayerTime, Zone, MALAYSIAN_ZONES, MAIN_PRAYER_TIMES } from '../types/prayer'
import { getCurrentPrayer, getNextPrayerCountdown } from '../utils/prayerUtils'
import { CombinedHeader } from '../components/prayer/CombinedHeader'
import { PrayerTimeCard } from '../components/prayer/PrayerTimeCard'
import { QiblaDirection } from '../components/prayer/QiblaDirection'
import { ZoneSelector } from '../components/prayer/ZoneSelector'
import { SettingsSheet } from '../components/prayer/SettingsSheet'
import { usePrayerPreferences } from '../contexts/PrayerPreferencesContext'
import { TEXTS } from '../constants/texts'

export default function PrayerTimesScreen() {
  const [monthlyPrayerData, setMonthlyPrayerData] = useState<PrayerResponse | null>(null)
  const [todayPrayer, setTodayPrayer] = useState<PrayerTime | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const { preferences, updatePreferences, loading: preferencesLoading } = usePrayerPreferences()
  const toast = useToastController()
  
  const selectedZone = preferences.selectedZone
  
  const handleZoneChange = async (zone: Zone) => {
    await updatePreferences({ selectedZone: zone })
  }
  
  const fetchPrayerTimes = async (showLoading = true, forceRefresh = false) => {
    try {
      if (showLoading) setLoading(true)
      
      // Use force refresh or regular fetch
      const data = forceRefresh 
        ? await PrayerTimeService.refreshPrayerTimes(selectedZone.code)
        : await PrayerTimeService.fetchPrayerTimes(selectedZone.code)
      
      setMonthlyPrayerData(data)
      
      // Extract today's prayer time from monthly data
      const todayData = PrayerTimeService.getTodayPrayerTime(data)
      if (todayData) {
        setTodayPrayer(todayData)
      } else {
        throw new Error('Tidak dapat mencari waktu solat untuk hari ini')
      }
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
    // For manual refresh, force fetch fresh data to ensure latest updates
    fetchPrayerTimes(false, true)
  }
  
  // Initial load and zone change
  useEffect(() => {
    // Only fetch when preferences are loaded and we have a zone
    if (!preferencesLoading && selectedZone) {
      fetchPrayerTimes()
    }
  }, [selectedZone, preferencesLoading])
  
  // Auto-refresh countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (todayPrayer && monthlyPrayerData) {
        // Re-extract today's data in case day changed
        const updatedTodayData = PrayerTimeService.getTodayPrayerTime(monthlyPrayerData)
        if (updatedTodayData) {
          setTodayPrayer(updatedTodayData)
        }
      }
    }, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [todayPrayer, monthlyPrayerData])
  
  if (loading && !todayPrayer) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="#0d1117">
        <Spinner size="large" color="#1793d1" />
        <Text fontSize="$4" color="#f0f6fc" marginTop="$4">
          {TEXTS.loading.prayerTimes}
        </Text>
        <Text fontSize="$2" color="#8b949e" marginTop="$2">
          {selectedZone.name}
        </Text>
      </YStack>
    )
  }
  
  if (!todayPrayer || !monthlyPrayerData) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="#0d1117" padding="$4">
        <Text fontSize="$5" color="#f0f6fc" textAlign="center" marginBottom="$4">
          Gagal memuat waktu solat
        </Text>
        <Text fontSize="$3" color="#8b949e" textAlign="center" marginBottom="$4">
          Pastikan sambungan internet aktif
        </Text>
        <Button onPress={() => fetchPrayerTimes()} backgroundColor="#1793d1">
          <Text color="#0d1117">Cuba Lagi</Text>
        </Button>
      </YStack>
    )
  }
  
  const { current, next } = getCurrentPrayer(todayPrayer)
  const { timeLeft, nextPrayer } = getNextPrayerCountdown(todayPrayer)
  
  return (
    <YStack flex={1} backgroundColor="#0d1117">
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingTop="$8"
        paddingBottom="$4"
        backgroundColor="#161b22"
        borderBottomWidth={1}
        borderBottomColor="#30363d"
      >
        {/* Left spacer to center the title */}
        <YStack width={40} />
        
        {/* Centered Title */}
        <YStack alignItems="center">
          <H2 
            fontSize="$6" 
            fontWeight="bold" 
            color="#f0f6fc"
            textAlign="center"
          >
            {TEXTS.appTitle}
          </H2>
        </YStack>
        
        {/* Settings Button */}
        <Button
          size="$3"
          circular
          chromeless
          onPress={() => setSettingsOpen(true)}
          backgroundColor="transparent"
          pressStyle={{ backgroundColor: '#30363d' }}
        >
          <Settings color="#8b949e" size={20} />
        </Button>
      </XStack>

      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#1793d1"
            title="Menarik untuk menyegarkan..."
            titleColor="#8b949e"
          />
        }
      >
        <YStack padding="$4">
          {/* Zone Selector */}
          <ZoneSelector
            selectedZone={selectedZone}
            onZoneChange={handleZoneChange}
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
          
          {/* All Prayer Times in API Order with conditional rendering */}
          {/* Imsak - Optional */}
          {preferences.showImsak && (
            <PrayerTimeCard
              prayer={{ key: 'imsak', name: TEXTS.prayers.imsak, nameArabic: 'إمساك' }}
              time={todayPrayer.imsak}
              isAdditional={true}
            />
          )}
          
          {/* Fajr (Subuh) - Always shown */}
          <PrayerTimeCard
            prayer={{ key: 'fajr', name: TEXTS.prayers.subuh, nameArabic: 'فجر' }}
            time={todayPrayer.fajr}
            isNext={nextPrayer === TEXTS.prayers.subuh}
            isCurrent={current === TEXTS.prayers.subuh}
            isAdditional={false}
          />
          
          {/* Syuruk - Optional */}
          {preferences.showSyuruk && (
            <PrayerTimeCard
              prayer={{ key: 'syuruk', name: TEXTS.prayers.syuruk, nameArabic: 'شروق' }}
              time={todayPrayer.syuruk}
              isAdditional={true}
            />
          )}
          
          {/* Dhuha - Optional */}
          {preferences.showDhuha && (
            <PrayerTimeCard
              prayer={{ key: 'dhuha', name: TEXTS.prayers.dhuha, nameArabic: 'ضحى' }}
              time={todayPrayer.dhuha}
              isAdditional={true}
            />
          )}
          
          {/* Dhuhr (Zohor) - Always shown */}
          <PrayerTimeCard
            prayer={{ key: 'dhuhr', name: TEXTS.prayers.zohor, nameArabic: 'ظهر' }}
            time={todayPrayer.dhuhr}
            isNext={nextPrayer === TEXTS.prayers.zohor}
            isCurrent={current === TEXTS.prayers.zohor}
            isAdditional={false}
          />
          
          {/* Asr (Asar) - Always shown */}
          <PrayerTimeCard
            prayer={{ key: 'asr', name: TEXTS.prayers.asar, nameArabic: 'عصر' }}
            time={todayPrayer.asr}
            isNext={nextPrayer === TEXTS.prayers.asar}
            isCurrent={current === TEXTS.prayers.asar}
            isAdditional={false}
          />
          
          {/* Maghrib - Always shown */}
          <PrayerTimeCard
            prayer={{ key: 'maghrib', name: TEXTS.prayers.maghrib, nameArabic: 'مغرب' }}
            time={todayPrayer.maghrib}
            isNext={nextPrayer === TEXTS.prayers.maghrib}
            isCurrent={current === TEXTS.prayers.maghrib}
            isAdditional={false}
          />
          
          {/* Isha (Isyak) - Always shown */}
          <PrayerTimeCard
            prayer={{ key: 'isha', name: TEXTS.prayers.isyak, nameArabic: 'عشاء' }}
            time={todayPrayer.isha}
            isNext={nextPrayer === TEXTS.prayers.isyak}
            isCurrent={current === TEXTS.prayers.isyak}
            isAdditional={false}
          />
          
          {/* Qibla Direction */}
          <QiblaDirection bearing={monthlyPrayerData.bearing} />
        </YStack>
      </ScrollView>

      {/* Settings Sheet */}
      <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </YStack>
  )
}
