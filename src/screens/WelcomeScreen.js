import React, { Component } from "react";
import { View, Text } from "react-native";
import Slides from "../components/Slides";

const SLIDE_DATA = [
  { text: "Welcome to JobApp", color: "#03A9Fa" },
  { text: "Use this to get a job", color: "#009688" },
  { text: "Set your location,then swipe away", color: "#03A9F4" }
];
class WelcomeScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
  };
  onSlidesComplete = () => {
    this.props.navigation.navigate("auth");
  };
  render() {
    console.log("this.props", this.props);
    return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
  }
}

export default WelcomeScreen;
