import React, { Component, useEffect, useState } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import { getSingleGame, firebaseService } from "../Firebase";
import { Avatar } from "react-native-elements";
import { connect } from "react-redux";

const SelectGame = (props) => {
  let [gameInfo, setGameInfo] = useState({});
  let [userIdObj, setUserIdObj] = useState({
    player: props.docId,
    game: props.route.params.id,
  });
  let playersObj = {
    1: [1, 1, 1],
    2: [1, 1],
    3: [1],
  };

  useEffect(() => {
    console.log(props);
    getSingleGame(props.route.params.id).then((result) => {
      setGameInfo(result);
      console.log(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      {gameInfo.players && (
        <View style={styles.playerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>{gameInfo.bio}</Text>
            <Text style={styles.subtitle}>
              Looking for {gameInfo.skill}
              {gameInfo.players.length < 3 ? " players" : " player"}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            {gameInfo.players.map((player) => {
              return (
                <Avatar
                  rounded
                  overlayContainerStyle={{
                    backgroundColor: "blue",
                  }}
                  size="xlarge"
                  title={player[0]}
                />
              );
            })}
            {playersObj[gameInfo.players.length] &&
              playersObj[gameInfo.players.length].map((el) => {
                return (
                  <Avatar
                    rounded
                    overlayContainerStyle={{
                      backgroundColor: "grey",
                    }}
                    size="xlarge"
                  />
                );
              })}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => props.navigation.navigate("FindGame")}
            >
              <Text style={styles.fullWidthButtonText}>Return</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.fullWidthButton}
              onPress={() => firebaseService.create(userIdObj)}
            >
              <Text style={styles.fullWidthButtonText}>Invite</Text>
            </TouchableHighlight>
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

export default connect(stateToProps)(SelectGame);

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
    // flex: 5,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: 500,
    width: 500,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
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
