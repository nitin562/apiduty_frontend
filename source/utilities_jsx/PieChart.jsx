import React from 'react'
import { View, Text, Dimensions } from "react-native"
import {PieChart as Chart} from "react-native-gifted-charts"
export default function PieChart({data, theme}) {
    const { width } = Dimensions.get("window")
    const radius = width * 0.30
  return (
    <View className="w-full justify-center p-2 rounded-lg items-center" style={{backgroundColor: theme.surfaceCard}}>
        <Chart
          data={data}
          donut
          radius={radius}
          innerRadius={radius*0.6}
          textColor="#000"
          textSize={8}
          focusOnPress
          animationDuration={1000}
          innerCircleColor={theme.surfaceCard}
          centerLabelComponent={()=><CenterLabel theme={theme} count={data.length}/>}
        />
        <View className="flex-row flex-wrap justify-center mt-3 gap-x-10 gap-y-3">
          {data.map((item, index) => (
            <View key={index} className="flex-row flex-wrap gap-2 items-center">
              <View
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Text className="text-sm text-white p-1 rounded-lg" style={{backgroundColor: item.bg}}>{item.text}</Text>
            </View>
          ))}
        </View>
    </View>
  )
}


const CenterLabel = ({count, theme}) =>{
    return (
        <Text className="text-lg font-semibold text-center text-white" style={{fontFamily: theme.font}}>
              <Text className="text-3xl">{count}</Text>{"\n"}Total
        </Text>
    )
}
