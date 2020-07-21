import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import CreateGame from "../screens/CreateGame";
import CreatePlayer from "../screens/CreatePlayer";
import Home from "../screens/Home";
import FindGame from "../screens/FindGame";
import SelectGame from "../screens/SelectGame";

const Stack = createStackNavigator();

const FindGameStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FindGame"
        component={FindGame}
        options={{ title: "Find Game" }}
      />
      <Stack.Screen
        name="SelectGame"
        component={SelectGame}
        options={{ title: "Select Game", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default FindGameStack;
