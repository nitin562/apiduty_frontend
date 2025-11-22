/* eslint-disable react-native/no-inline-styles */
import { Text, View, ImageBackground, TouchableOpacity, Animated, ScrollView, ActivityIndicator } from "react-native"
import {LinearGradient} from "react-native-linear-gradient"

import {loginHelper} from "../api/user.js"
import {handleLoginError} from "../api/user.error.js"

import LoginTextInput from "./LoginTextInput.jsx"
import {LoginTheme} from "../theme.js"
import { ImageAsset } from "../assetConfig.js"
import { useEffect, useRef, useState } from "react"
import { DeviceStorage } from "../utilities/storage.js"
import { useDispatch } from "react-redux"
import { setTokens, setUserDetails } from "../redux/slices/user.js"
import { checkNotNull } from "../utilities/request.js"
import { wrapWithLoader } from "../utilities/wrapper.js"


export default function Login({navigation}) {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const translateY = useRef(new Animated.Value(0)).current 
  const animationRef = useRef(null)
  const navigateToRegister = () =>{
    navigation.navigate("register")
  }

  // ------------------- Login ----------------------
  const doLogin = wrapWithLoader(async function(){
    const nullValues = checkNotNull({email, password})
    if(!nullValues){
      setErrors(nullValues)
      return
    }
    setErrors({})

    const response = await loginHelper(email, password)
    if(!response){
      return
    }

    const {result, headers} = response
    if(result.code.toLowerCase() === "success"){
      const accessToken = headers.get("access-token")
      const refreshToken = headers.get("refresh-token")
      const {email:rawEmail, username} = result.data

      await DeviceStorage.insert(
        "session", {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      )

      dispatch(setUserDetails({email: rawEmail, username}))
      dispatch(setTokens({accessToken, refreshToken}))
      navigation.navigate("home")
    }
    else{
      const loginErrors = handleLoginError(result)
      setErrors((prev)=>{
        let error = prev
        error = {...error, ...loginErrors}
        return error
      })
    }
  }, setLoading)
  // ------------------- Login ----------------------

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
      
      <View className="h-[80%] flex justify-center gap-10">
        <Animated.View style={
          {
            transform:[{translateY}]
          }
        }>
          <ImageBackground source={{uri: ImageAsset.logo}} style={{height: 70}} resizeMode="contain"/>
        </Animated.View>
        <ScrollView className="flex-1">
        <View className="p-6 min-h-full bg-white">

            <View className="mb-10">
              <Text className="text-center text-[#06692d]" style={
                {
                  fontFamily: LoginTheme.fontBold,
                  fontSize: 25
                }
              }>Welcome Back</Text>
            </View>
            <View className="gap-5">
              <LoginTextInput placeholder="Enter Email" name="email" error={errors} value={email} setValue={setEmail} icon="mail"/>
              <LoginTextInput placeholder="Enter Password" name="password" error={errors} value={password} setValue={setPassword} icon="lock-open-sharp"/>

              <TouchableOpacity onPress={doLogin}>
                  <LinearGradient
                  colors={['#f13737', '#f18741']}
                  start={{x: 0.01, y: 0.60}}
                  end={{x: 0.99, y: 0.40}}
                  className=" mt-6 p-4"
                  style={{  
                    borderRadius: 10,
                  }}>
                    {
                      !loading && <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 , fontFamily:LoginTheme.font}}>
                              Login
                      </Text>
                    }
                    {
                      loading && <ActivityIndicator color={LoginTheme.extraColor}/>
                    }
                  </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className="flex-1 items-center justify-end">
              <Text onPress={navigateToRegister} style={{
                fontFamily: LoginTheme.font
              }}>Don't Have An Account? <Text className="text-red-500" style={{fontFamily:LoginTheme.fontBold}}>Create</Text></Text>
            </View>
        </View>
        </ScrollView>
          
      </View>
    </ImageBackground>
  )
}

