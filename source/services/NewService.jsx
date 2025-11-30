import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Animated, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Ionicons from "@react-native-vector-icons/ionicons"

import { DashboardTheme } from "../theme.js"
import Input1 from "../utilities_jsx/InputFields/Input1.jsx"
import OptionField from "../utilities_jsx/InputFields/OptionField.jsx"
import SubHeading from "../utilities_jsx/SubHeading.jsx"
import { wrapWithLoader } from "../utilities/wrapper.js"
import { handleStep1 } from "../api/service.js"

export default function NewService() {
  const theme = DashboardTheme
  const [step, setStep] = useState(1)
  const [Loading, setLoading] = useState(false)
  const [data, setData] = useState({
    serviceState: "ON",
    serviceStatus: "NORMAL"
  })
  const [errors, setErrors] = useState({})

  const handleSteps = wrapWithLoader(async () => {
    let nextStep = false
    if (step === 1) {
      nextStep = await handleStep1(data, setErrors)
    }

    if (nextStep) {
      setStep((step) => {
        return step + 1
      })
    }
  }, setLoading)
  return (
    <View className="flex-1 p-4" style={{
      backgroundColor: theme.surfaceCard
    }} >
      <View className="gap-5">
        <SubHeading title="Add Service" />
        <ProgessBar step={step} last={2} loading={Loading} />
      </View>
      <View className="w-full flex-1 mt-4">
        {step === 1 && <Step1 data={data} setData={setData} errors={errors} />}
      </View>

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View className="flex-row items-center flex-end">
        {step <= 1 && step != 2 && <TouchableOpacity className="p-2 px-4 rounded-lg bg-blue-700" onPress={handleSteps}>
          <Text className="text-xl text-white" style={{ fontFamily: theme.font }}>
            Next
          </Text>
        </TouchableOpacity>}

        {step === 2 && <TouchableOpacity onPress={handleSteps} className="p-2 px-4 rounded-lg bg-purple-500">
          <Text className="text-xl text-white" style={{ fontFamily: theme.font }}>
            Submit
          </Text>
        </TouchableOpacity>}
      </View>

    </View>
  )
}


function ProgessBar({ step, last.loading }) {
  const theme = DashboardTheme
  const progressValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const progress = (step - 1) / (last - 1);
    Animated.timing(progressValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {Array.from({ length: last }).map((_, index) => {
          const active = step >= index + 1
          const current = step == index + 1
          const completed = step > index + 1
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
                ) : ((current && loading) ? (
                  <ActivityIndicator color={theme.textPrimary} />
                ) : (<Text
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
                ))}
              </View>
            </View>
          )
        })}

      </View>

    </View>
  )
}

function Step1({ data, setData, errors }) {
  const theme = DashboardTheme
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
  const changeValue = (field, value) => {
    setData((prev) => {
      const copy = { ...prev }
      copy[field] = value
      return copy
    })
  }
  return (
    <View className="flex-1 w-full gap-4">
      <Text className="w-full text-[#b194f5] text-md" style={{
        fontFamily: theme.font
      }}>Add Details</Text>
      <Input1 field="serviceName" name="Name" value={data?.serviceName || ""}
        placeholder="Enter Service Name" setValue={changeValue} errors={errors}
      />
      <Input1 field="serviceDescription" name="Description" value={data?.serviceDescription || ""}
        placeholder="Enter Service Description" setValue={changeValue} errors={errors}
      />
      <OptionField name="Status" field="serviceStatus" value={data.serviceStatus} setValue={changeValue} list={STATUS_MAP} />
      <OptionField name="State" field="serviceState" value={data.serviceState} setValue={changeValue} list={STATE_MAP} />
      {/* {showOptions&&<SlideInput component={<Options {...optionProps} />} setShow={setshowOptions} show={showOptions} theme={DashboardTheme} />} */}
    </View>
  )
}

