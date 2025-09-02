import React from 'react'
import { Card, Text, XStack, YStack, Circle, LinearGradient } from 'tamagui'

interface NextPrayerCountdownProps {
  nextPrayer: string
  timeLeft: string
  currentPrayer: string
}

export function NextPrayerCountdown({ nextPrayer, timeLeft, currentPrayer }: NextPrayerCountdownProps) {
  return (
    <Card
      backgroundColor="$archSurface"
      borderColor="$archPrimary"
      borderWidth={2}
      padding="$5"
      marginVertical="$3"
      borderRadius="$6"
      shadowColor="$archPrimary"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.2}
      shadowRadius={8}
      elevation={4}
    >
      <YStack alignItems="center" gap="$3">
        <Text
          fontSize="$3"
          color="$archTextSecondary"
          textAlign="center"
          textTransform="uppercase"
          letterSpacing={1}
        >
          Waktu Solat Seterusnya
        </Text>
        
        <YStack alignItems="center" gap="$2">
          <Text
            fontSize="$8"
            fontWeight="bold"
            color="$archPrimary"
            textAlign="center"
          >
            {nextPrayer}
          </Text>
          
          <XStack alignItems="center" gap="$2">
            <Circle size="$0.5" backgroundColor="$archAccent" />
            <Text
              fontSize="$6"
              fontWeight="600"
              color="$archText"
              fontFamily="$mono"
            >
              {timeLeft}
            </Text>
            <Circle size="$0.5" backgroundColor="$archAccent" />
          </XStack>
        </YStack>
        
        <Text
          fontSize="$3"
          color="$archTextMuted"
          textAlign="center"
        >
          Sekarang: {currentPrayer}
        </Text>
      </YStack>
    </Card>
  )
}
