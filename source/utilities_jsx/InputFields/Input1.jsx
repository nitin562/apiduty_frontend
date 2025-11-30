import React from 'react'
import { TextInput, View, Text } from "react-native"

import {DashboardTheme} from "../../theme.js"

export default function Input1({name, field, value, setValue, errors, placeholder}) {
  const theme = DashboardTheme
  const handleChange = (text) =>{
    setValue(field, text)
  }
  return (
    <View className="p-2 gap-1 rounded-xl">
      <Text className="text-sm ml-1" style={{
        fontFamily: theme.font,
        color: theme.accentSparkline
      }}>{name}</Text>
      <TextInput className="text-md rounded-md px-2" placeholderTextColor={theme.textSecondary} 
        value={value} placeholder={placeholder}
        style={{
          fontFamily: theme.font,
          color: theme.textPrimary,
          backgroundColor: theme.surfaceSecondary
        }}
        onChangeText={handleChange}
      />
      {name in errors&&errors[name]&&<Text className="text-sm text-red-500">{errors[name]}</Text>}
    </View>
  )
}
