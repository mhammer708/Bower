import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from "react-native";
import WelcomePrompt from "./WelcomePrompt";
import * as Location from "expo-location";
import { setLocation, setUser } from "../redux/store";
import { connect } from "react-redux";
import { firebaseService } from "../Firebase";
import Loader from "../components/loader";

const Home = (props) => {
  const [locationObj, setLocationObj] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userObj, setUserObj] = useState(null);

  useEffect(
    function () {
      firebaseService.signIn().then(({ userObj, error }) => {
        if (error) {
          Alert.alert("Something went wrong");
          return;
        }
        setUserObj(userObj);
        props.setUser(userObj.uid);
        console.log(userObj.uid);
      });
    },
    [false]
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      console.log("getting location..");
      let locationObj = await Location.getCurrentPositionAsync({});
      setLocationObj(locationObj);
    })();
  });

  // useEffect(() => {
  //   setLocation(locationObj);
  // }, [locationObj]);

  let text = "Waiting..";

  if (errorMsg) {
    console.log(errorMsg);
    text = errorMsg;
  } else if (locationObj) {
    text = JSON.stringify(locationObj);
    console.log(locationObj);
    props.setLocation(locationObj);
  }

  return (
    <>
      {locationObj && userObj ? (
        <WelcomePrompt navigation={props.navigation} />
      ) : (
        <Loader />
      )}
    </>
  );
};

const dispatchToProps = (dispatch) => ({
  setLocation: (location) => dispatch(setLocation(location)),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, dispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
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
