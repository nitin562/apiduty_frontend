/* eslint-disable react-native/no-inline-styles */
import { Text, View, ImageBackground, TouchableOpacity, Animated, ScrollView, ActivityIndicator } from "react-native"
import {LinearGradient} from "react-native-linear-gradient"

import LoginTextInput from "./LoginTextInput.jsx"
import {LoginTheme} from "../theme.js"
import { ImageAsset } from "../assetConfig.js"
import { useEffect, useRef, useState } from "react"
import { checkNotNull } from "../utilities/request.js"
import { RegisterHelper } from "../api/user.js"
import { handleRegisterError } from "../api/user.error.js"
import { useModal } from "../utilities/ModalView.jsx"
import { wrapWithLoader } from "../utilities/wrapper.js"


export default function Register({navigation}) {
  const {showModal} = useModal()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const translateY = useRef(new Animated.Value(0)).current 
  const animationRef = useRef(null)
  const navigateToRegister = () =>{
    navigation.navigate("login")
  }

  // ------------------- Register ----------------------
    const doRegister = wrapWithLoader(async ()=>{
      setErrors(checkNotNull({username, email, password}))
      const response = await RegisterHelper(username, email, password)
      if(!response){
        return
      }
      const {result} = response
      if(result.code.toLowerCase() === "success"){
        showModal("Registered Successfully. Please Login Now")
        navigation.navigate("login")
      }
      else{
        const registerErrors = handleRegisterError(result)
        setErrors((prev)=>{
          let error = prev
          error = {...error, ...registerErrors}
          return error
        })
      }
    }, setLoading)
    // ------------------- Register ----------------------

    useEffect(() => {
    // Create the looping animation
    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    )

    // Start it
    animationRef.current.start()

    // Cleanup on unmount
    return () => {
      animationRef.current?.stop() // stops the loop
    }
  }, [translateY])
  
  return (
    <ImageBackground source={{uri: ImageAsset.splash}} resizeMode="cover" className="flex-1 flex justify-end">
      <View className="absolute inset-0 bg-black/70 h-full"/> 
      
      <View className="flex h-[80%] justify-center">
        <Animated.View style={
          {
            transform:[{translateY}]
          }
        }>
          <ImageBackground source={{uri: ImageAsset.logo}} style={{height: 70}} resizeMode="contain"/>
        </Animated.View>
        <ScrollView className="flex-1">
        <View className="min-h-full p-6 bg-white" >

            <View className="mb-10">
              <Text className="text-center text-[#06692d] " style={
                {
                  fontFamily: LoginTheme.fontBold,
                  fontSize: 25
                }
              }>A Step Towards API Monitoring</Text>
            </View>
            <View className="gap-5">
              <LoginTextInput placeholder="Enter Name" name="username" error={errors} value={username} setValue={setUsername} icon="person-circle"/>
              <LoginTextInput placeholder="Enter Email" name="email" error={errors} value={email} setValue={setEmail} icon="mail"/>
              <LoginTextInput placeholder="Enter Password" name="password" error={errors} value={password} setValue={setPassword} icon="lock-open-sharp"/>

              <TouchableOpacity onPress={doRegister}>
                  <LinearGradient
                  colors={['#f13737', '#f18741']}
                  start={{x: 0.01, y: 0.60}}
                  end={{x: 0.99, y: 0.40}}
                  className="mt-6 p-4"
                  style={{  
                    borderRadius: 10,
                  }}>
                    {
                      !loading && <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 , fontFamily:LoginTheme.font}}>
                              Register
                      </Text>
                    }
                    {
                      loading && <ActivityIndicator color={LoginTheme.extraColor}/>
                    }
                  </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className="flex-1 mt-4 items-center justify-end">
              <Text onPress={navigateToRegister} style={{
                fontFamily: LoginTheme.font
              }}>Already Have An Account? <Text className="text-blue-500" style={{fontFamily:LoginTheme.fontBold}}>Login</Text></Text>
            </View>
        </View>
        </ScrollView>
          
      </View>
    </ImageBackground>
  )
}

