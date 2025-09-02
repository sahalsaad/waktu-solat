import { Link, Tabs } from 'expo-router'
import { Button, useTheme } from 'tamagui'
import { Clock, Settings } from '@tamagui/lucide-icons'

export default function TabLayout() {
  const theme = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1793d1', // Arch blue
        tabBarInactiveTintColor: '#656d76', // Muted text
        tabBarStyle: {
          backgroundColor: '#161b22', // Surface color
          borderTopColor: '#30363d', // Border color
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: '#161b22', // Surface color
          borderBottomColor: '#30363d', // Border color
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: '#f0f6fc', // Primary text
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Waktu Solat',
          tabBarIcon: ({ color }) => <Clock color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tetapan',
          tabBarIcon: ({ color }) => <Settings color={color as any} />,
        }}
      />
    </Tabs>
  )
}
