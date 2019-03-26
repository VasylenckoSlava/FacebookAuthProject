import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete = token => {
    const { navigation } = this.props;
    if (token) {
      navigation.navigate("map");
    }
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = auth => {
  return {
    token: auth.token
  };
};

export default connect(
  mapStateToProps,
  actions
)(AuthScreen);
