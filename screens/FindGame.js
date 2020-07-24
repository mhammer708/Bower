import { getGames } from "../Firebase";
import React, { Component, useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import distance from "../utils/distance";

const FindGame = (props) => {
  let [games, setGames] = useState([]);

  let playersObj = {
    1: [1, 1, 1],
    2: [1, 1],
    3: [1],
  };

  useEffect(() => {
    if (!props.location.coords) {
      props.navigation.navigate("SettingsTab");
    } else {
      console.log("games loading..");
      getGames().then((result) => {
        console.log("getting games");
        const newResult = result.map((game) => {
          game.dist = distance(
            props.location.coords.latitude,
            props.location.coords.longitude,
            game.location[0],
            game.location[1]
          );
          return game;
        });
        setGames(newResult);
      });
    }
  }, []);

  const _onSelectGame = (id) => {
    props.navigation.navigate("SelectGame", { id: id });
  };

  const _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => _onSelectGame(item.id)}>
      <View style={styles.rowContainer}>
        <View style={styles.thumbnail}>
          {console.log(item)}
          <Text style={styles.title} numberOfLines={1}>
            {item.dist[0]}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.dist[1]} away
          </Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.bio} numberOfLines={1} ellipsizeMode={"tail"}>
            {item.bio}
          </Text>
          <View style={styles.dotRow}>
            {item.players.map((player) => {
              return (
                <Avatar
                  rounded
                  overlayContainerStyle={{ backgroundColor: "blue" }}
                  size="medium"
                  title={player[0]}
                />
              );
            })}
            {playersObj[item.players.length] &&
              playersObj[item.players.length].map((el) => {
                return (
                  <Avatar
                    rounded
                    overlayContainerStyle={{ backgroundColor: "grey" }}
                    size="medium"
                  />
                );
              })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _keyExtractor = (item, index) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Games Near You</Text>
      <StatusBar barStyle="light-content" />
      {games.length ? (
        <FlatList
          data={games}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      ) : null}
    </View>
  );
};

const stateToProps = (state) => ({
  location: state.location,
});

export default connect(stateToProps)(FindGame);

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  dotRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "80%",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "grey",
    color: "black",
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    height: 150,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#CCC",
    shadowOpacity: 1.0,
    shadowRadius: 1,
  },
  bio: {
    fontSize: 20,
    color: "grey",
    paddingLeft: 20,
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
  },
  thumbnail: {
    flex: 1,
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: undefined,
    width: undefined,
  },
  rowText: {
    flex: 4,
    flexDirection: "column",
  },
});
