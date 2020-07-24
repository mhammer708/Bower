import React, { Component, useEffect, useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { getSinglePlayer, firebaseService } from "../Firebase";
import { connect } from "react-redux";
import WideButton from "../components/fullWidthButton";

const SelectPlayer = (props) => {
  let [playerInfo, setPlayerInfo] = useState({});
  let [userIdObj, setUserIdObj] = useState({
    player: props.route.params.id,
    game: props.docId,
  });

  useEffect(() => {
    console.log(props);
    getSinglePlayer(props.route.params.id).then((result) =>
      setPlayerInfo(result)
    );
  }, []);

  const handlePress = () => {
    firebaseService.create(userIdObj).then((res) => {
      console.log("MATCH ID >>", res);
      props.navigation.navigate("MatchesTab", {
        screen: "Chat",
        params: { id: res },
      });
    });
  };

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
            <WideButton
              press={() => props.navigation.navigate("FindPlayer")}
              text="Return"
            />
            <WideButton press={() => handlePress()} text="Invite" />
          </View>
        </View>
      )}
    </View>
  );
};

const stateToProps = (state) => ({
  location: state.location,
  docId: state.docId,
});

export default connect(stateToProps)(SelectPlayer);

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
  title: {
    fontSize: 20,
    textAlign: "center",
    // margin: 10,
  },
});
