import React, { useState } from 'react'
import { YStack, XStack, Text, Switch, Card, Button, ScrollView } from 'tamagui'
import { Bell, Volume2, Smartphone, Clock, Info, Moon, Sun } from '@tamagui/lucide-icons'

interface SettingItem {
  icon: React.ReactNode
  title: string
  description: string
  value?: boolean
  onToggle?: (value: boolean) => void
  showValue?: string
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [reminderBefore, setReminderBefore] = useState(true)

  const settings: SettingItem[] = [
    {
      icon: <Bell color="$archPrimary" />,
      title: 'Notifikasi Waktu Solat',
      description: 'Terima pemberitahuan ketika masuk waktu solat',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: <Volume2 color="$archAccent" />,
      title: 'Bunyi Azan',
      description: 'Mainkan azan ketika masuk waktu solat',
      value: sound,
      onToggle: setSound,
    },
    {
      icon: <Smartphone color="$archQibla" />,
      title: 'Getaran',
      description: 'Bergetar ketika menerima notifikasi',
      value: vibration,
      onToggle: setVibration,
    },
    {
      icon: <Clock color="$archWarning" />,
      title: 'Peringatan Awal',
      description: 'Notifikasi 15 minit sebelum waktu solat',
      value: reminderBefore,
      onToggle: setReminderBefore,
    },
  ]

  const SettingCard = ({ icon, title, description, value, onToggle, showValue }: SettingItem) => (
    <Card
      backgroundColor="$archSurface"
      borderColor="$archBorder"
      borderWidth={1}
      padding="$4"
      marginVertical="$2"
      borderRadius="$4"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$3" flex={1}>
          {icon}
          <YStack flex={1}>
            <Text
              fontSize="$4"
              fontWeight="600"
              color="$archText"
            >
              {title}
            </Text>
            <Text
              fontSize="$3"
              color="$archTextSecondary"
              marginTop="$1"
            >
              {description}
            </Text>
          </YStack>
        </XStack>
        
        {onToggle && value !== undefined ? (
          <Switch
            checked={value}
            onCheckedChange={onToggle}
            backgroundColor={value ? '$archPrimary' : '$archBorder'}
          />
        ) : showValue ? (
          <Text fontSize="$3" color="$archTextSecondary">
            {showValue}
          </Text>
        ) : null}
      </XStack>
    </Card>
  )

  return (
    <YStack flex={1} bg="$archBackground">
      <ScrollView flex={1}>
        <YStack padding="$4" gap="$4">
          {/* Header */}
          <YStack gap="$2" marginBottom="$2">
            <Text
              fontSize="$6"
              fontWeight="bold"
              color="$archText"
            >
              Tetapan
            </Text>
            <Text
              fontSize="$3"
              color="$archTextSecondary"
            >
              Sesuaikan aplikasi mengikut keutamaan anda
            </Text>
          </YStack>

          {/* Notification Settings */}
          <YStack gap="$3">
            <Text
              fontSize="$4"
              fontWeight="600"
              color="$archPrimary"
              marginBottom="$2"
            >
              Notifikasi
            </Text>
            
            {settings.map((setting, index) => (
              <SettingCard key={index} {...setting} />
            ))}
          </YStack>

          {/* App Information */}
          <YStack gap="$3" marginTop="$4">
            <Text
              fontSize="$4"
              fontWeight="600"
              color="$archPrimary"
              marginBottom="$2"
            >
              Maklumat Aplikasi
            </Text>
            
            <SettingCard
              icon={<Info color="$archTextSecondary" />}
              title="Versi Aplikasi"
              description="Waktu Solat Malaysia"
              showValue="1.0.0"
            />
            
            <Card
              backgroundColor="$archSurface"
              borderColor="$archBorder"
              borderWidth={1}
              padding="$4"
              marginVertical="$2"
              borderRadius="$4"
            >
              <YStack gap="$2">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="$archText"
                >
                  Tentang Aplikasi
                </Text>
                <Text
                  fontSize="$3"
                  color="$archTextSecondary"
                  lineHeight={20}
                >
                  Aplikasi Waktu Solat Malaysia menggunakan data rasmi dari 
                  JAKIM (e-solat.gov.my) untuk memberikan maklumat waktu solat 
                  yang tepat mengikut zon di seluruh Malaysia.
                </Text>
                <Text
                  fontSize="$3"
                  color="$archTextSecondary"
                  lineHeight={20}
                  marginTop="$2"
                >
                  Dibangunkan dengan React Native dan Tamagui untuk 
                  pengalaman pengguna yang moden dan responsif.
                </Text>
              </YStack>
            </Card>
          </YStack>

          {/* Theme Preview */}
          <YStack gap="$3" marginTop="$4">
            <Text
              fontSize="$4"
              fontWeight="600"
              color="$archPrimary"
              marginBottom="$2"
            >
              Tema
            </Text>
            
            <Card
              backgroundColor="$archSurface"
              borderColor="$archBorder"
              borderWidth={1}
              padding="$4"
              borderRadius="$4"
            >
              <XStack alignItems="center" gap="$3">
                <Moon color="$archPrimary" />
                <YStack flex={1}>
                  <Text
                    fontSize="$4"
                    fontWeight="600"
                    color="$archText"
                  >
                    Tema Gelap
                  </Text>
                  <Text
                    fontSize="$3"
                    color="$archTextSecondary"
                  >
                    Diilhamkan oleh Arch Linux - minimalis dan profesional
                  </Text>
                </YStack>
              </XStack>
            </Card>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
