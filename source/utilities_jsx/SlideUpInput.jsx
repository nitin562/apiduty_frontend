import React from 'react'
import { Text, TouchableOpacity, View } from "react-native"

export default function SlideUpInput({component, show, setShow, theme}) {
    const hide = () =>{
        setShow(false)
    }
  return (
    <View className="absolute w-full p-2" style={{
        bottom: show?"100%":"0%",
        borderTopEndRadius: 10,
        backgroundColor: theme.surfaceCard
    }}>
        <View className="flex-1">
            {component}
        </View>
        <View className="w-full flex-row justify-end items-center">
            <TouchableOpacity className="p-2 bg-blue-500 rounded-xl">
                <Text className="text-white" style={{
                    fontFamily: theme.font
                }} onPress={hide}>
                    Ok
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
