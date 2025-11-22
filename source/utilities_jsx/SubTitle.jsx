import React from 'react'
import {View, Text} from "react-native"
import {Ionicons} from "@react-native-vector-icons/ionicons"

export default function SubTitle({title, icon, theme}) {
  return (
    <View className="gap-4 items-center flex-row w-full p-1">
        {icon && <Ionicons name={icon} size={20} color="#F0F0F5"/>}
        <Text className={`text-xl text-[#eaeaea]`} style={{fontFamily: theme.font}}>{title}</Text>
    </View>
  )
}
