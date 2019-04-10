import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";

class SettingScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ marginTop: 20 }}>
        <Button
          title="Reset liked Jobs!"
          large
          icon={{ name: "delete-forever" }}
          backgroundColor="#F44336"
          onPress={() => navigate("MyModal")}
        />
      </View>
    );
  }
}

export default connect(
  null,
  actions
)(SettingScreen);
