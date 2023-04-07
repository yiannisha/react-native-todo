import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { AuthStateContextProvider } from './contexts/AuthContext'
import { TodoStateContextProvider } from './contexts/TodosContext'
import { _intializeToken } from './slices/auth'

import Login from './containers/Login'
import Todos from "./containers/Todos"
import rootReducer from './slices'
import { useEffect } from 'react'
import { getAuth } from './selectors'

const Stack = createNativeStackNavigator()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

const Router = () => {
  
  const { token } = useSelector(getAuth)
  
  const dispatch = useDispatch()
  
  // @ts-ignore
  const initToken = () => dispatch(_intializeToken())

  useEffect(() => {
    initToken()
  }, [token])

  return (
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
  )
}

export default function App() {
  return (
      <Provider store={store}>
        <Router />        
      </Provider>
  )
}
