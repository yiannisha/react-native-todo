import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { AuthStateContextProvider } from './contexts/AuthContext'
import { TodoStateContextProvider } from './contexts/TodosContext'

import Login from './containers/Login'
import Todos from "./containers/Todos"
import rootReducer from './slices'

const Stack = createNativeStackNavigator()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default function App() {
  return (
      <Provider store={store}>
        <TodoStateContextProvider>
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
        </TodoStateContextProvider>
      </Provider>
  )
}
