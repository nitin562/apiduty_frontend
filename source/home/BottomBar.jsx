import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";

// Import screens
import DashboardStack from "../NavStack/DashboardStack.jsx"
import ServiceStack from "../NavStack/ServiceStack.jsx"
// import Incidents from "../screens/Incidents";
// import Services from "../screens/Services";
// import Teams from "../screens/Teams";
// import Settings from "../screens/Settings";
import { DashboardTheme } from "../theme.js";

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  const theme = DashboardTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Incidents") iconName = focused ? "alert-circle" : "alert-circle-outline";
          else if (route.name === "Services") iconName = focused ? "layers" : "layers-outline";
          else if (route.name === "Settings") iconName = focused ? "settings" : "settings-outline";
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: theme.accentPrimaryStart,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surfaceCard,
          borderTopColor: theme.surfaceSecondary,
          height: 60,
          paddingBottom: 6,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Incidents" component={DashboardStack} />
      <Tab.Screen name="Services" component={ServiceStack} />
      <Tab.Screen name="Settings" component={DashboardStack} />
    </Tab.Navigator>
  );
}
