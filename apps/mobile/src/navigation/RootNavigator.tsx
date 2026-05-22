import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import MainTabNavigator from './MainTabNavigator'
import OnboardingNavigator from './OnboardingNavigator'
import SettingsScreen from '../screens/main/SettingsScreen'
import type { RootStackParams } from './types'

const Stack = createStackNavigator<RootStackParams>()

// Temporary: always show onboarding first until auth is wired up
const isOnboarded = false

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#FBF8F1' } }}>
        {isOnboarded ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
          </>
        )}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
