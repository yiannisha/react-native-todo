import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import eventsource from 'react-native-sse'
import PocketBase from 'pocketbase' 

import Login from './containers/Login'
import Todos from "./containers/Todos"

const Stack = createNativeStackNavigator()

const serverURL = 'https://testdbforyiannis.fly.dev';
const collections = ['users', 'notes'];
export const pb = new PocketBase(serverURL)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Todos' component={Todos} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

