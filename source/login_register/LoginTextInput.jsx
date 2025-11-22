import React from "react"
import { TextInput, View, Text } from "react-native"
import {Ionicons} from "@react-native-vector-icons/ionicons"
import { LoginTheme } from "../theme"

export default function LoginTextInput({ name, placeholder, value, setValue, icon, error={} }) {
  return (
    <View>
      <View className="flex-row items-center border-[1px] border-gray-500 rounded-xl px-3 py-2 ">
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={LoginTheme.primaryColor}
            style={{ marginRight: 8 }}
          />
        )}

        <TextInput
          className="flex-1 text-base text-black"
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={(text) => setValue(text)}
          secureTextEntry={name==="password"?true:false}
          style={
            {
              fontFamily: LoginTheme.font
            }
          }
        />
      </View>
      <Text className="text-sm text-[#ff1e1e] text-right" style={
        {
          fontFamily: LoginTheme.font
        }
      }>{(name in error)&&(error[name])&&error[name]}</Text>
    </View>
  )
}
