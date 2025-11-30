import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import { DashboardTheme } from "../theme.js";
import { useNavigation } from "@react-navigation/native";

export default function QuickActions() {
  const theme = DashboardTheme;

 const quickActionsList = [
  {
    id: "newService",
    label: "Add New Service",
    icon: "add-circle-outline",
    color: "#4CAF50",
    stack: "Services",
    screen: "newService",
  },

  {
    id: "viewServices",
    label: "View All Services",
    icon: "list-outline",
    color: "#3E7BFF",
    stack: "Services",
    screen: "AllServices",
  },

  {
    id: "incidentHistory",
    label: "View Incident History",
    icon: "time-outline",
    color: "#EBC958",
    stack: "IncidentsStack",
    screen: "IncidentHistory",
  },

  {
    id: "settings",
    label: "Settings",
    icon: "settings-outline",
    color: "#A3A3B4",
    stack: "SettingsStack",
    screen: "SettingsMain",
  },
];


  return (
    <View className="w-full gap-3">
      <FlatList
        data={quickActionsList}
        renderItem={({ item }) => (
          <Action
            name={item.label}
            color={item.color}
            icon={item.icon}
            theme={theme}
            stack={item.stack}
            screen={item.screen}

          />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}

function Action({ name, color, icon, theme, stack, screen }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full p-3 rounded-lg flex-row justify-between items-center mb-2"
      style={{ backgroundColor: theme.surfaceCard }}
      onPress={()=>{
        navigation.navigate(stack, {screen})
      }}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={22} color={color} />
        <Text
          className="text-base"
          style={{ fontFamily: theme.font, color: theme.textPrimary }}
        >
          {name}
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );
}
