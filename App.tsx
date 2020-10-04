import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { PlayersList } from './src/components/PlayersList'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PlayerDetail } from './src/components/PlayerDetail'

export default function App(): JSX.Element {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      placeholder: '#FFFFFF',
      text: '#000000',
      primary: '#FFFFFF',
      underlineColor: 'transparent',
      background: '#47c945',
    },
  }

  const Stack = createStackNavigator()

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="PlayerList" options={{ title: 'Saison 2018' }} component={PlayersList} />
          <Stack.Screen name="PlayerDetail" options={{ headerBackTitleVisible: false }} component={PlayerDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
