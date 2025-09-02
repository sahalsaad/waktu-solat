import React, { useRef, useEffect } from 'react'
import { XStack, YStack, Text } from 'tamagui'
import { Pressable, Animated } from 'react-native'

interface AnimatedSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export function AnimatedSwitch({ 
  value, 
  onValueChange, 
  size = 'medium',
  disabled = false 
}: AnimatedSwitchProps) {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current
  
  // Size configurations
  const sizes = {
    small: { width: 44, height: 24, thumbSize: 20, padding: 2 },
    medium: { width: 52, height: 28, thumbSize: 24, padding: 2 },
    large: { width: 60, height: 32, thumbSize: 28, padding: 2 }
  }
  
  const config = sizes[size]
  
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [value, animatedValue])
  
  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [config.padding, config.width - config.thumbSize - config.padding],
  })
  
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#30363d', '#1793d1'],
  })
  
  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#8b949e', '#1793d1'],
  })
  
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={{
          width: config.width,
          height: config.height,
          backgroundColor,
          borderRadius: config.height / 2,
          borderWidth: 2,
          borderColor,
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: config.padding,
          flexDirection: 'row',
        }}
      >
        {/* Switch Thumb */}
        <Animated.View
          style={{
            width: config.thumbSize,
            height: config.thumbSize,
            backgroundColor: '#ffffff',
            borderRadius: config.thumbSize / 2,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            shadowOpacity: 1,
            elevation: 3,
            transform: [{ translateX: thumbTranslateX }],
          }}
        />
      </Animated.View>
    </Pressable>
  )
}

interface SettingSwitchProps {
  title: string
  description: string
  value: boolean
  onValueChange: (value: boolean) => void
  icon?: React.ReactNode
}

export function SettingSwitch({ 
  title, 
  description, 
  value, 
  onValueChange, 
  icon 
}: SettingSwitchProps) {
  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <XStack
        backgroundColor="#161b22"
        borderColor="#30363d"
        borderWidth={1}
        padding="$4"
        marginVertical="$2"
        borderRadius="$4"
        alignItems="center"
        justifyContent="space-between"
        style={{
          minHeight: 70,
        }}
      >
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
        
        <AnimatedSwitch
          value={value}
          onValueChange={onValueChange}
          size="medium"
        />
      </XStack>
    </Pressable>
  )
}
