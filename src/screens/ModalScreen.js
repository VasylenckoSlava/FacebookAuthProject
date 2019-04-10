import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import { connect } from "react-redux";
import { clearLikedJobs } from "../actions";

class ModalScreen extends Component {
  clearedLikedJobs = () => {
    this.props.clearLikedJobs();
    this.props.navigation.navigate("map");
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: "skyblue",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 4
          }}
        >
          <Text style={{ fontSize: 25 }}>
            Are you sure you want to reset liked jobs?
          </Text>
          <Button onPress={() => navigate("review")} title="Dismiss" />
          <Button onPress={this.clearedLikedJobs} title="Yes" />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearLikedJobs: () => dispatch(clearLikedJobs())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalScreen);
