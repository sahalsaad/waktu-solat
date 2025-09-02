import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

// Arch Linux inspired color palette
const archDarkPalette = [
  '#0d1117',      // background
  '#161b22',      // surface
  '#21262d',      // surface hover
  '#30363d',      // border
  '#484f58',      // border hover
  '#656d76',      // text muted
  '#7d8590',      // text secondary hover
  '#8b949e',      // text secondary
  '#b1bac4',      // text secondary light
  '#c9d1d9',      // text light
  '#f0f6fc',      // text primary
  '#ffffff',      // text contrast
]

const archLightPalette = [
  '#ffffff',      // background
  '#f6f8fa',      // surface
  '#f0f3f6',      // surface hover
  '#d1d9e0',      // border
  '#8b949e',      // border hover
  '#656d76',      // text muted
  '#57606a',      // text secondary hover
  '#424a53',      // text secondary
  '#32383f',      // text secondary dark
  '#24292f',      // text dark
  '#1f2328',      // text primary
  '#000000',      // text contrast
]

// Create custom themes by extending the default config
const customTokens = {
  ...defaultConfig.tokens,
  color: {
    archPrimary: '#1793d1',      // Arch blue
    archPrimaryDark: '#0f7cb0',  // Darker blue
    archSuccess: '#238636',      // Green
    archWarning: '#d29922',      // Yellow
    archError: '#da3633',        // Red
    archAccent: '#f78166',       // Coral accent
    archQibla: '#7c3aed',        // Purple for qibla
  },
}

// Custom themes
const customThemes = {
  ...defaultConfig.themes,
  dark: {
    ...defaultConfig.themes.dark,
    background: archDarkPalette[0],
    backgroundHover: archDarkPalette[1],
    backgroundPress: archDarkPalette[2],
    backgroundFocus: archDarkPalette[2],
    borderColor: archDarkPalette[3],
    borderColorHover: archDarkPalette[4],
    borderColorPress: archDarkPalette[4],
    borderColorFocus: archDarkPalette[4],
    color: archDarkPalette[10],
    colorHover: archDarkPalette[11],
    colorPress: archDarkPalette[9],
    colorFocus: archDarkPalette[10],
    placeholderColor: archDarkPalette[5],
    // Add custom arch colors
    archPrimary: '#1793d1',
    archSurface: archDarkPalette[1],
    archSurfaceHover: archDarkPalette[2],
    archBorder: archDarkPalette[3],
    archText: archDarkPalette[10],
    archTextSecondary: archDarkPalette[7],
    archTextMuted: archDarkPalette[5],
    archBackground: archDarkPalette[0],
  },
  light: {
    ...defaultConfig.themes.light,
    background: archLightPalette[0],
    backgroundHover: archLightPalette[1],
    backgroundPress: archLightPalette[2],
    backgroundFocus: archLightPalette[2],
    borderColor: archLightPalette[3],
    borderColorHover: archLightPalette[4],
    borderColorPress: archLightPalette[4],
    borderColorFocus: archLightPalette[4],
    color: archLightPalette[10],
    colorHover: archLightPalette[11],
    colorPress: archLightPalette[9],
    colorFocus: archLightPalette[10],
    placeholderColor: archLightPalette[5],
    // Add custom arch colors
    archPrimary: '#1793d1',
    archSurface: archLightPalette[1],
    archSurfaceHover: archLightPalette[2],
    archBorder: archLightPalette[3],
    archText: archLightPalette[10],
    archTextSecondary: archLightPalette[7],
    archTextMuted: archLightPalette[5],
    archBackground: archLightPalette[0],
  },
}

export const config = createTamagui({
  ...defaultConfig,
  tokens: customTokens,
  themes: customThemes,
  defaultTheme: 'dark',
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false
  }
})

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
