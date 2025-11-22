import React from 'react'
import {View, Text} from "react-native"
import {Ionicons} from "@react-native-vector-icons/ionicons"

export default function Title({title, icon, theme}) {
  return (
    <View className="gap-4 items-center flex-row p-1">
        {icon && <Ionicons name={icon} size={20} color="#F0F0F5"/>}
        <Text className={`text-3xl text-[#F0F0F5]`} style={{fontFamily: theme.fontBold2}}>{title}</Text>
    </View>
  )
}
