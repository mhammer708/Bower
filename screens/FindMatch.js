import { getMatches, getPlayers, getGames } from "../Firebase";
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

const FindMatch = (props) => {
  let [matchIds, setMatchIds] = useState([]);
  let [matches, setMatches] = useState([]);
  let [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!props.location.coords) {
      props.navigation.navigate("SettingsTab");
    } else {
      getMatches(props.userType, props.docId)
        .then((res) => {
          setMatchIds(res);
          console.log("usertype", props.userType);
          if (props.userType === "Player") return getGames();
          if (props.userType === "Game") return getPlayers();
        })
        .then((res) => {
          console.log("games", res);
          const newResult = res
            .filter((y) => y.matches.some((x) => x.partnerId === props.docId))
            .map((match, ind) => {
              match.dist = distance(
                props.location.coords.latitude,
                props.location.coords.longitude,
                match.location[0],
                match.location[1]
              );
              console.log("MATCHIDS", matchIds);
              match.matches.forEach((el) => {
                if (el.partnerId === props.docId) {
                  match.matchId = el.matchId;
                }
              });
              return match;
            });
          console.log("MATCHES", newResult);
          setMatches(newResult);
        });
    }
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      getMatches(props.userType, props.docId).then((res) => {
        setMatches(res);
      });
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  const _onSelectMatch = (id) => {
    props.navigation.navigate("Chat", { id: id });
  };

  const _renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.matchId}
      onPress={() => _onSelectMatch(item.matchId)}
    >
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
          {/* <Text style={styles.name} numberOfLines={1} ellipsizeMode={"tail"}>
            {item.name} ({item.skill})
          </Text> */}
          {/* <Text style={styles.bio} numberOfLines={1} ellipsizeMode={"tail"}>
            {item.matchId}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  const _keyExtractor = (item, index) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Matches</Text>
      <StatusBar barStyle="light-content" />
      {matches.length ? (
        <FlatList
          data={matches}
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
  docId: state.docId,
  userType: state.userType,
});

export default connect(stateToProps)(FindMatch);

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
