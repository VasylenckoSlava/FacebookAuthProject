import React from "react";
import { Notifications } from "expo";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./src/store";
import { StyleSheet, Easing, Animated } from "react-native";
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
import ModalScreen from "./src/screens/ModalScreen";


const RootStack = createStackNavigator(
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
                settings: { screen: SettingScreen },
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

const MainStackNavigator = createStackNavigator(
    {
        Main: {
            screen: RootStack,
        },
        MyModal: {
            screen: ModalScreen,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
        transparentCard: true,
        transitionConfig: () => ({
            transitionSpec: {
                duration: 750,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const thisSceneIndex = scene.index;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                    outputRange: [height, 0, 0],
                });
                const opacity = position.interpolate({
                    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                    outputRange: [1, 1, 0.5],
                });

                return { opacity,transform: [{ translateY }] };
            },
        })
    }
);

const Container = createAppContainer(MainStackNavigator);

class App extends React.Component {

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
