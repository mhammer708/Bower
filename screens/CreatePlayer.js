import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { Input } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import { setUserType, setDocId } from "../redux/store";
import { editDoc, deleteDoc } from "../Firebase";
import { connect } from "react-redux";

export class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      skill: "",
      submitted: false,
      location: [0, 0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  handleChange(group, input) {
    if (group === "bio") this.setState({ bio: input });
    if (group === "name") this.setState({ name: input });
    if (group === "skill") this.setState({ skill: input });
  }

  handleSubmit() {
    this.setState(
      {
        submitted: true,
        location: [
          this.props.location.coords.latitude,
          this.props.location.coords.longitude,
        ],
      },
      () => {
        editDoc("Player", this.props.docId, this.state);
      }
    );

    this.props.navigation.navigate("FindGameTab");
  }

  handleReturn() {
    deleteDoc("Player", this.props.docId).then(() => {
      this.props.setUserType("");
      this.props.setDocId("");
    });
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.submitted ? "Edit Player Info" : "Submit Player Info"}
        </Text>

        <View style={styles.textContainer}>
          <Input
            onChangeText={(text) => this.handleChange("name", text)}
            label="Name"
          />
          <Input
            onChangeText={(text) => this.handleChange("bio", text)}
            label="Bio"
          />
          <RNPickerSelect
            onValueChange={(text) => this.handleChange("skill", text)}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Skill Level...", value: "" }}
            items={[
              { label: "Novice - Needs to be taught", value: "Novice" },
              {
                label: "Intermediate - Understands the rules",
                value: "Intermediate",
              },
              { label: "Advanced - Competitive", value: "Advanced" },
            ]}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.fullWidthButton}
            onPress={() => this.handleReturn()}
          >
            <Text style={styles.fullWidthButtonText}>Return</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={
              this.state.name && this.state.bio && this.state.skill
                ? styles.fullWidthButton
                : styles.fullWidthButtonDisabled
            }
            onPress={() => this.handleSubmit()}
            disabled={!this.state.name && !this.state.bio && !this.state.skill}
          >
            <Text style={styles.fullWidthButtonText}>
              {this.state.submitted ? "Update" : "Create"}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const stateToProps = (state) => ({
  docId: state.docId,
  location: state.location,
});

const dispatchToProps = (dispatch) => ({
  setUserType: (userType) => dispatch(setUserType(userType)),
  setDocId: (docId) => dispatch(setDocId(docId)),
});

export default connect(stateToProps, dispatchToProps)(CreatePlayer);

const styles = StyleSheet.create({
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
  },
  select: {
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    minHeight: 40,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    // width: "100%",
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
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#F5FCFF",
    paddingTop: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    // margin: 10,
  },
  fullWidthButton: {
    backgroundColor: "blue",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButtonDisabled: {
    backgroundColor: "grey",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "grey",
    backgroundColor: "rgb(245, 252, 255)",
    borderRadius: 8,
    color: "#86939E",
    fontWeight: "bold",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
