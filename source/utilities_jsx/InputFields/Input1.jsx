import React from 'react'
import { TextInput, View, Text } from "react-native"

import {DashboardTheme} from "../../theme.js"

export default function Input1({name, field, value, setValue, errors, placeholder}) {
  const theme = DashboardTheme
  const handleChange = (text) =>{
    setValue(field, text)
  }
  return (
    <View className="p-2 gap-3 rounded-xl" style={{
      backgroundColor: theme.surfaceCard
    }}>
      <Text className="text-sm" style={{
        fontFamily: theme.font,
        color: theme.textPrimary
      }}>{name}</Text>
      <TextInput className="text-md rounded-xl bg-transparent border-white" placeholderTextColor={theme.textSecondary} 
        value={value} placeholder={placeholder}
        style={{
          fontFamily: theme.font,
          color: theme.textPrimary
        }}
        onChangeText={handleChange}
      />
      {name in errors&&errors[name]&&<Text className="text-sm text-red-500">{errors[name]}</Text>}
    </View>
  )
}
