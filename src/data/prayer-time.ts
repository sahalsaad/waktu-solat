export interface PrayerTime {
  name: string;
  time: Date;
  originalName?: string;
}

export interface ExtendedPrayerData {
  date: string;
  day: string;
  hijri: string;
  imsak: string;
  syuruk: string;
  zone: string;
}

export interface ZoneInfo {
  code: string;
  name: string;
  state: string;
}

export const MALAYSIA_ZONES: ZoneInfo[] = [
  { code: 'JHR01', name: 'Pulau Aur, Pulau Pemanggil', state: 'Johor' },
  { code: 'JHR02', name: 'Johor Bahru, Kota Tinggi, Mersing', state: 'Johor' },
  { code: 'JHR03', name: 'Kluang, Pontian', state: 'Johor' },
  { code: 'JHR04', name: 'Batu Pahat, Muar, Segamat, Gemas', state: 'Johor' },
  { code: 'KDH01', name: 'Kota Setar, Kubang Pasu, Pokok Sena', state: 'Kedah' },
  { code: 'KDH02', name: 'Kuala Muda, Yan, Pendang', state: 'Kedah' },
  { code: 'KDH03', name: 'Padang Terap, Sik', state: 'Kedah' },
  { code: 'KDH04', name: 'Baling', state: 'Kedah' },
  { code: 'KDH05', name: 'Bandar Baharu, Kulim', state: 'Kedah' },
  { code: 'KDH06', name: 'Langkawi', state: 'Kedah' },
  { code: 'KDH07', name: 'Gunung Jerai', state: 'Kedah' },
  { code: 'KTN01', name: 'Kota Bharu, Bachok, Pasir Puteh', state: 'Kelantan' },
  { code: 'KTN03', name: 'Tanah Merah, Machang, Pasir Mas', state: 'Kelantan' },
  { code: 'MLK01', name: 'Bandar Melaka, Alor Gajah, Jasin', state: 'Melaka' },
  { code: 'NGS01', name: 'Jempol, Tampin', state: 'Negeri Sembilan' },
  { code: 'NGS02', name: 'Port Dickson, Seremban, Kuala Pilah', state: 'Negeri Sembilan' },
  { code: 'PHG01', name: 'Kuantan, Pekan, Rompin, Muadzam Shah', state: 'Pahang' },
  { code: 'PHG02', name: 'Kuala Lipis, Jerantut', state: 'Pahang' },
  { code: 'PHG03', name: 'Bentong, Lipis, Raub', state: 'Pahang' },
  { code: 'PHG04', name: 'Temerloh, Bera, Maran', state: 'Pahang' },
  { code: 'PHG05', name: 'Genting Sempah, Janda Baik', state: 'Pahang' },
  { code: 'PHG06', name: 'Bukit Tinggi', state: 'Pahang' },
  { code: 'PLS01', name: 'Kangar, Padang Besar, Arau', state: 'Perlis' },
  { code: 'PNG01', name: 'Timur Laut Pulau Pinang', state: 'Pulau Pinang' },
  { code: 'PRK01', name: 'Tapah, Slim River, Tanjung Malim', state: 'Perak' },
  { code: 'PRK02', name: 'Kuala Kangsar, Sg. Siput', state: 'Perak' },
  { code: 'PRK03', name: 'Ipoh, Batu Gajah, Kampar', state: 'Perak' },
  { code: 'PRK04', name: 'Temengor, Belum', state: 'Perak' },
  { code: 'PRK05', name: 'Teluk Intan, Bagan Datoh', state: 'Perak' },
  { code: 'PRK06', name: 'Lumut, Sitiawan', state: 'Perak' },
  { code: 'PRK07', name: 'Pulau Pangkor', state: 'Perak' },
  { code: 'SBH01', name: 'Sandakan, Bdr. Bkt. Garam, Semawang', state: 'Sabah' },
  { code: 'SBH02', name: 'Kota Kinabalu, Ranau, Kota Belud', state: 'Sabah' },
  { code: 'SBH03', name: 'Lahad Datu, Kunak, Silabukan', state: 'Sabah' },
  { code: 'SBH04', name: 'Tawau, Balong, Merotai', state: 'Sabah' },
  { code: 'SBH05', name: 'Kudat, Kota Marudu, Pitas', state: 'Sabah' },
  { code: 'SBH06', name: 'Gunung Kinabalu', state: 'Sabah' },
  { code: 'SBH07', name: 'Papar, Kimanis, Kota Kinabalu', state: 'Sabah' },
  { code: 'SBH08', name: 'Putatan, Penampang, Kota Kinabalu', state: 'Sabah' },
  { code: 'SBH09', name: 'Sipitang, Membakut, Beaufort', state: 'Sabah' },
  { code: 'SGR01', name: 'Gombak, Petaling, Sepang', state: 'Selangor' },
  { code: 'SGR02', name: 'Kuala Selangor, Sabak Bernam', state: 'Selangor' },
  { code: 'SGR03', name: 'Klang, Kuala Langat', state: 'Selangor' },
  { code: 'SWK01', name: 'Limbang, Lawas, Sundar', state: 'Sarawak' },
  { code: 'SWK02', name: 'Miri, Niah, Bekenu, Sibuti', state: 'Sarawak' },
  { code: 'SWK03', name: 'Pandan, Belaga, Suai, Tatau', state: 'Sarawak' },
  { code: 'SWK04', name: 'Bintulu, Sebauh, Tatau', state: 'Sarawak' },
  { code: 'SWK05', name: 'Sibu, Mukah, Dalat, Song', state: 'Sarawak' },
  { code: 'SWK06', name: 'Daro, Matu, Igan', state: 'Sarawak' },
  { code: 'SWK07', name: 'Sarikei, Bintangor, Rajang', state: 'Sarawak' },
  { code: 'SWK08', name: 'Kapit, Song, Belaga', state: 'Sarawak' },
  { code: 'SWK09', name: 'Samarahan, Simunjan, Serian', state: 'Sarawak' },
  { code: 'TRG01', name: 'Kuala Terengganu, Marang', state: 'Terengganu' },
  { code: 'TRG02', name: 'Besut, Setiu', state: 'Terengganu' },
  { code: 'TRG03', name: 'Hulu Terengganu', state: 'Terengganu' },
  { code: 'TRG04', name: 'Dungun, Kemaman', state: 'Terengganu' },
  { code: 'WLY01', name: 'Kuala Lumpur, Putrajaya', state: 'W.P Kuala Lumpur' },
  { code: 'WLY02', name: 'Labuan', state: 'W.P Labuan' },
];
