import React, { useEffect, useReducer } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";

import Input from "../components/chatInput";
import Message from "../components/chatBubble";

import { unionWith } from "lodash";
import { connect } from "react-redux";
import { firebaseService } from "../Firebase";

function Chat(props) {
  const user = props.user;
  const [messages, dispatchMessages] = useReducer(messagesReducer, []);

  useEffect(
    function () {
      return firebaseService.matchesRef
        .doc(props.route.params.id)
        .collection("Messages")
        .orderBy("created_at", "desc")
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: "add", payload: snapshot.docs });
        });
    },
    [false]
  );

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            return item.id;
          }}
          renderItem={function ({ item }) {
            const data = item.data();
            const side = data.user_id === user ? "right" : "left";

            return <Message side={side} message={data.message} />;
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input matchId={props.route.params.id} />
      </View>
    </View>
  );
}

const stateToProps = (state) => ({
  user: state.user,
});

export default connect(stateToProps)(Chat);

function messagesReducer(state, action) {
  switch (action.type) {
    case "add":
      return unionWith(state, action.payload, function (a, b) {
        return a.id === b.id;
      }).sort(function (a, b) {
        const aData = a.data();
        const bData = b.data();

        return bData.created_at.seconds - aData.created_at.seconds;
      });
    default:
      throw new Error("Action type is not implemented!");
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  messagesContainer: {
    height: "100%",
    paddingBottom: 100,
  },
  inputContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: "grey",
  },
});
