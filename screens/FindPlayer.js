import { getPlayers } from "../Firebase";
import React, { Component, useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import distance from "../utils/distance";
import { connect } from "react-redux";

const FindPlayer = (props) => {
  let [players, setPlayers] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!props.location.coords) {
      props.navigation.navigate("SettingsTab");
    } else {
      getPlayers().then((result) => {
        const newResult = result.map((player) => {
          player.dist = distance(
            props.location.coords.latitude,
            props.location.coords.longitude,
            player.location[0],
            player.location[1]
          );
          return player;
        });
        setPlayers(newResult);
      });
    }
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      getPlayers().then((result) => {
        setPlayers(result);
      });
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const _onSelectPlayer = (id) => {
    props.navigation.navigate("SelectPlayer", { id: id });
  };

  const _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => _onSelectPlayer(item.id)}>
      <View style={styles.rowContainer}>
        <View style={styles.thumbnail}>
          <Text style={styles.title} numberOfLines={1}>
            {item.dist[0]}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.dist[1]} away
          </Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode={"tail"}>
            {item.name} ({item.skill})
          </Text>
          <Text style={styles.bio} numberOfLines={1} ellipsizeMode={"tail"}>
            {item.bio}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const _keyExtractor = (item, index) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Players Near You</Text>
      <StatusBar barStyle="light-content" />
      {players.length ? (
        <FlatList
          data={players}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : null}
    </View>
  );
};

const stateToProps = (state) => ({
  location: state.location,
});

export default connect(stateToProps)(FindPlayer);

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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 20,
    color: "white",
  },
  name: {
    fontSize: 25,
    color: "grey",
    fontWeight: "bold",
    paddingLeft: 20,
  },
  bio: {
    fontSize: 20,
    color: "grey",
    paddingLeft: 20,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
