import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import AuthScreen from "../screens/AuthScreen";
import MapScreen from "../screens/MapScreen";
import DeckScreen from "../screens/DeckScreen";
import ReviewScreen from "../screens/ReviewScreen";
import SettingScreen from "../screens/SettingScreen";
import { Icon } from "react-native-elements";
import { Animated, Button, Easing, Platform, Text } from "react-native";
import ModalScreen from "../screens/ModalScreen";
import Drawer from "../screens/Drawer";

const DrawerStack = createDrawerNavigator({
  screen1: {
    screen: MapScreen,
    navigationOptions: {
      drawerLabel: "MapScreen"
    }
  },
  screen2: { screen: DeckScreen },
  screen3: { screen: SettingScreen }
});

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#4C3E54" },
      title: "Welcome!",
      headerTintColor: "white",
      headerLeft: (
        <Text onPress={() => navigation.navigate("DrawerOpen")}>Menu</Text>
      )
    })
  }
);
const PrimaryNav = createStackNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen }
});

const RootStack = createStackNavigator(
  {
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
                navigationOptions: {
                  title: "Review Jobs",
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="favorite" size={30} color={tintColor} />
                  )
                }
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

WelcomeScreen.navigationOptions = {
  tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
};

MapScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Map",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="my-location" size={30} color={tintColor} />
    ),
    headerLeft: <Drawer navigationProps={navigation} />,
    headerStyle: {
      backgroundColor: "#FF9800"
    },
    headerTintColor: "#fff"
  };
};

DeckScreen.navigationOptions = {
  title: "Deck",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="description" size={30} color={tintColor} />
  )
};

ReviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <Button
        title="Settings"
        onPress={() => navigation.navigate("settings")}
        backgroundColor="rgba(0,0,0,0)"
        color="rgba(0, 122,255,1)"
      />
    ),

    style: {
      marginTop: Platform.OS === "android" ? 24 : 0
    }
  };
};

SettingScreen.navigationOptions = {
  headerStyle: {
    marginTop: Platform.OS === "android" ? 24 : 0
  }
};

const MainStackNavigator = createStackNavigator(
  {
    Login: {
      screen: PrimaryNav
    },
    Main: {
      screen: RootStack
    },
    MyModal: {
      screen: ModalScreen
    },
    drawerStack: { screen: DrawerNavigation }
  },
  {
    mode: "modal",
    headerMode: "none",
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const thisSceneIndex = scene.index;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0]
        });
        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [1, 1, 0.5]
        });

        return { opacity, transform: [{ translateY }] };
      }
    })
  }
);
export const AppNavigation = createAppContainer(MainStackNavigator);

// const mapStateToProps = state => ({
//   nav: state.nav
// });

// export default AppNavigation;
//export default AppNavigation;
