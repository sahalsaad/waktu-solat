import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface PrayerPreferences {
  // Notification settings
  notifications: boolean
  earlyNotification: boolean
  
  // Optional prayer time visibility
  showImsak: boolean
  showSyuruk: boolean
  showDhuha: boolean
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
    try {
      const updatedPreferences = { ...preferences, ...newPreferences }
      setPreferences(updatedPreferences)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences))
    } catch (error) {
      console.error('Failed to save prayer preferences:', error)
    }
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
