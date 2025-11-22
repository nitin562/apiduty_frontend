import React, { useEffect, useRef, useState } from 'react'
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { DashboardTheme } from "../theme.js"
import Input1 from "../utilities_jsx/InputFields/Input1.jsx"
import OptionField from "../utilities_jsx/InputFields/OptionField.jsx"
import SlideInput from "../utilities_jsx/SlideUpInput.jsx"

import Ionicons from "@react-native-vector-icons/ionicons"
import SubHeading from "../utilities_jsx/SubHeading.jsx"

export default function NewService() {
  const theme = DashboardTheme
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const handleStep = (value) => {
    return () => {
      return setStep((step) => {
        return step + value
      })
    }
  }
  return (
    <View className="flex-1 p-4" style={{
      backgroundColor: theme.surfaceCard
    }} >
      <View className="gap-5">
        <SubHeading title="Add Service" />
        <ProgessBar step={step} last={2} />
      </View>
      <View className="w-full flex-1">
        {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
      </View>

      <View className="flex-row items-center" style={{
        justifyContent: step > 1 ? "space-between" : "flex-end"
      }}>
        {step > 1 && <TouchableOpacity className="p-2 bg-red-400" onPress={handleStep(-1)}>
          <Text className="text-md text-white" style={{ fontFamily: theme.font }}>
            Back
          </Text>
        </TouchableOpacity>}

        {step < 1 && <TouchableOpacity className="p-2 bg-emerald-400" onPress={handleStep(1)}>
          <Text className="text-md text-white" style={{ fontFamily: theme.font }}>
            Next
          </Text>
        </TouchableOpacity>}

        {step === 1 && <TouchableOpacity className="p-2 bg-blue-400">
          <Text className="text-md text-white" style={{ fontFamily: theme.font }}>
            Submit
          </Text>
        </TouchableOpacity>}
      </View>

    </View>
  )
}


function ProgessBar({ step, last }) {
  const theme = DashboardTheme
  const progressValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const progress = (step - 1) / (last - 1);
    Animated.timing(progressValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    })
  }, [step])

  const progressWidth = progressValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  })

  return (
    <View className="relative w-full">
      {/* Static Line */}
      <View className="w-full h-1 rounded-xl absolute top-4 left-0 right-0" style={{
        backgroundColor: theme.surfaceSecondary
      }} />

      <Animated.View className="h-1 rounded-xl absolute top-4" style={{
        backgroundColor: theme.progress,
        width: progressWidth
      }} />

      <View className="w-full flex-row justify-between">
        {Array(last).map((_, index) => {
          const active = step >= index
          const completed = step > index
          return (
            <View key={index} className="w-10 items-center">
              {/* Step Circle */}
              <View
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{
                  backgroundColor: active
                    ? theme.accentPrimaryStart
                    : theme.surfaceSecondary,
                  borderColor: active
                    ? theme.accentPrimaryEnd
                    : theme.textSecondary,
                }}
              >
                {completed ? (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                ) : (
                  <Text
                    className="font-semibold"
                    style={{
                      color: active
                        ? theme.textPrimary
                        : theme.textSecondary,
                      fontFamily: theme.fontBold2,
                    }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
            </View>
          )
        })}

      </View>

    </View>
  )
}

function Step1({ data, setData, errors }) {
  const STATUS_MAP = [
    { name: "CRITICAL", value: "Critical" },
    { name: "HIGH", value: "High" },
    { name: "MEDIUM", value: "Medium" },
    { name: "NORMAL", value: "Normal" },
    { name: "LOW", value: "Low" }
  ];

  const STATE_MAP = [
    { name: "ON", value: "ON" },
    { name: "OFF", value: "OFF" }
  ]

  const [optionProps, setOptionProps] = useState({
    list: [],
    field: "",
    setValue: () => { }
  })
  const [showOptions, setshowOptions] = useState(false)
  const handleOptionFieldClick = (name) => {
    if (showOptions) {
      return
    }

    const props = {}
    props.field = name
    props.currentSelection = data[name] || ""
    props.setValue = changeValue
    if (name === "Status") {
      props.list = STATUS_MAP
    }
    else {
      props.list = STATE_MAP
    }

    setOptionProps(props)
    setshowOptions(true)
  }
  const changeValue = (field, value) => {
    setData((prev) => {
      const copy = prev
      copy[field] = value
      return copy
    })
  }
  return (
    <View className="flex-1 w-full gap-4">
      <Input1 field="serviceName" name="Name" value={data?.serviceName || ""}
        placeholder="Enter Service Name" setValue={changeValue} errors={errors}
      />
      <Input1 field="serviceDescription" name="Description" value={data?.serviceDescription || ""}
        placeholder="Enter Service Description" setValue={changeValue} errors={errors}
      />
      <OptionField name="Status" value={data.serviceStatus} handleClick={handleOptionFieldClick} />
      <OptionField name="State" value={data.serviceState} handleClick={handleOptionFieldClick} />
      <SlideInput component={<Options {...optionProps} />} setShow={setshowOptions} show={showOptions} theme={DashboardTheme} />
    </View>
  )
}

function Options({ list, field, setValue, currentSelection = "" }) {
  const [checked, setChecked] = useState(currentSelection)
  const theme = DashboardTheme

  const onPress = (selectedNameValue) => {
    return () => {
      setValue(field, selectedNameValue)
      setChecked(selectedNameValue)
    }
  }
  return (
    <ScrollView className="w-full flex-1 gap-4">
      {list.map((item) => {
        const { name: key, value: displayText } = item
        return (
          <TouchableOpacity onPress={onPress(key)} key={key} className="w-full flex-row justify-between items-center p-1">
            <Text className="text-lg" style={{
              fontFamily: theme.font,
              color: theme.textPrimary
            }}>{displayText}</Text>
            <Ionicons name={checked === key ? "radio-button-off-outline" : "radio-button-on-outline"} size={24} />
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  )
}

