import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import CreateGame from "../screens/CreateGame";
import CreatePlayer from "../screens/CreatePlayer";
import Home from "../screens/Home";
import FindPlayer from "../screens/FindPlayer";
import FindGame from "../screens/FindGame";
import SelectPlayer from "../screens/SelectPlayer";
import Chat from "../screens/Chat";

const Stack = createStackNavigator();

const FindPlayerStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="FindPlayer"
        component={FindPlayer}
        options={{ title: "Find Player" }}
      />
      <Stack.Screen
        name="SelectPlayer"
        component={SelectPlayer}
        options={{ title: "Select Player", tabBarVisible: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: "Chat", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
};

export default FindPlayerStack;
