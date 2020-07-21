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
import FindPlayerStack from "./PlayerNavigator";
import FindGameStack from "./GameNavigator";
import SettingsStack from "./SettingsNavigator";
import FindMatchStack from "./MatchNavigator";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "HomeTab";

export default function BottomTabNavigator({ navigation, route }) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      defaultNavigationOptions={{ tabBarVisible: false }}
    >
      <BottomTab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="md-home"
              size={23}
              style={{ marginBottom: -3 }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="FindPlayerTab"
        component={FindPlayerStack}
        options={{
          title: "Find Player",
          tabBarLabel: "Players",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="md-person"
              size={23}
              style={{ marginBottom: -3 }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="FindGameTab"
        component={FindGameStack}
        options={{
          title: "Find Game",
          tabBarLabel: "Games",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="md-people"
              size={23}
              style={{ marginBottom: -3 }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MatchesTab"
        component={FindMatchStack}
        options={{
          title: "Find Match",
          tabBarLabel: "Matches",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="md-people"
              size={23}
              style={{ marginBottom: -3 }}
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// function getHeaderTitle(route) {
//   console.log("ROUTE", route);
//   if (route) {
//     console.log("ROUTE STATE", route.state);
//   }
//   // Access the tab navigator's state using `route.state`
//   const routeName =
//     route && route.state
//       ? // Get the currently active route name in the tab navigator
//         route.state.routes[route.state.index].name
//       : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
//         // In our case, it's "Feed" as that's the first screen inside the navigator
//         INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case "Home":
//       return "HOME";
//     case "FindPlayer":
//       return "FINDPLAYER";
//     case "FindGame":
//       return "FINDGAME";
//   }
// }
