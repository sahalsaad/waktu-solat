// Centralized text constants for Waktu Solat app
// This makes it easy to update texts and prepare for translations

export const TEXTS = {
  // App Title
  appTitle: 'Waktu Solat',
  
  // Prayer Names (Malay)
  prayers: {
    imsak: 'Imsak',
    subuh: 'Subuh',
    syuruk: 'Syuruk',
    dhuha: 'Dhuha',
    zohor: 'Zohor',
    asar: 'Asar',
    maghrib: 'Maghrib',
    isyak: 'Isyak'
  },
  
  // Combined Header
  header: {
    nextPrayer: 'Waktu Solat Seterusnya',
    currentPrayer: 'Sekarang'
  },
  
  // Zone Selector
  zoneSelector: {
    selectZone: 'Pilih Zon Waktu Solat',
    searchPlaceholder: 'Cari negeri, daerah atau kod zon...',
    zonesFound: 'zon dijumpai',
    noZonesFound: 'Tiada zon dijumpai',
    searchHint: 'Cuba cari dengan nama negeri, daerah atau kod zon'
  },
  
  // Settings
  settings: {
    title: 'Tetapan',
    subtitle: 'Sesuaikan aplikasi mengikut keutamaan anda',
    
    // Notification Settings
    notificationSection: 'Notifikasi',
    prayerNotification: 'Notifikasi Waktu Solat',
    prayerNotificationDesc: 'Terima pemberitahuan ketika masuk waktu solat',
    earlyNotification: 'Peringatan Awal',
    earlyNotificationDesc: 'Notifikasi 15 minit sebelum waktu solat',
    
    // Prayer Display Settings
    additionalPrayersSection: 'Waktu Solat Tambahan',
    additionalPrayersDesc: 'Pilih waktu solat tambahan yang ingin dipaparkan. Waktu solat utama (Subuh, Zohor, Asar, Maghrib, Isyak) akan sentiasa ditunjukkan.',
    showImsak: 'Tampilkan Imsak',
    showImsakDesc: 'Paparkan waktu Imsak dalam senarai',
    showSyuruk: 'Tampilkan Syuruk',
    showSyurukDesc: 'Paparkan waktu Syuruk dalam senarai',
    showDhuha: 'Tampilkan Dhuha',
    showDhuhaDesc: 'Paparkan waktu Dhuha dalam senarai',
    
    // App Information
    appInfoSection: 'Maklumat Aplikasi',
    appVersion: 'Versi Aplikasi',
    appVersionNumber: '1.0.0',
    appName: 'Waktu Solat Malaysia',
    
    // Theme Section
    themeSection: 'Tema',
    darkTheme: 'Tema Gelap'
  },
  
  // Time Format
  timeFormat: {
    am: 'AM',
    pm: 'PM',
    hours: 'j',
    minutes: 'm'
  },
  
  // Loading States
  loading: {
    prayerTimes: 'Memuat waktu solat...'
  },
  
  // Date Formats
  dateFormat: {
    hijriSuffix: 'H'
  },
  
  // Prayer Cards
  prayerCard: {
    nextIndicator: 'Seterusnya'
  }
} as const

// Type for text keys - useful for TypeScript autocomplete
export type TextKey = keyof typeof TEXTS
