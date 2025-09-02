import React, { useState } from 'react'
import { Button, Text, XStack, YStack, Sheet, Input, H4 } from 'tamagui'
import { MapPin, Search, X } from '@tamagui/lucide-icons'
import { Zone, MALAYSIAN_ZONES } from '../../types/prayer'

interface ZoneSelectorProps {
  selectedZone: Zone
  onZoneChange: (zone: Zone) => void
}

export function ZoneSelector({ selectedZone, onZoneChange }: ZoneSelectorProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter zones based on search query
  const filteredZones = MALAYSIAN_ZONES.filter(zone => 
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.code.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  // Group filtered zones by state
  const groupedFilteredZones = filteredZones.reduce((acc, zone) => {
    if (!acc[zone.state]) {
      acc[zone.state] = []
    }
    acc[zone.state].push(zone)
    return acc
  }, {} as Record<string, Zone[]>)
  
  const handleZoneSelect = (zone: Zone) => {
    onZoneChange(zone)
    setSheetOpen(false)
    setSearchQuery('') // Reset search when closing
  }
  
  return (
    <>
      {/* Zone Selection Trigger Button */}
      <Button
        backgroundColor="$archSurface"
        borderColor="$archBorder"
        borderWidth={1}
        padding="$3"
        onPress={() => setSheetOpen(true)}
        borderRadius="$4"
        pressStyle={{ backgroundColor: '#30363d' }}
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
          
          <Text fontSize="$3" color="$archTextSecondary">Tukar</Text>
        </XStack>
      </Button>

      {/* Zone Selection Sheet */}
      <Sheet
        modal
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        snapPoints={[85]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame 
          backgroundColor="$archSurface" 
          borderTopLeftRadius="$4" 
          borderTopRightRadius="$4"
        >
          <YStack padding="$4" flex={1}>
            {/* Header */}
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
              <H4 color="$archText" fontWeight="600">
                Pilih Zon Waktu Solat
              </H4>
              <Button
                size="$3"
                circular
                chromeless
                onPress={() => setSheetOpen(false)}
                backgroundColor="transparent"
                pressStyle={{ backgroundColor: '#30363d' }}
              >
                <X color="$archTextSecondary" size={20} />
              </Button>
            </XStack>

            {/* Search Input */}
            <XStack alignItems="center" gap="$2" marginBottom="$4">
              <YStack flex={1}>
                <Input
                  placeholder="Cari negeri, daerah atau kod zon..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  backgroundColor="$archBackground"
                  borderColor="$archBorder"
                  color="$archText"
                  placeholderTextColor="$archTextSecondary"
                  fontSize="$3"
                  paddingLeft="$3"
                />
              </YStack>
              <Search size="$1" color="$archTextSecondary" />
            </XStack>

            {/* Results Count */}
            <Text fontSize="$2" color="$archTextSecondary" marginBottom="$3">
              {filteredZones.length} zon dijumpai
            </Text>

            {/* Zone List */}
            <Sheet.ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <YStack gap="$3">
                {Object.entries(groupedFilteredZones).map(([state, zones]) => (
                  <YStack key={state} gap="$2">
                    {/* State Header */}
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
                    
                    {/* Zone Buttons */}
                    {zones.map((zone) => (
                      <Button
                        key={zone.code}
                        backgroundColor={selectedZone.code === zone.code ? '$archPrimary' : 'transparent'}
                        borderColor={selectedZone.code === zone.code ? '$archPrimary' : '$archBorder'}
                        borderWidth={1}
                        onPress={() => handleZoneSelect(zone)}
                        justifyContent="flex-start"
                        paddingHorizontal="$3"
                        paddingVertical="$3"
                        borderRadius="$3"
                        pressStyle={{ 
                          backgroundColor: selectedZone.code === zone.code ? '$archPrimary' : '#30363d' 
                        }}
                      >
                        <YStack alignItems="flex-start" flex={1}>
                          <Text
                            fontSize="$3"
                            color={selectedZone.code === zone.code ? '$archBackground' : '$archText'}
                            fontWeight={selectedZone.code === zone.code ? '600' : '500'}
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
                        
                        {/* Selection Indicator */}
                        {selectedZone.code === zone.code && (
                          <Text fontSize="$4" color="$archBackground">✓</Text>
                        )}
                      </Button>
                    ))}
                  </YStack>
                ))}
                
                {/* No Results */}
                {filteredZones.length === 0 && (
                  <YStack alignItems="center" padding="$4">
                    <Text fontSize="$4" color="$archTextSecondary" textAlign="center">
                      Tiada zon dijumpai
                    </Text>
                    <Text fontSize="$2" color="$archTextSecondary" textAlign="center" marginTop="$2">
                      Cuba cari dengan nama negeri, daerah atau kod zon
                    </Text>
                  </YStack>
                )}
              </YStack>
              
              {/* Bottom Padding */}
              <YStack height="$4" />
            </Sheet.ScrollView>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
