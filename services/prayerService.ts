import { PrayerResponse } from '../types/prayer'

const BASE_URL = 'https://www.e-solat.gov.my/index.php'

export class PrayerTimeService {
  static async fetchPrayerTimes(zone: string): Promise<PrayerResponse> {
    try {
      const url = `${BASE_URL}?r=esolatApi/TakwimSolat&period=today&zone=${zone}`
      
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
      console.error('Error fetching prayer times:', error)
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch prayer times. Please check your internet connection.'
      )
    }
  }

  static async fetchWeeklyPrayerTimes(zone: string): Promise<PrayerResponse> {
    try {
      const url = `${BASE_URL}?r=esolatApi/TakwimSolat&period=week&zone=${zone}`
      
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
      console.error('Error fetching weekly prayer times:', error)
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch weekly prayer times. Please check your internet connection.'
      )
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
