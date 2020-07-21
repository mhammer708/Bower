// import React, { Component } from "react";
// import { Dimensions, Platform } from "react-native";
// import { StackNavigator, TabNavigator } from "react-navigation";
// import { Icon } from "react-native-elements";

// import CreateGame from "./screens/CreateGame";
// import CreatePlayer from "./screens/CreatePlayer";
// import Home from "./screens/Home";
// import FindPlayer from "./screens/FindPlayer";
// import FindGame from "./screens/FindGame";

// let screen = Dimensions.get("window");

// const Tabs = TabNavigator({
//   Home: {
//     screen: Home,
//     navigationOptions: {
//       tabBarLabel: "Home",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="home-outline" type="ionicon" size={28} color={tintColor} />
//       ),
//     },
//   },
//   "Find Player": {
//     screen: FindPlayer,
//     navigationOptions: {
//       tabBarLabel: "Players",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon
//           name="person-add-outline"
//           type="ionicon"
//           size={28}
//           color={tintColor}
//         />
//       ),
//     },
//   },
//   "Find Game": {
//     screen: FindGame,
//     navigationOptions: {
//       tabBarLabel: "Games",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon
//           name="people-outline"
//           type="ionicon"
//           size={28}
//           color={tintColor}
//         />
//       ),
//     },
//   },
// });

// export default Tabs;

// export const createRootNavigator = () => {
//   return StackNavigator({
//     Tabs: {
//       screen: Tabs,
//       navigationOptions: {
//         gesturesEnabled: false,
//       },
//     },
//   });
// };
