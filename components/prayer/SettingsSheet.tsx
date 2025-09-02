import React, { useState } from 'react'
import { YStack, XStack, Text, Switch, Card, Button, Sheet, H2 } from 'tamagui'
import { Bell, Volume2, Smartphone, Clock, Info, Moon, X } from '@tamagui/lucide-icons'

interface SettingItem {
  icon: React.ReactNode
  title: string
  description: string
  value?: boolean
  onToggle?: (value: boolean) => void
  showValue?: string
}

interface SettingsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [reminderBefore, setReminderBefore] = useState(true)

  const settings: SettingItem[] = [
    {
      icon: <Bell color="#1793d1" size={20} />,
      title: 'Notifikasi Waktu Solat',
      description: 'Terima pemberitahuan ketika masuk waktu solat',
      value: notifications,
      onToggle: setNotifications,
    },
    {
      icon: <Volume2 color="#f78166" size={20} />,
      title: 'Bunyi Azan',
      description: 'Mainkan azan ketika masuk waktu solat',
      value: sound,
      onToggle: setSound,
    },
    {
      icon: <Smartphone color="#f78166" size={20} />,
      title: 'Getaran',
      description: 'Bergetar ketika menerima notifikasi',
      value: vibration,
      onToggle: setVibration,
    },
    {
      icon: <Clock color="#ffd700" size={20} />,
      title: 'Peringatan Awal',
      description: 'Notifikasi 15 minit sebelum waktu solat',
      value: reminderBefore,
      onToggle: setReminderBefore,
    },
  ]

  const SettingCard = ({ icon, title, description, value, onToggle, showValue }: SettingItem) => (
    <Card
      backgroundColor="#161b22"
      borderColor="#30363d"
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
        
        {onToggle && value !== undefined ? (
          <Switch
            checked={value}
            onCheckedChange={onToggle}
            backgroundColor={value ? '#1793d1' : '#30363d'}
          />
        ) : showValue ? (
          <Text fontSize="$3" color="#8b949e">
            {showValue}
          </Text>
        ) : null}
      </XStack>
    </Card>
  )

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
              Tetapan
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
                Sesuaikan aplikasi mengikut keutamaan anda
              </Text>

              {/* Notification Settings */}
              <YStack gap="$3">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="#1793d1"
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
                  color="#1793d1"
                  marginBottom="$2"
                >
                  Maklumat Aplikasi
                </Text>
                
                <SettingCard
                  icon={<Info color="#8b949e" size={20} />}
                  title="Versi Aplikasi"
                  description="Waktu Solat Malaysia"
                  showValue="1.0.0"
                />
                
                <Card
                  backgroundColor="#161b22"
                  borderColor="#30363d"
                  borderWidth={1}
                  padding="$4"
                  marginVertical="$2"
                  borderRadius="$4"
                >
                  <YStack gap="$2">
                    <Text
                      fontSize="$4"
                      fontWeight="600"
                      color="#f0f6fc"
                    >
                      Tentang Aplikasi
                    </Text>
                    <Text
                      fontSize="$3"
                      color="#8b949e"
                      lineHeight={20}
                    >
                      Aplikasi Waktu Solat Malaysia menggunakan data rasmi dari 
                      JAKIM (e-solat.gov.my) untuk memberikan maklumat waktu solat 
                      yang tepat mengikut zon di seluruh Malaysia.
                    </Text>
                    <Text
                      fontSize="$3"
                      color="#8b949e"
                      lineHeight={20}
                      marginTop="$2"
                    >
                      Dibangunkan dengan React Native dan Tamagui untuk 
                      pengalaman pengguna yang moden dan responsif.
                    </Text>
                  </YStack>
                </Card>
              </YStack>

              {/* Theme Info */}
              <YStack gap="$3" marginTop="$4">
                <Text
                  fontSize="$4"
                  fontWeight="600"
                  color="#1793d1"
                  marginBottom="$2"
                >
                  Tema
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
                        Tema Gelap
                      </Text>
                      <Text
                        fontSize="$3"
                        color="#8b949e"
                      >
                        Diilhamkan oleh Arch Linux - minimalis dan profesional
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
