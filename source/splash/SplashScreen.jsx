import React, { useEffect, useState } from 'react'

import { ImageBackground, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { ImageAsset } from '../assetConfig'
import { SplashTheme } from '../theme'
import { setModalRef, useModal } from "../utilities/ModalView"
import { wrapWithLoader } from "../utilities/wrapper.js"
import { DeviceStorage } from "../utilities/storage"
import { useDispatch } from "react-redux"
import { setTokens, setUserDetails } from "../redux/slices/user"
import { pingHelper } from "../api/user"

export default function SplashScreen({navigation}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const onStartedPress = () =>{
    navigation.navigate("login")
  }

  const checkLoginStatus = wrapWithLoader(async () =>{
    const session = await DeviceStorage.get("session", false)
    if(!session){
      return
    }

    const {accessToken, refreshToken} = session
    dispatch(setTokens({accessToken, refreshToken}))

    const response = await pingHelper()
    console.log(response)
    if(response){
      const {username, email} = response.result.data
      dispatch(setUserDetails({email, username}))
      navigation.navigate("home")
      return
    }
    return
  }, setLoading)

  const {showModal, hideModal} = useModal()
  useEffect(()=>{
    setModalRef({showModal, hideModal})
  }, [showModal, hideModal])

  useEffect(()=>{
    checkLoginStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ImageBackground source={{uri: ImageAsset.splash}} className="flex-1 flex justify-end" resizeMode="cover">
        {/* Overlay */}
      <View className="absolute inset-0 bg-black/70 h-full"/> 

      <View className="w-full h-3/4 flex justify-between p-6">
      
        <View className="h-[35%] p-4 flex gap-4">
          <ImageBackground source={{uri: ImageAsset.logo}}
           className="flex-1 norder-2 rounded-3xl" resizeMode="contain"/>
          <Text className="w-full text-center text-xl" style={{
            color: SplashTheme.extraColor,
            fontFamily: SplashTheme.fontBold
          }}>Welcome To <Text style={{color: SplashTheme.textColor}}>API Duty</Text></Text>
        </View>
        {loading && <ActivityIndicator color={SplashTheme.extraColor} />}
        {
          !loading && <TouchableOpacity className="mb-5 w-full p-3 rounded-xl flex items-center"
          style={{
            backgroundColor: SplashTheme.primaryColor,
          }}
            onPress={onStartedPress}>
              <Text className="text-2xl font-bold" style={{
                color: SplashTheme.textColor,
                fontFamily: SplashTheme.font
              }}>
                  Get Started
              </Text>
          </TouchableOpacity>
      }
      <Text className="text-[#eee] italic font-md mb-2 mt-2">version 1.0</Text>
      </View>
    </ImageBackground>
  )
}
