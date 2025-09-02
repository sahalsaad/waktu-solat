import React from 'react'
import { Card, Text, XStack, YStack } from 'tamagui'
import { Calendar, MapPin, Clock } from '@tamagui/lucide-icons'
import { formatHijriDate } from '../../utils/prayerUtils'

interface CombinedHeaderProps {
  hijriDate: string
  gregorianDate: string
  zoneName: string
  day: string
  nextPrayer: string
  timeLeft: string
  currentPrayer: string
}

export function CombinedHeader({ 
  hijriDate, 
  gregorianDate, 
  zoneName, 
  day,
  nextPrayer, 
  timeLeft, 
  currentPrayer 
}: CombinedHeaderProps) {
  // Fix date formatting issue by properly parsing the date
  const formatGregorianDate = (dateString: string): string => {
    try {
      // Handle different date formats that might come from the API
      let date: Date
      
      // If it's in format "02-Sep-2025" or similar
      if (dateString.includes('-') && dateString.length > 10) {
        date = new Date(dateString)
      } else {
        // If it's in other formats, try to parse directly
        date = new Date(dateString)
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        // Fallback to current date if parsing fails
        date = new Date()
      }
      
      return date.toLocaleDateString('ms-MY', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch (error) {
      // Fallback to current date
      return new Date().toLocaleDateString('ms-MY', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }

  return (
    <Card
      backgroundColor="$archSurface"
      borderColor="$archBorder"
      borderWidth={1}
      padding="$4"
      marginVertical="$3"
      borderRadius="$4"
      shadowColor="$archBackground"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={2}
    >
      <YStack gap="$4">
        {/* Date Section */}
        <XStack gap="$3">
          {/* Left Border Indicator */}
          <YStack
            width={4}
            backgroundColor="$archAccent"
            borderRadius="$2"
            flex={0}
            minHeight={60}
          />
          
          <YStack flex={1} gap="$2">
            <XStack gap="$2">
              <Calendar size="$1" color="$archAccent" />
              <Text
                fontSize="$4"
                fontWeight="600"
                color="$archText"
              >
                {day}
              </Text>
            </XStack>
            
            <Text
              fontSize="$3"
              color="$archText"
            >
              {formatGregorianDate(gregorianDate)}
            </Text>
            
            <Text
              fontSize="$2"
              color="$archTextSecondary"
            >
              {formatHijriDate(hijriDate)}
            </Text>
            
            <XStack gap="$2">
              <MapPin size="$0.75" color="$archTextSecondary" />
              <Text
                fontSize="$2"
                color="$archTextSecondary"
              >
                {zoneName}
              </Text>
            </XStack>
          </YStack>
        </XStack>
        
        {/* Divider */}
        <YStack 
          height={1} 
          backgroundColor="$archBorder" 
          opacity={0.3} 
        />
        
        {/* Next Prayer Section */}
        <XStack gap="$3">
          {/* Left Border Indicator */}
          <YStack
            width={4}
            backgroundColor="$archPrimary"
            borderRadius="$2"
            flex={0}
            minHeight={60}
          />
          
          <YStack flex={1} gap="$2">
            <XStack gap="$2">
              <Clock size="$1" color="$archPrimary" />
              <Text
                fontSize="$3"
                color="$archTextSecondary"
                textTransform="uppercase"
              >
                Waktu Solat Seterusnya
              </Text>
            </XStack>
            
            <XStack gap="$3" flexWrap="wrap">
              <Text
                fontSize="$6"
                fontWeight="bold"
                color="$archPrimary"
              >
                {nextPrayer}
              </Text>
              
              <XStack gap="$2">
                <YStack
                  width={8}
                  height={8}
                  backgroundColor="$archAccent"
                  borderRadius={4}
                  alignSelf="center"
                />
                <Text
                  fontSize="$5"
                  fontWeight="600"
                  color="$archText"
                >
                  {timeLeft}
                </Text>
                <YStack
                  width={8}
                  height={8}
                  backgroundColor="$archAccent"
                  borderRadius={4}
                  alignSelf="center"
                />
              </XStack>
            </XStack>
            
            <Text
              fontSize="$2"
              color="$archTextMuted"
            >
              Sekarang: {currentPrayer}
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </Card>
  )
}
