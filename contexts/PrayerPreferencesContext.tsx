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
  lastError: string | null
  clearPreferences: () => Promise<void>
  debugStorage: () => Promise<void>
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
  const [lastError, setLastError] = useState<string | null>(null)

  // Load preferences from storage on mount
  useEffect(() => {
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      setLastError(null)
      
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      
      if (stored) {
        try {
          const parsedPreferences = JSON.parse(stored)
          
          // Validate the stored data structure
          const validatedPreferences = {
            ...defaultPreferences,
            ...parsedPreferences,
            // Ensure selectedZone has proper structure
            selectedZone: parsedPreferences.selectedZone || defaultPreferences.selectedZone
          }
          
          setPreferences(validatedPreferences)
        } catch (parseError) {
          setLastError('Data parsing failed - using defaults')
          setPreferences(defaultPreferences)
        }
      } else {
        setPreferences(defaultPreferences)
      }
    } catch (error) {
      setLastError(`Storage error: ${error instanceof Error ? error.message : 'Unknown'}`)
      setPreferences(defaultPreferences)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (newPreferences: Partial<PrayerPreferences>) => {
    try {
      setLastError(null)
      
      // Immediately update state for responsive UI
      const updatedPreferences = { ...preferences, ...newPreferences }
      setPreferences(updatedPreferences)
      
      // Save to storage with proper error handling
      const serializedData = JSON.stringify(updatedPreferences)
      await AsyncStorage.setItem(STORAGE_KEY, serializedData)
      
    } catch (error) {
      const errorMessage = `Save failed: ${error instanceof Error ? error.message : 'Unknown'}`
      setLastError(errorMessage)
      
      // On error, try to revert to previous state
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          const previousPreferences = JSON.parse(stored)
          setPreferences(previousPreferences)
        }
      } catch (revertError) {
        // If we can't revert, keep the optimistic update
      }
    }
  }

  const clearPreferences = async () => {
    try {
      setLastError(null)
      await AsyncStorage.removeItem(STORAGE_KEY)
      setPreferences(defaultPreferences)
    } catch (error) {
      const errorMessage = `Clear failed: ${error instanceof Error ? error.message : 'Unknown'}`
      setLastError(errorMessage)
    }
  }

  const debugStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      
      let debugMessage = `AsyncStorage Keys: ${keys.length} | Data: ${stored ? 'Found' : 'Empty'}`
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          debugMessage += ` | Zone: ${parsed.selectedZone?.code || 'Unknown'}`
        } catch (parseError) {
          debugMessage += ' | Parse Error'
        }
      }
      
      setLastError(debugMessage)
    } catch (error) {
      const errorMessage = `Debug failed: ${error instanceof Error ? error.message : 'Unknown'}`
      setLastError(errorMessage)
    }
  }

  return (
    <PrayerPreferencesContext.Provider value={{ 
      preferences, 
      updatePreferences, 
      loading, 
      lastError,
      clearPreferences, 
      debugStorage 
    }}>
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
