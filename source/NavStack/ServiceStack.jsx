import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewService from "../services/NewService.jsx"

const Stack = createNativeStackNavigator();

export default function ServiceStack() {
  return (
    <Stack.Navigator initialRouteName="newService">
      <Stack.Screen name="newService" component={NewService} options={{ title: 'NewService', headerShown: false }} />
      {/* <Stack.Screen name="Add"component={AddScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
}
