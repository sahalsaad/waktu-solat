# Waktu Solat App - Project Knowledge Base

## Project Overview
**App Name:** Waktu Solat (Prayer Times App)  
**Platform:** React Native with Expo  
**UI Library:** Tamagui  
**Primary Language:** TypeScript  
**Target:** Malaysian Islamic Prayer Times Application

## 🛠 **Technology Stack**
- **Framework:** React Native + Expo 53.x
- **UI Library:** Tamagui v4 with custom theming
- **Navigation:** Expo Router v5 (Stack navigation, no tabs)
- **State Management:** React Context + AsyncStorage for preferences
- **API Service:** Custom monthly prayer time service with caching
- **Icons:** Lucide React Native icons
- **Storage:** AsyncStorage for persistent user preferences and monthly caching
- **Date Handling:** Custom parser for Malaysian API date format

## 🎨 **Design System**

### **Theme Configuration** (`tamagui.config.ts`):
- **Primary Colors:** Arch Linux inspired palette
  - `$archPrimary`: #1793d1 (Arch Linux blue)
  - `$archAccent`: #f78166 (Coral accent) 
  - `$archSurface`: Dark surface colors (#161b22)
  - `$archText`: Light text on dark background (#f0f6fc)
- **Navigation:** Single screen with header, no tab bar
- **Modal Design:** Sheet component with proper overlay and animations

### **Visual Design Patterns:**
- **Left Border Color Coding:**
  - 🔵 Blue borders: Main obligatory prayers (Subuh, Zohor, Asar, Maghrib, Isyak)
  - 🟠 Coral borders: Additional/Sunnah prayers (Imsak, Syuruk, Dhuha)
- **Prayer State Indicators:**
  - Normal prayer: 2px border
  - Next prayer: 4px border with primary color
  - Current prayer period: Background highlight
- **Header Design:** Fixed dark header with centered title and settings button
- **Settings Sheet:** Modal covering 90% screen height with drag handle
- **Zone Selection:** Searchable modal sheet with real-time filtering across 77 Malaysian zones

## 📁 **Current Project Structure**
```
app/
├── index.tsx             # Main prayer times screen with monthly caching & conditional rendering
├── _layout.tsx           # Stack navigation with PrayerPreferencesProvider
├── modal.tsx            # Existing modal screens
└── +not-found.tsx       # 404 page

components/
├── prayer/
│   ├── CombinedHeader.tsx    # Date & next prayer side-by-side layout (12-hour format)
│   ├── SettingsSheet.tsx     # Optimized settings with instant responsive switches
│   ├── PrayerTimeCard.tsx    # Enhanced with isAdditional prop & 12-hour format
│   ├── QiblaDirection.tsx    # Qibla compass
│   └── ZoneSelector.tsx      # Searchable sheet with persistent zone selection
├── Provider.tsx         # App providers
└── CurrentToast.tsx     # Toast notifications

constants/
└── texts.ts            # Centralized text constants for easy translation/updates

contexts/
└── PrayerPreferencesContext.tsx  # Prayer preferences + zone persistence with AsyncStorage

services/
└── prayerService.ts     # Monthly API integration with caching system

types/
└── prayer.ts           # TypeScript interfaces including CachedPrayerData

utils/
└── prayerUtils.ts      # Date formatting, calculations, 12-hour time format
```

## 🎨 **Design System & UI Patterns**

### **Text Management System** (`constants/texts.ts`):
```typescript
export const TEXTS = {
  prayers: {
    imsak: 'Imsak',
    subuh: 'Subuh',
    syuruk: 'Syuruk',
    dhuha: 'Dhuha',
    zohor: 'Zohor',
    asr: 'Asar', 
    maghrib: 'Maghrib',
    isyak: 'Isyak'
  },
  ui: {
    selectZone: 'Pilih Zon',
    settings: 'Tetapan',
    today: 'Hari ini',
    nextPrayer: 'Solat Seterusnya',
    currentPrayer: 'Waktu Solat Sekarang'
  },
  settings: {
    title: 'Tetapan Aplikasi',
    subtitle: 'Konfigurasi tetapan notifikasi dan paparan waktu solat',
    prayerNotification: 'Notifikasi Waktu Solat',
    earlyNotification: 'Notifikasi Awal',
    showImsak: 'Tunjukkan Imsak',
    showSyuruk: 'Tunjukkan Syuruk',
    showDhuha: 'Tunjukkan Dhuha',
    darkTheme: 'Tema Gelap'
  },
  zoneSelector: {
    title: 'Pilih Zon Waktu Solat',
    search: 'Cari zon, negeri atau kod...',
    zonesFound: 'zon dijumpai'
  }
}
```

### **Theme Configuration** (`tamagui.config.ts`):
- **Primary Colors:** Arch Linux inspired palette
  - `$archPrimary`: #1793d1 (Arch Linux blue)
  - `$archAccent`: #f78166 (Coral accent) 
  - `$archSurface`: Dark surface colors (#161b22)
  - `$archText`: Light text on dark background (#f0f6fc)
- **Navigation:** Single screen with header, no tab bar
- **Modal Design:** Sheet component with proper overlay and animations

### **Visual Design Patterns:**
- **Left Border Color Coding:**
  - 🔵 Blue borders: Main obligatory prayers (Subuh, Zohor, Asar, Maghrib, Isyak)
  - 🟠 Coral borders: Additional/Sunnah prayers (Imsak, Syuruk, Dhuha)
- **Prayer State Indicators:**
  - Normal prayer: 2px border
  - Next prayer: 4px border with primary color
  - Current prayer period: Background highlight
- **Combined Header Layout:** 
  - Date information (left) with calendar icon and coral accent border
  - Next prayer countdown (right) with clock icon and blue primary border
  - Vertical divider separating sections
  - Side-by-side horizontal layout for space efficiency
- **12-Hour Time Format:** All prayer times display with AM/PM (e.g., "6:30 PM")
- **Settings Design:** 
  - Clean cards without redundant icons for prayer display toggles
  - Instant responsive switches with optimistic UI updates
  - Organized sections with clear visual hierarchy
- **Zone Selection:** 
  - No redundant "Tukar" label, shows only zone name
  - Persistent selection across app restarts
```
app/
├── index.tsx             # Main prayer times screen with monthly caching & conditional rendering
├── _layout.tsx           # Stack navigation with PrayerPreferencesProvider
├── modal.tsx            # Existing modal screens
└── +not-found.tsx       # 404 page

components/
├── prayer/
│   ├── SettingsSheet.tsx     # Enhanced settings with prayer toggles & clean icons
│   ├── DateHeader.tsx        # Date and location information display
│   ├── NextPrayerCountdown.tsx # Next prayer countdown timer
│   ├── PrayerTimeCard.tsx    # Enhanced with isAdditional prop
│   ├── QiblaDirection.tsx    # Qibla compass
│   └── ZoneSelector.tsx      # Searchable sheet with real-time zone filtering
├── Provider.tsx         # App providers
└── CurrentToast.tsx     # Toast notifications

contexts/
└── PrayerPreferencesContext.tsx  # Prayer preferences with AsyncStorage

services/
└── prayerService.ts     # Monthly API integration with caching system

types/
└── prayer.ts           # TypeScript interfaces including CachedPrayerData

utils/
└── prayerUtils.ts      # Date formatting, calculations
```

## 🔧 **API Integration - Current Monthly Caching System**

### **Prayer Time Service** (`services/prayerService.ts`):
- **API Endpoint:** Malaysian e-Solat government API with `period=month` parameter
- **Caching Strategy:** AsyncStorage with monthly cache keys (`prayer_cache_{ZONE}_{YYYY-MM}`)
- **Data Efficiency:** 30x reduction in API calls (1 per month vs 30 per day)
- **Smart Extraction:** Retrieves today's prayer times from monthly dataset
- **Auto-Refresh:** Automatic cache invalidation on month change
- **Offline Support:** Works with cached data when no internet connection

### **Service Methods:**
```typescript
// Primary method with intelligent caching
fetchPrayerTimes(zone: string): Promise<PrayerTime[]>

// Force refresh bypassing cache  
refreshPrayerTimes(zone: string): Promise<PrayerTime[]>

// Extract today's prayer from monthly data
getTodayPrayerTime(monthlyData: PrayerTime[]): PrayerTime | null

// Manual cache cleanup
clearCache(): Promise<void>
```

### **Caching Architecture:**
```typescript
// Cache Key Format
prayer_cache_JHR01_2025-09
prayer_cache_WLY01_2025-09
prayer_cache_SGR01_2025-10

// Cache Data Structure
interface CachedPrayerData {
  data: PrayerResponse        // Full monthly API response
  month: string              // "2025-09" format
  zone: string               // "JHR01" format  
  cachedAt: number           // Timestamp
}
```

## 📊 **Data Structures**

### **Enhanced Data Structure** (`types/prayer.ts`):
```typescript
interface PrayerTime {
  hijri: string      // Hijri date
  date: string       // Gregorian date ("02-Sep-2025" format)
  day: string        // Day name
  imsak: string      // Pre-dawn
  fajr: string       // Dawn (Subuh)
  syuruk: string     // Sunrise
  dhuha: string      // Mid-morning
  dhuhr: string      // Noon (Zohor)
  asr: string        // Afternoon (Asar)
  maghrib: string    // Sunset
  isha: string       // Night (Isyak)
}

interface PrayerPreferences {
  // Notification settings
  notifications: boolean
  earlyNotification: boolean
  
  // Optional prayer time visibility
  showImsak: boolean
  showSyuruk: boolean
  showDhuha: boolean
  
  // Zone selection persistence
  selectedZone: Zone
}

// Complete Malaysian zone coverage (77 zones across 14 states)
const MALAYSIAN_ZONES = {
  "Johor": ["JHR01", "JHR02", "JHR03", "JHR04"],
  "Kedah": ["KDH01", "KDH02", "KDH03", "KDH04", "KDH05", "KDH06", "KDH07"],
  "Kelantan": ["KTN01", "KTN02"],
  "Melaka": ["MLK01"],
  "Negeri Sembilan": ["NGS01", "NGS02", "NGS03"],
  "Pahang": ["PHG01", "PHG02", "PHG03", "PHG04", "PHG05", "PHG06", "PHG07"],
  "Perlis": ["PLS01"],
  "Pulau Pinang": ["PNG01"],
  "Perak": ["PRK01", "PRK02", "PRK03", "PRK04", "PRK05", "PRK06", "PRK07"],
  "Sabah": ["SBH01", "SBH02", "SBH03", "SBH04", "SBH05", "SBH06", "SBH07", "SBH08", "SBH09"],
  "Sarawak": ["SWK01", "SWK02", "SWK03", "SWK04", "SWK05", "SWK06", "SWK07", "SWK08", "SWK09"],
  "Selangor": ["SGR01", "SGR02", "SGR03"],
  "Terengganu": ["TRG01", "TRG02", "TRG03", "TRG04"],
  "Wilayah Persekutuan": ["WLY01", "WLY02"]
}
```

## 🔧 **Time Format & Display System**

### **12-Hour Time Format Implementation** (`utils/prayerUtils.ts`):
```typescript
export const formatTime12Hour = (time24: string): string => {
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}
```

### **Time Display Benefits:**
- ✅ Converts 24-hour API format (18:30) to user-friendly 12-hour format (6:30 PM)
- ✅ Proper handling of midnight (00:00 → 12:00 AM) and noon (12:00 → 12:00 PM)
- ✅ Consistent AM/PM formatting across all prayer times
- ✅ Applied to all prayer time displays throughout the app

## 🎛️ **Switch Component Optimization System**

### **Performance Optimized Settings** (`components/prayer/SettingsSheet.tsx`):
```typescript
// Memoized component prevents unnecessary re-renders
const SettingCard = memo(({ icon, title, description, value, onToggle, uniqueKey }) => (
  <Card>
    <Switch
      checked={value}
      onCheckedChange={onToggle}
      size="$4"
      style={{ backgroundColor: value ? '#1793d1' : '#30363d' }}
    >
      <Switch.Thumb backgroundColor="#ffffff" />
    </Switch>
  </Card>
))

// Optimized context with instant UI updates
const updatePreferences = async (newPreferences) => {
  // Immediately update state for responsive UI
  const updatedPreferences = { ...preferences, ...newPreferences }
  setPreferences(updatedPreferences)
  
  // Save to storage asynchronously without blocking UI
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences))
}
```

### **Switch Optimization Benefits:**
- ✅ **No Flickering:** React.memo prevents unnecessary re-renders of other switches
- ✅ **Instant Response:** Optimistic updates provide immediate visual feedback
- ✅ **Background Saving:** AsyncStorage operations don't block UI interactions
- ✅ **Stable Animations:** Simplified animations for smooth thumb movement
- ✅ **Unique Keys:** Proper component identification for React optimization

## 🔧 **Date Handling System**

### **Custom Date Parser for Malaysian API:**
```typescript
const parseApiDate = (dateString: string): Date => {
  const monthMap: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  }
  
  const [day, month, year] = dateString.split('-')
  const monthIndex = monthMap[month]
  
  if (monthIndex !== undefined) {
    return new Date(parseInt(year), monthIndex, parseInt(day))
  }
  
  return new Date() // Fallback to current date
}

const formatGregorianDate = (dateString: string): string => {
  try {
    const date = parseApiDate(dateString)
    return date.toLocaleDateString('ms-MY', {
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    })
  } catch (error) {
    return new Date().toLocaleDateString('ms-MY', { /* fallback */ })
  }
}
```

### **Date Handling Benefits:**
- ✅ Reliable parsing of Malaysian API date format ("02-Sep-2025")
- ✅ Proper month name mapping (Jan = 0, Feb = 1, etc.)
- ✅ Robust error handling with fallbacks
- ✅ Consistent local date display in Malay format

## ⚙️ **Prayer Logic & Rules**

### **Prayer Display Order (API Sequence):**
1. **Imsak** (conditional) - Pre-dawn, optional display
2. **Subuh/Fajr** (always visible) - Dawn prayer
3. **Syuruk** (conditional) - Sunrise, optional display  
4. **Dhuha** (conditional) - Mid-morning, optional display
5. **Zohor/Dhuhr** (always visible) - Noon prayer
6. **Asar/Asr** (always visible) - Afternoon prayer
7. **Maghrib** (always visible) - Sunset prayer
8. **Isyak/Isha** (always visible) - Night prayer

### **Prayer State Logic:**
- **Current Prayer:** Active prayer period (between prayer time and next prayer)
- **Next Prayer:** The upcoming prayer time
- **Main Prayers:** Cannot be disabled by user (5 obligatory prayers)
- **Optional Prayers:** User can toggle visibility (3 additional prayers)

### **Visual Indicators:**
- **Blue Border:** Main obligatory prayers
- **Coral Border:** Additional/optional prayers
- **Thick Border (4px):** Next prayer highlighted
- **Background Highlight:** Current prayer period
- **Cache Status:** "Data tersimpan" vs "Data terkini"

## 📦 **Dependencies & Build Status**

### **Package Versions (Current):**
- Expo: ~53.0.7 
- React Native: 0.79.2 
- Tamagui: v4 (latest)
- Expo Router: ~5.0.5 
- AsyncStorage: 2.2.0 ✅ **INSTALLED** (for monthly caching & preferences)

### **Build Status:**
- **Metro Bundler:** ✅ Working with monthly caching system
- **Tamagui Compilation:** ✅ Working (24 components found)
- **TypeScript:** ⚠️ Warnings but builds successfully
- **Runtime:** ✅ Fully functional with 77 Malaysian zones
- **Caching System:** ✅ AsyncStorage monthly prayer time caching active
- **API Integration:** ✅ Monthly API calls with smart cache management
- **Production Builds:** ✅ EAS Build configured for APK with AsyncStorage fixes
- **New Architecture:** ❌ Disabled due to AsyncStorage compatibility issues

## 🔧 **Production Debugging & Error Handling System**

### **AsyncStorage Production Configuration** (`contexts/PrayerPreferencesContext.tsx`):
```typescript
// Development-aware logging system
const isDevelopment = typeof __DEV__ !== 'undefined' ? __DEV__ : false

// Production-visible error state
const [lastError, setLastError] = useState<string | null>(null)

// Conditional logging (dev only)
if (isDevelopment) console.log('Loading preferences...')

// Visible error messages (works in APK)
setLastError(`Storage error: ${error.message}`)
```

### **EAS Build Configuration** (`eas.json`):
```json
{
  "build": {
    "preview2": {
      "android": { "buildType": "apk" }
    }
  }
}
```

### **New Architecture Compatibility** (`app.json`):
```json
{
  "expo": {
    "plugins": [
      ["expo-build-properties", {
        "android": { "newArchEnabled": false }
      }]
    ]
  }
}
```

**Technical Decision**: Disabled New Architecture due to AsyncStorage native module linking issues in production builds.

## 🕐 **Enhanced Prayer Logic System**

### **Preference-Aware Prayer Calculations** (`utils/prayerUtils.ts`):
```typescript
// Dynamic prayer filtering based on user preferences
const prayersToConsider = PRAYER_NAMES.filter(prayer => {
  // Always include main prayers (5 obligatory)
  if (MAIN_PRAYER_TIMES.some(main => main.key === prayer.key)) return true
  
  // Include optional prayers based on user settings
  if (preferences) {
    if (prayer.key === 'imsak') return preferences.showImsak
    if (prayer.key === 'syuruk') return preferences.showSyuruk
    if (prayer.key === 'dhuha') return preferences.showDhuha
  }
  return false
})

// Next prayer calculation respects user preferences
export function getNextPrayerCountdown(prayerTime: PrayerTime, preferences?: PrayerPreferences)
```

### **Prayer State Management Benefits:**
- ✅ **User-Controlled Prayer Visibility**: Optional prayers (Imsak, Syuruk, Dhuha) can be toggled
- ✅ **Intelligent Next Prayer Logic**: Countdown considers enabled optional prayers
- ✅ **Proper Islamic Sequence**: Maintains correct prayer order regardless of user settings
- ✅ **Visual State Indicators**: Prayer cards highlight correctly for next/current prayers
- ✅ **Header Integration**: Combined header shows appropriate next prayer based on preferences

### **Debug Tools in Settings** (`components/prayer/SettingsSheet.tsx`):
```typescript
// Production-visible debug information
{lastError && (
  <Card backgroundColor="#2d1b1b" borderColor="#e53e3e">
    <Text color="#ff6b6b">{lastError}</Text>
  </Card>
)}

// Debug buttons that work in APK builds
<Button onPress={debugAsyncStorage}>Debug Storage</Button>
<Button onPress={clearPreferences}>Clear Data</Button>
```

**Debug Features:**
- **Debug Storage**: Shows AsyncStorage status without console
- **Clear Data**: Resets corrupted preferences to defaults
- **Error Display**: Visual error messages visible in production APK
- **Status Information**: Storage keys, data presence, current zone

## ⚠️ **Known Issues & Technical Debt**

### **RESOLVED ISSUES (Latest Session):**
1. ✅ **AsyncStorage APK Build Failures**: Fixed by disabling New Architecture and enhancing error handling
2. ✅ **Optional Prayer Logic**: Next prayer countdown now considers user-enabled optional prayers
3. ✅ **Production Debugging**: Added visible error states that work in APK builds

### **Current Technical Status:**
- **Tamagui v4 Types**: ⚠️ Type warnings but builds successfully at runtime
- **New Architecture**: ❌ Disabled for AsyncStorage compatibility (trade-off decision)
- **Version Alignment**: ⚠️ Some dependency version mismatches with Expo 53

**Recommendation for Future:** Consider updating Tamagui types or switching to styled components approach for problematic props.

### **Technical Debt Items:**
1. Replace hardcoded colors with consistent theme tokens
2. Implement proper error boundaries
3. Add loading skeletons instead of spinners
4. Optimize bundle size with tree shaking
5. Add unit tests for prayer time calculations
6. Implement proper accessibility support

## 🚀 **Future Development Roadmap**

### **Immediate Priorities:**
1. **Add Localization System:** Extend text constants system for multiple languages
2. **Testing:** Add unit tests for prayer time calculations and caching
3. **Accessibility:** Add screen reader support for prayer times
4. **Performance:** Further optimize countdown updates and re-renders

### **Feature Enhancements:**
1. **Notifications:** Implement actual prayer time reminders (currently UI-only)
2. **Audio:** Add Adhan (call to prayer) audio support
3. **Themes:** Add light mode support while maintaining current dark theme
4. **Advanced Customization:** Add prayer time adjustment settings
5. **Widgets:** Home screen widget support
6. **Calendar Integration:** Islamic calendar features
7. **Qibla Compass:** Enhanced qibla direction with compass integration

### **Performance Optimizations:**
1. ✅ **Switch Performance:** Resolved flickering and implemented instant response
2. ✅ **Text Management:** Centralized for easy updates and future translation
3. ✅ **Zone Persistence:** User selections now save permanently
4. ✅ **12-Hour Format:** Implemented user-friendly time display
5. ✅ **Header Optimization:** Side-by-side layout for better space utilization

### **Architecture Improvements:**
1. **Enhanced State Management:** Consider Zustand for complex state
2. **Component Library:** Build reusable prayer time components
3. **Error Boundaries:** Implement proper error handling
4. **Bundle Optimization:** Tree shaking and code splitting
5. **Type Safety:** Strengthen TypeScript usage across components

---

*This knowledge base is maintained as the source of truth for project architecture, patterns, and technical decisions. Update this document when making significant architectural changes.*
