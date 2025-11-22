import { useNavigation } from "@react-navigation/native"
import React from 'react'
import { TouchableOpacity, View, Text } from "react-native"
import Ionicons from "@react-native-vector-icons/ionicons"

import {DashboardTheme} from "../theme.js"

export default function SubHeading({title}) {
    const theme = DashboardTheme
    const navigation = useNavigation()
    const onPress = () => {
        navigation.goBack()
    }
  return (
    <View className="w-full flex-row relative" style={{
        backgroundColor: theme.surfaceCard
    }}>
        <TouchableOpacity onPress={onPress} className="absolute">
            <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <View className="flex-1 items-center justify-center">
            <Text className="text-xl" style={{
                fontFamily: theme.font,
                color: theme.textPrimary
            }}>
                {title}
            </Text>
        </View>
    </View>
  )
}
