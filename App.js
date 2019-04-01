import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

import { StyleSheet, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AuthScreen from "./src/screens/AuthScreen";
import MapScreen from "./src/screens/MapScreen";
import DeckScreen from "./src/screens/DeckScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SettingScreen from "./src/screens/SettingScreen";


const  MainStackNavigator = createStackNavigator({
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
}, {
  headerMode: 'none'
});

const Container = createAppContainer(MainStackNavigator);

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
