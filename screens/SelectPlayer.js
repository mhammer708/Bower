import React, { Component, useEffect, useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { getSinglePlayer } from "../Firebase";

const SelectPlayer = (props) => {
  let [playerInfo, setPlayerInfo] = useState({});

  useEffect(() => {
    console.log(props);
    getSinglePlayer(props.route.params.id).then((result) =>
      setPlayerInfo(result)
    );
  }, []);

  return (
    <View style={styles.container}>
      {playerInfo && (
        <View style={styles.playerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>
              {playerInfo.name}, {playerInfo.skill}
            </Text>
            <Text style={styles.subtitle}>{playerInfo.bio}</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: playerInfo.img }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => props.navigation.navigate("FindPlayer")}
            >
              <Text style={styles.fullWidthButtonText}>Return</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => console.log(props.route.params.id)}
            >
              <Text style={styles.fullWidthButtonText}>Invite</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => props.navigation.navigate("Chat")}
            >
              <Text style={styles.fullWidthButtonText}>Chat</Text>
            </TouchableHighlight>

            {/* <Button
              style={styles.button}
              onPress={() => props.navigation.navigate("FindPlayer")}
              title="Return"
            />
            <Button
              style={styles.button}
              onPress={() => console.log(props.route.params.id)}
              title="Invite"
            /> */}
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectPlayer;

const styles = StyleSheet.create({
  fullWidthButton: {
    backgroundColor: "blue",
    height: 50,
    marginTop: 10,
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: "white",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#777",
  },
  imageContainer: {
    flex: 5,
    height: 500,
    width: 500,
    padding: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  playerContainer: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    height: "80%",
    padding: 10,
    // width: "90%",
    // marginRight: 10,
    // marginLeft: 10,
    // marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#CCC",
    shadowOpacity: 1.0,
    shadowRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    fontSize: 25,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    // margin: 10,
  },
});
