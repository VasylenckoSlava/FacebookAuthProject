import React from "react";
import { Provider } from "react-redux";
import store from "./store";

import { StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import MapScreen from "./screens/MapScreen";
import DeckScreen from "./screens/DeckScreen";
import ReviewScreen from "./screens/ReviewScreen";
import SettingScreen from "./screens/SettingScreen";

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingScreen }
        })
      }
    })
  }
});
const Container = createAppContainer(MainNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container style={styles.container} />
      </Provider>
    );
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
