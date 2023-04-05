import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthStateContextProvider } from './contexts/AuthContext'

import Login from './containers/Login'
import Todos from "./containers/Todos"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <AuthStateContextProvider>
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
    </AuthStateContextProvider>
  )
}

