import React, { useState } from 'react'
import { Button, Card, Text, XStack, YStack, ScrollView } from 'tamagui'
import { MapPin, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { Zone, MALAYSIAN_ZONES } from '../../types/prayer'

interface ZoneSelectorProps {
  selectedZone: Zone
  onZoneChange: (zone: Zone) => void
}

export function ZoneSelector({ selectedZone, onZoneChange }: ZoneSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const groupedZones = MALAYSIAN_ZONES.reduce((acc, zone) => {
    if (!acc[zone.state]) {
      acc[zone.state] = []
    }
    acc[zone.state].push(zone)
    return acc
  }, {} as Record<string, Zone[]>)
  
  return (
    <YStack gap="$2">
      <Button
        backgroundColor="$archSurface"
        borderColor="$archBorder"
        borderWidth={1}
        padding="$3"
        onPress={() => setIsExpanded(!isExpanded)}
        borderRadius="$4"
      >
        <XStack alignItems="center" justifyContent="space-between" flex={1}>
          <XStack alignItems="center" gap="$2">
            <MapPin size="$1" color="$archPrimary" />
            <YStack>
              <Text
                fontSize="$4"
                fontWeight="600"
                color="$archText"
              >
                {selectedZone.name}
              </Text>
              <Text
                fontSize="$2"
                color="$archTextSecondary"
              >
                {selectedZone.state} ({selectedZone.code})
              </Text>
            </YStack>
          </XStack>
          
          {isExpanded ? (
            <ChevronUp size="$1" color="$archTextSecondary" />
          ) : (
            <ChevronDown size="$1" color="$archTextSecondary" />
          )}
        </XStack>
      </Button>
      
      {isExpanded && (
        <Card
          backgroundColor="$archSurface"
          borderColor="$archBorder"
          borderWidth={1}
          borderRadius="$4"
          padding="$2"
          maxHeight={300}
        >
          <ScrollView>
            {Object.entries(groupedZones).map(([state, zones]) => (
              <YStack key={state} gap="$1" marginBottom="$3">
                <Text
                  fontSize="$3"
                  fontWeight="600"
                  color="$archPrimary"
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                  backgroundColor="$archBackground"
                  borderRadius="$2"
                >
                  {state}
                </Text>
                
                {zones.map((zone) => (
                  <Button
                    key={zone.code}
                    backgroundColor={selectedZone.code === zone.code ? '$archPrimary' : 'transparent'}
                    borderColor="transparent"
                    onPress={() => {
                      onZoneChange(zone)
                      setIsExpanded(false)
                    }}
                    justifyContent="flex-start"
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                  >
                    <YStack alignItems="flex-start">
                      <Text
                        fontSize="$3"
                        color={selectedZone.code === zone.code ? '$archBackground' : '$archText'}
                        fontWeight={selectedZone.code === zone.code ? '600' : 'normal'}
                      >
                        {zone.name}
                      </Text>
                      <Text
                        fontSize="$2"
                        color={selectedZone.code === zone.code ? '$archBackground' : '$archTextSecondary'}
                      >
                        {zone.code}
                      </Text>
                    </YStack>
                  </Button>
                ))}
              </YStack>
            ))}
          </ScrollView>
        </Card>
      )}
    </YStack>
  )
}
