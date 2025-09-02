import React, { memo } from 'react'
import { YStack, XStack, Text, Switch, Card, Button, Sheet, H2 } from 'tamagui'
import { Bell, Clock, Moon, X } from '@tamagui/lucide-icons'
import { usePrayerPreferences } from '../../contexts/PrayerPreferencesContext'
import { TEXTS } from '../../constants/texts'

interface SettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SettingItemProps {
  icon: React.ReactNode | null
  title: string
  description: string
  value: boolean
  onToggle: (value: boolean) => void
  uniqueKey: string
}

// Memoized SettingCard component to prevent unnecessary re-renders
const SettingCard = memo(({ icon, title, description, value, onToggle, uniqueKey }: SettingItemProps) => (
  <Card
    backgroundColor="#161b22"
    borderColor="#30363d"
    borderWidth={1}
    padding="$4"
    marginVertical="$2"
    borderRadius="$4"
    minHeight={70}
  >
    <XStack alignItems="center" justifyContent="space-between">
      <XStack alignItems="center" gap="$3" flex={1}>
        {icon}
        <YStack flex={1}>
          <Text
            fontSize="$4"
            fontWeight="600"
            color="#f0f6fc"
          >
            {title}
          </Text>
          <Text
            fontSize="$3"
            color="#8b949e"
            marginTop="$1"
          >
            {description}
          </Text>
        </YStack>
      </XStack>
      
      <Switch
        checked={value}
        onCheckedChange={onToggle}
        size="$4"
        style={{
          backgroundColor: value ? '#1793d1' : '#30363d'
        }}
      >
        <Switch.Thumb backgroundColor="#ffffff" />
      </Switch>
    </XStack>
  </Card>
))

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { preferences, updatePreferences } = usePrayerPreferences()

  const notificationSettings = [
    {
      icon: <Bell color="#1793d1" size={20} />,
      title: TEXTS.settings.prayerNotification,
      description: TEXTS.settings.prayerNotificationDesc,
      value: preferences.notifications,
      onToggle: (value: boolean) => updatePreferences({ notifications: value }),
      uniqueKey: 'notifications',
    },
    {
      icon: <Clock color="#f78166" size={20} />,
      title: TEXTS.settings.earlyNotification,
      description: TEXTS.settings.earlyNotificationDesc,
      value: preferences.earlyNotification,
      onToggle: (value: boolean) => updatePreferences({ earlyNotification: value }),
      uniqueKey: 'earlyNotification',
    },
  ]

  const prayerDisplaySettings = [
    {
      icon: null,
      title: TEXTS.settings.showImsak,
      description: TEXTS.settings.showImsakDesc,
      value: preferences.showImsak,
      onToggle: (value: boolean) => updatePreferences({ showImsak: value }),
      uniqueKey: 'showImsak',
    },
    {
      icon: null,
      title: TEXTS.settings.showSyuruk,
      description: TEXTS.settings.showSyurukDesc,
      value: preferences.showSyuruk,
      onToggle: (value: boolean) => updatePreferences({ showSyuruk: value }),
      uniqueKey: 'showSyuruk',
    },
    {
      icon: null,
      title: TEXTS.settings.showDhuha,
      description: TEXTS.settings.showDhuhaDesc,
      value: preferences.showDhuha,
      onToggle: (value: boolean) => updatePreferences({ showDhuha: value }),
      uniqueKey: 'showDhuha',
    },
  ]

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[90]}
      snapPointsMode="percent"
      dismissOnSnapToBottom
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0,0,0,0.5)"
      />
      
      <Sheet.Handle backgroundColor="#30363d" />
      
      <Sheet.Frame backgroundColor="#0d1117" borderTopLeftRadius="$4" borderTopRightRadius="$4">
        <YStack flex={1}>
          {/* Header */}
          <XStack alignItems="center" justifyContent="space-between" padding="$4" borderBottomWidth={1} borderBottomColor="#30363d">
            <H2 color="#f0f6fc" fontSize="$6" fontWeight="bold">
              {TEXTS.settings.title}
            </H2>
            <Button
              size="$3"
              circular
              chromeless
              onPress={() => onOpenChange(false)}
              backgroundColor="transparent"
            >
              <X color="#8b949e" size={20} />
            </Button>
          </XStack>

          {/* Content */}
          <Sheet.ScrollView
            flex={1}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <YStack padding="$4" gap="$4">
              <Text
                fontSize="$3"
                color="#8b949e"
              >
                {TEXTS.settings.subtitle}
              </Text>

              {/* Notification Settings */}
              <YStack gap="$3">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="#1793d1"
                  marginBottom="$2"
                >
                  {TEXTS.settings.notificationSection}
                </Text>
                
                {notificationSettings.map((setting, index) => (
                  <SettingCard key={setting.uniqueKey} {...setting} />
                ))}
              </YStack>

              {/* Prayer Display Settings */}
              <YStack gap="$3" marginTop="$4">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="#f78166"
                  marginBottom="$2"
                >
                  {TEXTS.settings.additionalPrayersSection}
                </Text>
                <Text
                  fontSize="$3"
                  color="#8b949e"
                  marginBottom="$2"
                  lineHeight={18}
                >
                  {TEXTS.settings.additionalPrayersDesc}
                </Text>
                
                {prayerDisplaySettings.map((setting, index) => (
                  <SettingCard key={setting.uniqueKey} {...setting} />
                ))}
              </YStack>

              {/* Theme Info */}
              <YStack gap="$3" marginTop="$4">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="#1793d1"
                  marginBottom="$2"
                >
                  {TEXTS.settings.themeSection}
                </Text>
                
                <Card
                  backgroundColor="#161b22"
                  borderColor="#30363d"
                  borderWidth={1}
                  padding="$4"
                  borderRadius="$4"
                >
                  <XStack alignItems="center" gap="$3">
                    <Moon color="#1793d1" size={20} />
                    <YStack flex={1}>
                      <Text
                        fontSize="$4"
                        fontWeight="600"
                        color="#f0f6fc"
                      >
                        {TEXTS.settings.darkTheme}
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              </YStack>

              {/* Bottom padding for safe area */}
              <YStack height="$6" />
            </YStack>
          </Sheet.ScrollView>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}
