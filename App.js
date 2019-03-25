import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen }
});
const Container = createAppContainer(MainNavigator);


class App extends React.Component {
  render() {
    return <Container style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
