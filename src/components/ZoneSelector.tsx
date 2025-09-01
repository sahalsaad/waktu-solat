import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Modal, 
  FlatList, 
  TextInput,
  Animated,
  Dimensions 
} from 'react-native';
import { MALAYSIA_ZONES, ZoneInfo } from '../data/prayer-time';

interface ZoneSelectorProps {
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  loading: boolean;
}

const { width, height } = Dimensions.get('window');

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ 
  selectedZone, 
  onZoneChange, 
  loading 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredZones, setFilteredZones] = useState<ZoneInfo[]>(MALAYSIA_ZONES);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const filtered = MALAYSIA_ZONES.filter(zone =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredZones(filtered);
  }, [searchQuery]);

  const getSelectedZoneInfo = (): ZoneInfo | undefined => {
    return MALAYSIA_ZONES.find(zone => zone.code === selectedZone);
  };

  const handleZoneSelect = (zone: ZoneInfo) => {
    onZoneChange(zone.code);
    setModalVisible(false);
    setSearchQuery('');
    
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderZoneItem = ({ item }: { item: ZoneInfo }) => (
    <Pressable
      style={({ pressed }) => [
        styles.zoneItem,
        item.code === selectedZone && styles.selectedZoneItem,
        pressed && styles.pressedZoneItem,
      ]}
      onPress={() => handleZoneSelect(item)}
    >
      <View style={styles.zoneItemContent}>
        <Text style={[
          styles.zoneCode,
          item.code === selectedZone && styles.selectedZoneCode
        ]}>
          {item.code}
        </Text>
        <View style={styles.zoneDetails}>
          <Text style={[
            styles.zoneName,
            item.code === selectedZone && styles.selectedZoneName
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.zoneState,
            item.code === selectedZone && styles.selectedZoneState
          ]}>
            {item.state}
          </Text>
        </View>
      </View>
      {item.code === selectedZone && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </Pressable>
  );

  const selectedZoneInfo = getSelectedZoneInfo();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Prayer Zone</Text>
      
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          style={({ pressed }) => [
            styles.selector,
            pressed && styles.selectorPressed,
            loading && styles.selectorLoading,
          ]}
          onPress={() => setModalVisible(true)}
          disabled={loading}
        >
          <View style={styles.selectorContent}>
            <View style={styles.selectorLeft}>
              <View style={styles.locationIcon}>
                <Text style={styles.locationIconText}>📍</Text>
              </View>
              <View style={styles.selectorText}>
                <Text style={styles.selectedZoneCode}>
                  {selectedZoneInfo?.code || selectedZone}
                </Text>
                <Text style={styles.selectedZoneName}>
                  {selectedZoneInfo?.name || 'Select Zone'}
                </Text>
              </View>
            </View>
            <View style={styles.selectorRight}>
              <Text style={styles.chevron}>›</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Prayer Zone</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>
            
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search zones, states, or areas..."
                placeholderTextColor="#a0aec0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={filteredZones}
              keyExtractor={(item) => item.code}
              renderItem={renderZoneItem}
              style={styles.zoneList}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.zoneSeparator} />}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f7fafc',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  selector: {
    backgroundColor: '#2d3748',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#4a5568',
  },
  selectorPressed: {
    backgroundColor: '#4a5568',
  },
  selectorLoading: {
    opacity: 0.6,
  },
  selectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 16,
  },
  selectorText: {
    flex: 1,
  },
  selectedZoneCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64b5f6',
    letterSpacing: 0.5,
  },
  selectedZoneName: {
    fontSize: 14,
    color: '#cbd5e0',
    marginTop: 2,
    lineHeight: 18,
  },
  selectorRight: {
    marginLeft: 12,
  },
  chevron: {
    fontSize: 20,
    color: '#a0aec0',
    fontWeight: '300',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1f2e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.8,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d3748',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f7fafc',
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2d3748',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#a0aec0',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3748',
    borderRadius: 12,
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#f7fafc',
    fontWeight: '500',
  },
  zoneList: {
    paddingHorizontal: 20,
  },
  zoneItem: {
    backgroundColor: '#2d3748',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
  },
  selectedZoneItem: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#64b5f6',
  },
  pressedZoneItem: {
    backgroundColor: '#4a5568',
  },
  zoneItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64b5f6',
    backgroundColor: '#4a5568',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
    minWidth: 60,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  zoneDetails: {
    flex: 1,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f7fafc',
    marginBottom: 2,
    lineHeight: 20,
  },
  zoneState: {
    fontSize: 14,
    color: '#a0aec0',
    fontWeight: '500',
  },
  selectedZoneState: {
    color: '#90cdf4',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#64b5f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkmarkText: {
    color: '#1a1f2e',
    fontSize: 14,
    fontWeight: '700',
  },
  zoneSeparator: {
    height: 1,
    backgroundColor: '#4a5568',
    marginVertical: 4,
    opacity: 0.3,
  },
});

export default ZoneSelector;