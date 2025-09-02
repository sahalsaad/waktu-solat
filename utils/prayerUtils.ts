import { PrayerTime, MAIN_PRAYER_TIMES, PRAYER_NAMES } from '../types/prayer'

interface PrayerPreferences {
  showImsak: boolean
  showSyuruk: boolean
  showDhuha: boolean
}

export function getCurrentPrayer(prayerTime: PrayerTime, preferences?: PrayerPreferences): { current: string; next: string } {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  // Create list of prayers to consider based on preferences
  const prayersToConsider = PRAYER_NAMES.filter(prayer => {
    // Always include main prayers
    if (MAIN_PRAYER_TIMES.some(mainPrayer => mainPrayer.key === prayer.key)) {
      return true
    }
    
    // Include optional prayers based on preferences
    if (preferences) {
      if (prayer.key === 'imsak') return preferences.showImsak
      if (prayer.key === 'syuruk') return preferences.showSyuruk
      if (prayer.key === 'dhuha') return preferences.showDhuha
    }
    
    return false
  })
  
  const prayers = prayersToConsider.map(prayer => ({
    name: prayer.name,
    time: timeStringToMinutes(prayerTime[prayer.key])
  })).sort((a, b) => a.time - b.time)
  
  let current = 'Isyak' // Default to last prayer
  let next = prayers[0].name // Next day's first prayer
  
  for (let i = 0; i < prayers.length; i++) {
    if (currentTime < prayers[i].time) {
      next = prayers[i].name
      current = i > 0 ? prayers[i - 1].name : 'Isyak'
      break
    }
    if (i === prayers.length - 1) {
      current = prayers[i].name
      next = prayers[0].name
    }
  }
  
  return { current, next }
}

export function getNextPrayerCountdown(prayerTime: PrayerTime, preferences?: PrayerPreferences): { timeLeft: string; nextPrayer: string } {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  // Create list of prayers to consider based on preferences
  const prayersToConsider = PRAYER_NAMES.filter(prayer => {
    // Always include main prayers
    if (MAIN_PRAYER_TIMES.some(mainPrayer => mainPrayer.key === prayer.key)) {
      return true
    }
    
    // Include optional prayers based on preferences
    if (preferences) {
      if (prayer.key === 'imsak') return preferences.showImsak
      if (prayer.key === 'syuruk') return preferences.showSyuruk
      if (prayer.key === 'dhuha') return preferences.showDhuha
    }
    
    return false
  })
  
  const prayers = prayersToConsider.map(prayer => ({
    name: prayer.name,
    time: timeStringToMinutes(prayerTime[prayer.key])
  })).sort((a, b) => a.time - b.time)
  
  let nextPrayerTime = prayers[0].time + 24 * 60 // Next day's first prayer
  let nextPrayerName = prayers[0].name
  
  for (const prayer of prayers) {
    if (prayer.time > currentTime) {
      nextPrayerTime = prayer.time
      nextPrayerName = prayer.name
      break
    }
  }
  
  const timeDiff = nextPrayerTime - currentTime
  const hours = Math.floor(timeDiff / 60)
  const minutes = timeDiff % 60
  
  let timeLeft = ''
  if (hours > 0) {
    timeLeft = `${hours}j ${minutes}m`
  } else {
    timeLeft = `${minutes}m`
  }
  
  return { timeLeft, nextPrayer: nextPrayerName }
}

export function timeStringToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':')
  return `${hours}:${minutes}`
}

export function formatTime12Hour(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number)
  
  // Convert to 12-hour format
  let hour12 = hours
  let period = 'AM'
  
  if (hours === 0) {
    hour12 = 12
    period = 'AM'
  } else if (hours === 12) {
    hour12 = 12
    period = 'PM'
  } else if (hours > 12) {
    hour12 = hours - 12
    period = 'PM'
  }
  
  return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function formatHijriDate(hijriString: string): string {
  // Convert "1447-03-09" to a more readable format
  const [year, month, day] = hijriString.split('-')
  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
  ]
  
  const monthName = hijriMonths[parseInt(month, 10) - 1] || month
  return `${parseInt(day, 10)} ${monthName} ${year}H`
}

export function formatGregorianDate(dateString: string): string {
  // Convert "02-Sep-2025" to a more readable format
  const date = new Date(dateString)
  return date.toLocaleDateString('ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
