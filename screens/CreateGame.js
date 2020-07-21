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

export class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [""],
      bio: "",
      skill: "",
      submitted: false,
      playerCount: [1],
      location: [0, 0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(group, input) {
    if (group === "bio") this.setState({ bio: input });
    if (group === "skill") this.setState({ skill: input });
    if (typeof group === "number") {
      const val = this.state.players;
      val[group - 1] = input;
      this.setState({ players: val });
    }
  }

  handleSubmit() {
    console.log(this.props);
    this.setState(
      {
        submitted: true,
        location: [
          this.props.location.coords.latitude,
          this.props.location.coords.longitude,
        ],
      },
      () => {
        editDoc("Game", this.props.docId, this.state);
      }
    );
    this.props.navigation.navigate("FindPlayerTab");
  }

  handleReturn() {
    deleteDoc("Game", this.props.docId).then(() => {
      this.props.setUserType("");
      this.props.setDocId("");
    });
    this.props.navigation.navigate("Home");
  }

  handleAdd() {
    const count = this.state.playerCount.concat(
      this.state.playerCount[this.state.playerCount.length - 1] + 1
    );
    const playersVal = this.state.players.concat([""]);
    this.setState({
      playerCount: count,
      players: playersVal,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.submitted ? "Edit Game Info" : "Submit Game Info"}
        </Text>

        <View style={styles.textContainer}>
          {this.state.playerCount.map((el) => {
            return (
              <Input
                key={el}
                onChangeText={(text) => this.handleChange(el, text)}
                label={"Player " + el}
              />
            );
          })}
          <Button
            onPress={this.handleAdd}
            disabled={this.state.playerCount.length === 3}
            title="Add Player"
          />
          <Input
            onChangeText={(text) => this.handleChange("bio", text)}
            label="Bio"
          />
          <RNPickerSelect
            onValueChange={(text) => this.handleChange("skill", text)}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Desired Skill Level...", value: "" }}
            items={[
              { label: "Novice - Needs to be taught", value: "Novice" },
              {
                label: "Intermediate - Understands the rules",
                value: "Intermediate",
              },
              { label: "Advanced - Competitive", value: "Advanced" },
              { label: "Doesn't Matter!", value: "N/A" },
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
              this.state.players && this.state.bio && this.state.skill
                ? styles.fullWidthButton
                : styles.fullWidthButtonDisabled
            }
            onPress={() => this.handleSubmit()}
            disabled={
              !this.state.players && !this.state.bio && !this.state.skill
            }
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

export default connect(stateToProps, dispatchToProps)(CreateGame);

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
