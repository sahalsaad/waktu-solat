import React from 'react'
import { Card, Text, XStack, YStack, Circle } from 'tamagui'
import { Compass, Navigation } from '@tamagui/lucide-icons'
import { PrayerTimeService } from '../../services/prayerService'

interface QiblaDirectionProps {
  bearing: string
}

export function QiblaDirection({ bearing }: QiblaDirectionProps) {
  const { degrees, direction } = PrayerTimeService.parseQiblaDirection(bearing)
  
  return (
    <Card
      backgroundColor="$archSurface"
      borderColor="$archQibla"
      borderWidth={1}
      padding="$4"
      marginVertical="$3"
      borderRadius="$4"
      shadowColor="$archQibla"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <YStack alignItems="center" gap="$3">
        <XStack alignItems="center" gap="$2">
          <Compass size="$1" color="$archQibla" />
          <Text
            fontSize="$4"
            fontWeight="600"
            color="$archText"
          >
            Arah Kiblat
          </Text>
        </XStack>
        
        <YStack alignItems="center" gap="$2">
          {/* Compass Visual */}
          <XStack alignItems="center" justifyContent="center" position="relative">
            <Circle
              size="$8"
              borderColor="$archBorder"
              borderWidth={2}
              backgroundColor="$archBackground"
              alignItems="center"
              justifyContent="center"
            >
              <Circle
                size="$6"
                borderColor="$archQibla"
                borderWidth={2}
                backgroundColor="$archSurface"
                alignItems="center"
                justifyContent="center"
              >
                <Navigation 
                  size="$2" 
                  color="$archQibla"
                  style={{ 
                    transform: [{ rotate: `${degrees}deg` }] 
                  }}
                />
              </Circle>
            </Circle>
          </XStack>
          
          <YStack alignItems="center" gap="$1">
            <Text
              fontSize="$6"
              fontWeight="bold"
              color="$archQibla"
              textAlign="center"
            >
              {degrees}°
            </Text>
            
            <Text
              fontSize="$4"
              color="$archText"
              textAlign="center"
            >
              {direction}
            </Text>
            
            <Text
              fontSize="$2"
              color="$archTextMuted"
              textAlign="center"
              dangerouslySetInnerHTML={{ __html: bearing }}
            />
          </YStack>
        </YStack>
      </YStack>
    </Card>
  )
}
