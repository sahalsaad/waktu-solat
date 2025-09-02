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

export interface CachedPrayerData {
  data: PrayerResponse
  month: string // Format: "YYYY-MM"
  zone: string
  cachedAt: number // Timestamp
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
  // Johor
  { code: 'JHR01', name: 'Pulau Aur dan Pulau Pemanggil', state: 'Johor' },
  { code: 'JHR02', name: 'Johor Bahru, Kota Tinggi, Mersing, Kulai', state: 'Johor' },
  { code: 'JHR03', name: 'Kluang, Pontian', state: 'Johor' },
  { code: 'JHR04', name: 'Batu Pahat, Muar, Segamat, Gemas Johor, Tangkak', state: 'Johor' },
  
  // Kedah
  { code: 'KDH01', name: 'Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)', state: 'Kedah' },
  { code: 'KDH02', name: 'Kuala Muda, Yan, Pendang', state: 'Kedah' },
  { code: 'KDH03', name: 'Padang Terap, Sik', state: 'Kedah' },
  { code: 'KDH04', name: 'Baling', state: 'Kedah' },
  { code: 'KDH05', name: 'Bandar Baharu, Kulim', state: 'Kedah' },
  { code: 'KDH06', name: 'Langkawi', state: 'Kedah' },
  { code: 'KDH07', name: 'Puncak Gunung Jerai', state: 'Kedah' },
  
  // Kelantan
  { code: 'KTN01', name: 'Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku', state: 'Kelantan' },
  { code: 'KTN02', name: 'Gua Musang (Daerah Galas Dan Bertam), Jeli, Jajahan Kecil Lojing', state: 'Kelantan' },
  
  // Melaka
  { code: 'MLK01', name: 'SELURUH NEGERI MELAKA', state: 'Melaka' },
  
  // Negeri Sembilan
  { code: 'NGS01', name: 'Tampin, Jempol', state: 'Negeri Sembilan' },
  { code: 'NGS02', name: 'Jelebu, Kuala Pilah, Rembau', state: 'Negeri Sembilan' },
  { code: 'NGS03', name: 'Port Dickson, Seremban', state: 'Negeri Sembilan' },
  
  // Pahang
  { code: 'PHG01', name: 'Pulau Tioman', state: 'Pahang' },
  { code: 'PHG02', name: 'Kuantan, Pekan, Muadzam Shah', state: 'Pahang' },
  { code: 'PHG03', name: 'Jerantut, Temerloh, Maran, Bera, Chenor, Jengka', state: 'Pahang' },
  { code: 'PHG04', name: 'Bentong, Lipis, Raub', state: 'Pahang' },
  { code: 'PHG05', name: 'Genting Sempah, Janda Baik, Bukit Tinggi', state: 'Pahang' },
  { code: 'PHG06', name: 'Cameron Highlands, Genting Higlands, Bukit Fraser', state: 'Pahang' },
  { code: 'PHG07', name: 'Zon Khas Daerah Rompin, (Mukim Rompin, Mukim Endau, Mukim Pontian)', state: 'Pahang' },
  
  // Perlis
  { code: 'PLS01', name: 'Kangar, Padang Besar, Arau', state: 'Perlis' },
  
  // Pulau Pinang
  { code: 'PNG01', name: 'Seluruh Negeri Pulau Pinang', state: 'Pulau Pinang' },
  
  // Perak
  { code: 'PRK01', name: 'Tapah, Slim River, Tanjung Malim', state: 'Perak' },
  { code: 'PRK02', name: 'Kuala Kangsar, Sg. Siput , Ipoh, Batu Gajah, Kampar', state: 'Perak' },
  { code: 'PRK03', name: 'Lenggong, Pengkalan Hulu, Grik', state: 'Perak' },
  { code: 'PRK04', name: 'Temengor, Belum', state: 'Perak' },
  { code: 'PRK05', name: 'Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor', state: 'Perak' },
  { code: 'PRK06', name: 'Selama, Taiping, Bagan Serai, Parit Buntar', state: 'Perak' },
  { code: 'PRK07', name: 'Bukit Larut', state: 'Perak' },
  
  // Sabah
  { code: 'SBH01', name: 'Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau', state: 'Sabah' },
  { code: 'SBH02', name: 'Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)', state: 'Sabah' },
  { code: 'SBH03', name: 'Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau  (Timur)', state: 'Sabah' },
  { code: 'SBH04', name: 'Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)', state: 'Sabah' },
  { code: 'SBH05', name: 'Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat', state: 'Sabah' },
  { code: 'SBH06', name: 'Gunung Kinabalu', state: 'Sabah' },
  { code: 'SBH07', name: 'Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat', state: 'Sabah' },
  { code: 'SBH08', name: 'Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)', state: 'Sabah' },
  { code: 'SBH09', name: 'Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pasia, Membakut, Weston, Bahagian Pendalaman (Bawah)', state: 'Sabah' },
  
  // Selangor
  { code: 'SGR01', name: 'Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam', state: 'Selangor' },
  { code: 'SGR02', name: 'Kuala Selangor, Sabak Bernam', state: 'Selangor' },
  { code: 'SGR03', name: 'Klang, Kuala Langat', state: 'Selangor' },
  
  // Sarawak
  { code: 'SWK01', name: 'Limbang, Lawas, Sundar, Trusan', state: 'Sarawak' },
  { code: 'SWK02', name: 'Miri, Niah, Bekenu, Sibuti, Marudi', state: 'Sarawak' },
  { code: 'SWK03', name: 'Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu', state: 'Sarawak' },
  { code: 'SWK04', name: 'Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit', state: 'Sarawak' },
  { code: 'SWK05', name: 'Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai', state: 'Sarawak' },
  { code: 'SWK06', name: 'Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok', state: 'Sarawak' },
  { code: 'SWK07', name: 'Serian, Simunjan, Samarahan, Sebuyau, Meludam', state: 'Sarawak' },
  { code: 'SWK08', name: 'Kuching, Bau, Lundu, Sematan', state: 'Sarawak' },
  { code: 'SWK09', name: 'Zon Khas (Kampung Patarikan)', state: 'Sarawak' },
  
  // Terengganu
  { code: 'TRG01', name: 'Kuala Terengganu, Marang, Kuala Nerus', state: 'Terengganu' },
  { code: 'TRG02', name: 'Besut, Setiu', state: 'Terengganu' },
  { code: 'TRG03', name: 'Hulu Terengganu', state: 'Terengganu' },
  { code: 'TRG04', name: 'Dungun, Kemaman', state: 'Terengganu' },
  
  // Wilayah Persekutuan
  { code: 'WLY01', name: 'Kuala Lumpur, Putrajaya', state: 'Wilayah Persekutuan' },
  { code: 'WLY02', name: 'Labuan', state: 'Wilayah Persekutuan' },
]
