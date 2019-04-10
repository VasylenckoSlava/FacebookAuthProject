import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import * as actions from "../actions";


class SettingScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      marginTop: Platform.OS === "android" ? 24 : 0
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ marginTop: 20 }}>
        <Button
          title="Reset liked Jobs!"
          large
          icon={{ name: "delete-forever" }}
          backgroundColor="#F44336"
          onPress={() => navigate('MyModal')}//this.props.clearLikedJobs()}
        />
      </View>
    );
  }
}

export default connect(
  null,
  actions
)(SettingScreen);
