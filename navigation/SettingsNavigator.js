import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import CreateGame from "../screens/CreateGame";
import CreatePlayer from "../screens/CreatePlayer";
import WelcomePrompt from "../screens/WelcomePrompt";

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Home", tabBarVisible: false }}
      />
      <Stack.Screen
        name="Selection"
        component={WelcomePrompt}
        options={{ title: "Selection", tabBarVisible: false }}
      />
      <Stack.Screen
        name="CreateGame"
        component={CreateGame}
        options={{ title: "CreateGame" }}
      />
      <Stack.Screen
        name="CreatePlayer"
        component={CreatePlayer}
        options={{ title: "Create Player", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
