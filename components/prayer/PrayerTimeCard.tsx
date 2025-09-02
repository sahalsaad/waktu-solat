import React from 'react'
import { Card, Text, XStack, YStack, Circle } from 'tamagui'
import { PrayerName } from '../../types/prayer'
import { formatTime } from '../../utils/prayerUtils'

interface PrayerTimeCardProps {
  prayer: PrayerName
  time: string
  isNext?: boolean
  isCurrent?: boolean
  isAdditional?: boolean // New prop to differentiate prayer types
}

export function PrayerTimeCard({ prayer, time, isNext, isCurrent, isAdditional = false }: PrayerTimeCardProps) {
  // Determine left border color based on prayer type
  const leftBorderColor = isAdditional ? '$archAccent' : '$archPrimary'
  const leftBorderWidth = isNext ? 4 : (isAdditional ? 3 : 2)
  
  return (
    <Card
      backgroundColor={isCurrent ? '$archSurface' : '$archBackground'}
      borderColor={isNext ? '$archPrimary' : '$archBorder'}
      borderWidth={1}
      borderLeftWidth={leftBorderWidth}
      borderLeftColor={leftBorderColor}
      padding="$4"
      marginVertical="$2"
      borderRadius="$4"
      shadowColor="$archBackground"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1}>
          <XStack alignItems="center" gap="$2">
            {(isNext || isCurrent) && (
              <Circle
                size="$0.5"
                backgroundColor={isNext ? '$archPrimary' : '$archAccent'}
              />
            )}
            <Text
              fontSize="$5"
              fontWeight={isNext ? 'bold' : '600'}
              color={isNext ? '$archPrimary' : '$archText'}
            >
              {prayer.name}
            </Text>
          </XStack>
          <Text
            fontSize="$3"
            color="$archTextSecondary"
            marginTop="$1"
          >
            {prayer.nameArabic}
          </Text>
        </YStack>
        
        <Text
          fontSize="$6"
          fontWeight="bold"
          color={isNext ? '$archPrimary' : '$archText'}
        >
          {formatTime(time)}
        </Text>
      </XStack>
    </Card>
  )
}
