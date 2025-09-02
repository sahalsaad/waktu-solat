import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Zone, MALAYSIAN_ZONES } from '../types/prayer'

// Helper to determine if we're in development
const isDevelopment = typeof __DEV__ !== 'undefined' ? __DEV__ : false

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
  debugAsyncStorage: () => Promise<void>
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
      if (isDevelopment) console.log('Loading preferences from AsyncStorage...')
      setLastError(null)
      
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (isDevelopment) console.log('Raw stored data:', stored)
      
      if (stored) {
        try {
          const parsedPreferences = JSON.parse(stored)
          if (isDevelopment) console.log('Parsed preferences:', parsedPreferences)
          
          // Validate the stored data structure
          const validatedPreferences = {
            ...defaultPreferences,
            ...parsedPreferences,
            // Ensure selectedZone has proper structure
            selectedZone: parsedPreferences.selectedZone || defaultPreferences.selectedZone
          }
          
          if (isDevelopment) console.log('Final preferences:', validatedPreferences)
          setPreferences(validatedPreferences)
        } catch (parseError) {
          if (isDevelopment) console.error('JSON parse error:', parseError)
          setLastError('Data parsing failed - using defaults')
          setPreferences(defaultPreferences)
        }
      } else {
        if (isDevelopment) console.log('No stored preferences found, using defaults')
        setPreferences(defaultPreferences)
      }
    } catch (error) {
      if (isDevelopment) console.error('AsyncStorage access error:', error)
      setLastError(`Storage error: ${error instanceof Error ? error.message : 'Unknown'}`)
      setPreferences(defaultPreferences)
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async (newPreferences: Partial<PrayerPreferences>) => {
    try {
      if (isDevelopment) console.log('Updating preferences:', newPreferences)
      setLastError(null)
      
      // Immediately update state for responsive UI
      const updatedPreferences = { ...preferences, ...newPreferences }
      if (isDevelopment) console.log('New preferences state:', updatedPreferences)
      setPreferences(updatedPreferences)
      
      // Save to storage with proper error handling
      const serializedData = JSON.stringify(updatedPreferences)
      if (isDevelopment) console.log('Serialized data:', serializedData)
      
      await AsyncStorage.setItem(STORAGE_KEY, serializedData)
      if (isDevelopment) console.log('Successfully saved preferences to AsyncStorage')
      
    } catch (error) {
      const errorMessage = `Save failed: ${error instanceof Error ? error.message : 'Unknown'}`
      if (isDevelopment) console.error('Failed to save prayer preferences:', error)
      setLastError(errorMessage)
      
      // On error, try to revert to previous state
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)
        if (stored) {
          const previousPreferences = JSON.parse(stored)
          setPreferences(previousPreferences)
          if (isDevelopment) console.log('Reverted to previous state due to save error')
        }
      } catch (revertError) {
        if (isDevelopment) console.error('Failed to revert state:', revertError)
        // If we can't revert, keep the optimistic update
      }
    }
  }

  const clearPreferences = async () => {
    try {
      if (isDevelopment) console.log('Clearing all preferences...')
      setLastError(null)
      await AsyncStorage.removeItem(STORAGE_KEY)
      setPreferences(defaultPreferences)
      if (isDevelopment) console.log('Preferences cleared successfully')
    } catch (error) {
      const errorMessage = `Clear failed: ${error instanceof Error ? error.message : 'Unknown'}`
      if (isDevelopment) console.error('Failed to clear preferences:', error)
      setLastError(errorMessage)
    }
  }

  const debugAsyncStorage = async () => {
    try {
      if (isDevelopment) console.log('=== AsyncStorage Debug Info ===')
      const keys = await AsyncStorage.getAllKeys()
      if (isDevelopment) console.log('All AsyncStorage keys:', keys)
      
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (isDevelopment) console.log('Raw stored preferences:', stored)
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (isDevelopment) console.log('Parsed preferences:', parsed)
        } catch (parseError) {
          if (isDevelopment) console.error('JSON parse error:', parseError)
          setLastError('Debug: JSON parse error in stored data')
        }
      }
      if (isDevelopment) console.log('=== End Debug Info ===')
      
      // For production, set a visible message
      if (!isDevelopment) {
        setLastError(`Debug: Keys(${keys.length}) | Data: ${stored ? 'Found' : 'Empty'} | Zone: ${preferences.selectedZone.code}`)
      }
    } catch (error) {
      const errorMessage = `Debug failed: ${error instanceof Error ? error.message : 'Unknown'}`
      if (isDevelopment) console.error('Debug AsyncStorage error:', error)
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
      debugAsyncStorage 
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
