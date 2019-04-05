import React from "react";
import { Notifications } from "expo";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./src/store";
import { StyleSheet, Alert } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import registerForNotifications from "./src/services/pushNotifications";
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
          tabBarPosition: "bottom",
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
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const {data: { text },origin} = notification;

      if (origin === "received" && text) {
        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      }
    });
  }
  render() {
    const persistor = persistStore(store);
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Container style={styles.container} />
        </PersistGate>
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
