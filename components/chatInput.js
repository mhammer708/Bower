import React, { useCallback, useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import Loader from "./loader";
import { connect } from "react-redux";
import { firebaseService } from "../Firebase";

// import Button from "../common/Button";

function Input(props) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = props.user;
  const matchId = props.matchId;

  const handlePress = useCallback(
    function () {
      setIsLoading(true);
      firebaseService
        .createMessage({ message, user, matchId })
        .then(function () {
          setIsLoading(false);
          setMessage("");
        });
    },
    [message]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write you message"
        />
      </View>

      <Button title="Send" onPress={handlePress} disabled={isLoading} />
      {isLoading && <Loader />}
    </View>
  );
}

const stateToProps = (state) => ({
  user: state.user,
});

export default connect(stateToProps)(Input);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  inputContainer: {
    width: "70%",
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
