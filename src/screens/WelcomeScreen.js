import React, { Component } from "react";
import _ from "lodash";
import { AppLoading } from "expo";
import { View, Text, AsyncStorage } from "react-native";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", color: "#03A9Fa" },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location,then swipe away", color: "#03A9F4" }
];
class WelcomeScreen extends Component {
  state = { token: null };

  async componentWillMount() {
    let token = await AsyncStorage.getItem("fb_token");
    switch (token) {
      case token:
        this.props.navigation.navigate("map");
        this.setState({ token });
        break;
      case !token:
        this.setState({ token: false });
        break;
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
