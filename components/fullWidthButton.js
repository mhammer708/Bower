import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

export default function WideButton(props) {
  return (
    <>
      <TouchableHighlight style={styles.fullWidthButton} onPress={props.press}>
        <Text style={styles.fullWidthButtonText}>{props.text}</Text>
      </TouchableHighlight>
    </>
  );
}

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
});
