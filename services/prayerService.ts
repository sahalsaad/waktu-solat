import AsyncStorage from '@react-native-async-storage/async-storage'
import { PrayerResponse, CachedPrayerData } from '../types/prayer'

const BASE_URL = 'https://www.e-solat.gov.my/index.php'
const CACHE_KEY_PREFIX = 'prayer_cache_'

export class PrayerTimeService {
  /**
   * Get current month in YYYY-MM format
   */
  private static getCurrentMonth(): string {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }

  /**
   * Generate cache key for zone and month
   */
  private static getCacheKey(zone: string, month: string): string {
    return `${CACHE_KEY_PREFIX}${zone}_${month}`
  }

  /**
   * Check if cached data is valid for current month
   */
  private static isCacheValid(cachedData: CachedPrayerData): boolean {
    const currentMonth = this.getCurrentMonth()
    return cachedData.month === currentMonth
  }

  /**
   * Get cached prayer data from AsyncStorage
   */
  private static async getCachedData(zone: string): Promise<CachedPrayerData | null> {
    try {
      const currentMonth = this.getCurrentMonth()
      const cacheKey = this.getCacheKey(zone, currentMonth)
      const cachedString = await AsyncStorage.getItem(cacheKey)
      
      if (!cachedString) {
        return null
      }

      const cachedData: CachedPrayerData = JSON.parse(cachedString)
      
      // Validate cache is for current month and same zone
      if (this.isCacheValid(cachedData) && cachedData.zone === zone) {
        return cachedData
      }

      // Cache is invalid, remove it
      await AsyncStorage.removeItem(cacheKey)
      return null
    } catch (error) {
      return null
    }
  }

  /**
   * Cache prayer data to AsyncStorage
   */
  private static async setCachedData(zone: string, data: PrayerResponse): Promise<void> {
    try {
      const currentMonth = this.getCurrentMonth()
      const cacheKey = this.getCacheKey(zone, currentMonth)
      
      const cachedData: CachedPrayerData = {
        data,
        month: currentMonth,
        zone,
        cachedAt: Date.now()
      }

      await AsyncStorage.setItem(cacheKey, JSON.stringify(cachedData))
      
      // Clean up old cache entries for different months
      await this.cleanOldCache(zone, currentMonth)
    } catch (error) {
      // Silently handle cache errors
    }
  }

  /**
   * Clean up old cached data for different months
   */
  private static async cleanOldCache(zone: string, currentMonth: string): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const zoneKeys = allKeys.filter(key => key.startsWith(`${CACHE_KEY_PREFIX}${zone}_`))
      
      for (const key of zoneKeys) {
        if (!key.includes(currentMonth)) {
          await AsyncStorage.removeItem(key)
        }
      }
    } catch (error) {
      // Silently handle cache cleanup errors
    }
  }

  /**
   * Fetch monthly prayer times from API
   */
  private static async fetchMonthlyPrayerTimes(zone: string): Promise<PrayerResponse> {
    try {
      const url = `${BASE_URL}?r=esolatApi/TakwimSolat&period=month&zone=${zone}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: PrayerResponse = await response.json()
      
      if (data.status !== 'OK!') {
        throw new Error(`API error: ${data.status}`)
      }

      return data
    } catch (error) {
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch prayer times. Please check your internet connection.'
      )
    }
  }

  /**
   * Get prayer times with caching (primary method)
   * Returns cached data if available, otherwise fetches from API
   */
  static async fetchPrayerTimes(zone: string): Promise<PrayerResponse> {
    try {
      // Try to get cached data first
      const cachedData = await this.getCachedData(zone)
      
      if (cachedData) {
        return cachedData.data
      }

      // No valid cache, fetch from API
      const freshData = await this.fetchMonthlyPrayerTimes(zone)
      
      // Cache the fresh data
      await this.setCachedData(zone, freshData)
      
      return freshData
    } catch (error) {
      throw error
    }
  }

  /**
   * Force refresh prayer times (bypass cache)
   */
  static async refreshPrayerTimes(zone: string): Promise<PrayerResponse> {
    try {
      const freshData = await this.fetchMonthlyPrayerTimes(zone)
      
      // Update cache with fresh data
      await this.setCachedData(zone, freshData)
      
      return freshData
    } catch (error) {
      throw error
    }
  }

  /**
   * Legacy method for backward compatibility (now uses monthly data)
   */
  static async fetchWeeklyPrayerTimes(zone: string): Promise<PrayerResponse> {
    // Redirect to monthly data for better caching
    return this.fetchPrayerTimes(zone)
  }

  /**
   * Parse date string in format "DD-MMM-YYYY" (e.g., "02-Sep-2025")
   */
  private static parseApiDate(dateString: string): Date | null {
    try {
      // Convert "DD-MMM-YYYY" to a format that Date() can parse
      // First, let's try the direct parsing
      let date = new Date(dateString)
      
      if (!isNaN(date.getTime())) {
        return date
      }
      
      // If direct parsing fails, try manual parsing
      const parts = dateString.split('-')
      if (parts.length !== 3) {
        return null
      }
      
      const day = parseInt(parts[0], 10)
      const monthStr = parts[1]
      const year = parseInt(parts[2], 10)
      
      // Month name to number mapping
      const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      }
      
      const month = monthMap[monthStr]
      if (month === undefined) {
        return null
      }
      
      return new Date(year, month, day)
    } catch (error) {
      return null
    }
  }

  /**
   * Get today's prayer time from monthly data
   */
  static getTodayPrayerTime(monthlyData: PrayerResponse): PrayerResponse['prayerTime'][0] | null {
    try {
      const today = new Date()
      const todayDay = today.getDate()
      const todayMonth = today.getMonth() + 1
      const todayYear = today.getFullYear()
      
      // Try to find today's data in the monthly response
      const todayPrayer = monthlyData.prayerTime.find(prayer => {
        const prayerDate = this.parseApiDate(prayer.date)
        
        if (!prayerDate) {
          return false
        }
        
        // Compare date components
        return (
          prayerDate.getDate() === todayDay &&
          (prayerDate.getMonth() + 1) === todayMonth &&
          prayerDate.getFullYear() === todayYear
        )
      })
      
      if (!todayPrayer) {
        // Fallback to first prayer time if today not found
        return monthlyData.prayerTime[0] || null
      }
      
      return todayPrayer
    } catch (error) {
      return monthlyData.prayerTime[0] || null
    }
  }

  /**
   * Clear all cached data (useful for debugging or manual refresh)
   */
  static async clearCache(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      const cacheKeys = allKeys.filter(key => key.startsWith(CACHE_KEY_PREFIX))
      
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys)
      }
    } catch (error) {
      // Silently handle cache clear errors
    }
  }

  static parseQiblaDirection(bearing: string): { degrees: number; direction: string } {
    // Parse bearing string like "292° 31′ 16″"
    const degreeMatch = bearing.match(/(\d+)°/)
    const degrees = degreeMatch ? parseInt(degreeMatch[1], 10) : 0
    
    // Convert to cardinal direction
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    const direction = directions[index]
    
    return { degrees, direction }
  }
}
