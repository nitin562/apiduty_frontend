import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from "../dashboard/Dashboard.jsx"

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen name="dashboard" component={Dashboard} options={{ title: 'Dashboard', headerShown: false }} />
      {/* <Stack.Screen name="Add"component={AddScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
}
