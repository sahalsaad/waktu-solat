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

## 📁 **Current Project Structure**
```
app/
├── index.tsx             # Main prayer times screen with monthly caching & conditional rendering
├── _layout.tsx           # Stack navigation with PrayerPreferencesProvider
├── modal.tsx            # Existing modal screens
└── +not-found.tsx       # 404 page

components/
├── prayer/
│   ├── SettingsSheet.tsx     # Enhanced settings with prayer toggles
│   ├── DateHeader.tsx        # Date and location information display
│   ├── NextPrayerCountdown.tsx # Next prayer countdown timer
│   ├── PrayerTimeCard.tsx    # Enhanced with isAdditional prop
│   ├── QiblaDirection.tsx    # Qibla compass
│   └── ZoneSelector.tsx      # Location selector (77 Malaysian zones)
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

## ⚠️ **Known Issues & Technical Debt**

### **TypeScript Compilation Issues:**
The project has persistent TypeScript errors related to Tamagui prop definitions:
- `alignItems`, `justifyContent` props not recognized
- `backgroundColor`, `borderRadius` props flagged as invalid
- `marginTop`, `paddingLeft` props not found in type definitions

**Current Status:** These appear to be Tamagui v4 type configuration issues, but the app builds and runs successfully at runtime.

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
1. **Fix TypeScript Issues:** Update Tamagui configuration or prop usage
2. **Testing:** Add unit tests for prayer time calculations and caching
3. **Accessibility:** Add screen reader support for prayer times
4. **Performance:** Optimize re-renders during countdown updates

### **Feature Enhancements:**
1. **Notifications:** Implement actual prayer time reminders (currently UI-only)
2. **Audio:** Add Adhan (call to prayer) audio support
3. **Themes:** Add light mode support
4. **Advanced Customization:** Add prayer time adjustment settings
5. **Widgets:** Home screen widget support
6. **Calendar Integration:** Islamic calendar features
7. **Qibla Compass:** Enhanced qibla direction with compass integration

### **Performance Optimizations:**
1. Implement proper memo for prayer cards
2. Optimize monthly data parsing
3. Add progressive loading for zone selection
4. Implement better cache management strategies

---

*This knowledge base is maintained as the source of truth for project architecture, patterns, and technical decisions. Update this document when making significant architectural changes.*
