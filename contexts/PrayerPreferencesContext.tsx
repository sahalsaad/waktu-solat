import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Zone, MALAYSIAN_ZONES } from '../types/prayer'

interface PrayerPreferences {
  // Notification settings
  notifications: boolean
  earlyNotification: boolean
  
  // Optional prayer time visibility
  showImsak: boolean
  showSyuruk: boolean
  showDhuha: boolean
  
  // Zone selection
  selectedZone: Zone
}

interface PrayerPreferencesContextType {
  preferences: PrayerPreferences
  updatePreferences: (newPreferences: Partial<PrayerPreferences>) => Promise<void>
  loading: boolean
}

const defaultPreferences: PrayerPreferences = {
  notifications: true,
  earlyNotification: true,
  showImsak: true,
  showSyuruk: true,
  showDhuha: true,
  selectedZone: MALAYSIAN_ZONES[0], // Default to first zone (JHR01)
}

const PrayerPreferencesContext = createContext<PrayerPreferencesContextType | undefined>(undefined)

const STORAGE_KEY = '@prayer_preferences'

export function PrayerPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<PrayerPreferences>(defaultPreferences)
  const [loading, setLoading] = useState(true)

  // Load preferences from storage on mount
  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedPreferences = JSON.parse(stored)
        setPreferences({ ...defaultPreferences, ...parsedPreferences })
      }
    } catch (error) {
      console.error('Failed to load prayer preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (newPreferences: Partial<PrayerPreferences>) => {
    // Immediately update state for responsive UI
    const updatedPreferences = { ...preferences, ...newPreferences }
    setPreferences(updatedPreferences)
    
    // Save to storage asynchronously without awaiting
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences)).catch(error => {
      console.error('Failed to save prayer preferences:', error)
      // Optionally: revert state on error
    })
  }

  return (
    <PrayerPreferencesContext.Provider value={{ preferences, updatePreferences, loading }}>
      {children}
    </PrayerPreferencesContext.Provider>
  )
}

export function usePrayerPreferences() {
  const context = useContext(PrayerPreferencesContext)
  if (context === undefined) {
    throw new Error('usePrayerPreferences must be used within a PrayerPreferencesProvider')
  }
  return context
}
