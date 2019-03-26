import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import * as actionsTypes from "../actions";

// 1509093279223886
class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    AsyncStorage.removeItem('fb_token');
  }
  render() {
      console.log(this.props, 'AuthScreen');
    return (
      <View>
        <Text>AuthScrenn</Text>
      </View>
    );
  }
}

export default connect(
  null,
  actionsTypes
)(AuthScreen);
