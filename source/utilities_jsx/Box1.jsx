import React from 'react'
import { Image, View, Text } from "react-native"

import {DashboardTheme} from "../theme.js"
import { statusMap } from "../utilities/statusMapping.js"
import { formatSmartTimestamp } from "../utilities/dateFormatter.js"

export default function Box1({title, timestamp, status, logoSrc}) {
    const theme = DashboardTheme
    const formattedTime = formatSmartTimestamp(timestamp)

  return (
    <View className={`p-2 flex-1 rounded-lg flex-row gap-5 items-center`} style={{backgroundColor: theme.surfaceCard}}>
        <View className="flex-[0.1] aspect-square p-2 rounded-full bg-white">
            <Image className="w-full h-full" resizeMode="contain" src={logoSrc}/>
        </View>
        <View className="flex-[0.8] h-full gap-3">
            <Text className={`text-md`} style={{fontFamily: theme.font, color: theme.textPrimary}}>{title}</Text>
            <View className="flex-1 flex-row justify-between items-end gap-1 flex-wrap">
                <StatusTag status={status}/>
                <Text className={`text-sm`} style={{fontFamily: theme.textSecondary, color: theme.textSecondary}}>{formattedTime}</Text>
            </View>
        </View>
        
    </View>
  )
}

export function StatusTag({status}){
    const getSafeStatus = (value) =>{
        if(value in statusMap){
            return statusMap[value]
        }
        return statusMap.ERROR
    }
    console.log(statusMap.ERROR)
    const {bg, text, label, icon} = getSafeStatus(status)
    const theme = DashboardTheme
    return (
        <View className={`flex-row items-center rounded-md py-1 px-2`} style={{backgroundColor: bg}}>
            <Text className="text-sm">{icon}  </Text><Text className={`text-md`} style={{color: text, fontFamily: theme.fontBold}}>{label}</Text>
        </View>
    )
}

