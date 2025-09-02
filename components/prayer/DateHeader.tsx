import { Card, Text, XStack, YStack } from 'tamagui'
import { Calendar, MapPin } from '@tamagui/lucide-icons'
import { formatHijriDate, formatGregorianDate } from '../../utils/prayerUtils'

interface DateHeaderProps {
  hijriDate: string
  gregorianDate: string
  zoneName: string
  day: string
}

export function DateHeader({ hijriDate, gregorianDate, zoneName, day }: DateHeaderProps) {
  return (
    <Card
      backgroundColor="$archSurface"
      borderColor="$archBorder"
      borderWidth={1}
      padding="$4"
      marginVertical="$3"
      borderRadius="$4"
    >
      <YStack gap="$3">
        <XStack alignItems="center" justifyContent="center" gap="$2">
          <Calendar size="$1" color="$archPrimary" />
          <Text
            fontSize="$4"
            fontWeight="600"
            color="$archText"
            textAlign="center"
          >
            {day}
          </Text>
        </XStack>
        
        <YStack gap="$2" alignItems="center">
          <Text
            fontSize="$4"
            color="$archText"
            textAlign="center"
          >
            {formatGregorianDate(gregorianDate)}
          </Text>
          
          <Text
            fontSize="$3"
            color="$archTextSecondary"
            textAlign="center"
          >
            {formatHijriDate(hijriDate)}
          </Text>
        </YStack>
        
        <XStack alignItems="center" justifyContent="center" gap="$2">
          <MapPin size="$1" color="$archAccent" />
          <Text
            fontSize="$3"
            color="$archTextSecondary"
            textAlign="center"
          >
            {zoneName}
          </Text>
        </XStack>
      </YStack>
    </Card>
  )
}
