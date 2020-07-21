import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { setUserType, setDocId } from "../redux/store";
import { connect } from "react-redux";
import { createDoc } from "../Firebase";

const WelcomePrompt = (props) => {
  useEffect(() => {}, []);

  const buttonPressed = (type) => {
    createDoc(type).then((result) => props.setDocId(result));
    props.setUserType(type);
    props.navigation.navigate("Create" + type);
  };

  return (
    <View style={styles.inputsContainer}>
      <TouchableHighlight
        style={styles.fullWidthButton}
        onPress={() => buttonPressed("Game")}
      >
        <Text style={styles.fullWidthButtonText}>Create Game</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.fullWidthButton}
        onPress={() => buttonPressed("Player")}
      >
        <Text style={styles.fullWidthButtonText}>Join Game</Text>
      </TouchableHighlight>
    </View>
  );
};

const stateToProps = (state) => ({
  userType: state.userType,
  docId: state.docId,
});

const dispatchToProps = (dispatch) => ({
  setUserType: (userType) => dispatch(setUserType(userType)),
  setDocId: (docId) => dispatch(setDocId(docId)),
});

export default connect(stateToProps, dispatchToProps)(WelcomePrompt);

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
  },
  fullWidthButton: {
    backgroundColor: "blue",
    height: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: "white",
  },
});
