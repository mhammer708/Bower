import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import CreateGame from "./screens/CreateGame";
import CreatePlayer from "./screens/CreatePlayer";
import Home from "./screens/Home";
import FindPlayer from "./screens/FindPlayer";
import FindGame from "./screens/FindGame";
import AppNavigation from "./navigation";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { Provider } from "react-redux";
import store from "./redux/store";

const { width, height } = Dimensions.get("window");

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
          <AppNavigation />
        </NavigationContainer>

        <StatusBar style="auto" />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
});
