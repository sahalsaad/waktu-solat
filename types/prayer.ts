export interface PrayerTime {
  hijri: string
  date: string
  day: string
  imsak: string
  fajr: string
  syuruk: string
  dhuha: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
}

export interface PrayerResponse {
  prayerTime: PrayerTime[]
  status: string
  serverTime: string
  periodType: string
  lang: string
  zone: string
  bearing: string
}

export interface Zone {
  code: string
  name: string
  state: string
}

export interface PrayerName {
  key: keyof Pick<PrayerTime, 'imsak' | 'fajr' | 'syuruk' | 'dhuha' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'>
  name: string
  nameArabic: string
}

export const PRAYER_NAMES: PrayerName[] = [
  { key: 'imsak', name: 'Imsak', nameArabic: 'إمساك' },
  { key: 'fajr', name: 'Subuh', nameArabic: 'فجر' },
  { key: 'syuruk', name: 'Syuruk', nameArabic: 'شروق' },
  { key: 'dhuha', name: 'Dhuha', nameArabic: 'ضحى' },
  { key: 'dhuhr', name: 'Zohor', nameArabic: 'ظهر' },
  { key: 'asr', name: 'Asar', nameArabic: 'عصر' },
  { key: 'maghrib', name: 'Maghrib', nameArabic: 'مغرب' },
  { key: 'isha', name: 'Isyak', nameArabic: 'عشاء' },
]

export const MAIN_PRAYER_TIMES: PrayerName[] = [
  { key: 'fajr', name: 'Subuh', nameArabic: 'فجر' },
  { key: 'dhuhr', name: 'Zohor', nameArabic: 'ظهر' },
  { key: 'asr', name: 'Asar', nameArabic: 'عصر' },
  { key: 'maghrib', name: 'Maghrib', nameArabic: 'مغرب' },
  { key: 'isha', name: 'Isyak', nameArabic: 'عشاء' },
]

export const MALAYSIAN_ZONES: Zone[] = [
  // Wilayah Persekutuan
  { code: 'WLY01', name: 'Kuala Lumpur', state: 'Wilayah Persekutuan' },
  { code: 'WLY02', name: 'Labuan', state: 'Wilayah Persekutuan' },
  { code: 'WLY03', name: 'Putrajaya', state: 'Wilayah Persekutuan' },
  
  // Selangor
  { code: 'SGR01', name: 'Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Rawang', state: 'Selangor' },
  { code: 'SGR02', name: 'Kuala Selangor, Sabak Bernam', state: 'Selangor' },
  { code: 'SGR03', name: 'Klang, Kuala Langat', state: 'Selangor' },
  
  // Johor
  { code: 'JHR01', name: 'Pulau Aur dan Pemanggil', state: 'Johor' },
  { code: 'JHR02', name: 'Johor Bahru, Kota Tinggi, Mersing', state: 'Johor' },
  { code: 'JHR03', name: 'Kluang, Pontian', state: 'Johor' },
  { code: 'JHR04', name: 'Batu Pahat, Muar, Segamat, Gemas Johor', state: 'Johor' },
  
  // Add more zones as needed
]
