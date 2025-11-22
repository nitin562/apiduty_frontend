import { NavigationContainer, createNavigationContainerRef} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from "react-redux"
import React from 'react'

import Login from "./login_register/Login.jsx"
import Register from "./login_register/Register.jsx"
import Home from "./home/Home.jsx"
import SplashScreen from "./splash/SplashScreen"
import {store} from "../source/redux/store.js"
import ModalProvider from "./utilities/ModalView.jsx"

export const navigationRef = createNavigationContainerRef()

export default function Source() {
    const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <ModalProvider>
      <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="splash">
              <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}}/>
              <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
              <Stack.Screen name="register" component={Register} options={{headerShown:false}}/>
              <Stack.Screen name="home" component={Home} options={{headerShown:false}}/>
          </Stack.Navigator>
      </NavigationContainer>
      </ModalProvider>
    </Provider>
  )
}
