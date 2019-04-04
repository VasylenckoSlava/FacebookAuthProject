import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";

import { Button, Platform, StyleSheet, View } from "react-native";
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
import { Icon } from "react-native-elements";

const MainStackNavigator = createStackNavigator(
  {
    welcome: { screen: WelcomeScreen },
    auth: { screen: AuthScreen },
    main: {
      screen: createBottomTabNavigator(
        {
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: createStackNavigator(
              {
                review: { screen: ReviewScreen },
                settings: { screen: SettingScreen }
              },
              {
                navigationOptions: ({ navigation }) => ({
                  title: "Review Jobs",
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="favorite" size={30} color={tintColor} />
                  )
                })
              }
            )
          }
        },
        {
          tabBarPosition:'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        }
      )
    }
  },
  {
    headerMode: "none"
  }
);

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
