import React from 'react'
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import WeatherSceen from '@/Screens/Weather'
import { Routes } from '@/Utils/routes'
import SearchSceen from '@/Screens/Search'
import { goBack } from '@/Navigators/utils'
import { Colors } from '@/Theme/Variables'
import Icon from '@/Assets/Icons'
import { wp } from '@/Utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme, Gutters } = useTheme()
  const { colors } = NavigationTheme

  const headerLeft = () => {
    return (
      <TouchableOpacity
        onPress={goBack}
        style={[Layout.center, Gutters.regularLPadding, Gutters.smallTPadding]}
      >
        <Icon
          name="ChevronBack"
          width={wp(20)}
          height={wp(20)}
          viewBox="0 0 20 20"
        />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator
          initialRouteName={Routes.Search}
          screenOptions={{ headerShown: true }}
        >
          <Stack.Screen
            name={Routes.Search}
            component={SearchSceen}
            options={{
              headerShown: true,
              title: 'Select City',
              animationEnabled: true,
              headerShadowVisible: true,
              headerStyle: { backgroundColor: Colors.light_blue },
            }}
          />
          <Stack.Screen
            name={Routes.Weather}
            component={WeatherSceen}
            options={{
              headerLeft,
              animationEnabled: true,
              headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
