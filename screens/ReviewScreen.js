import React, { Component } from "react";
import { View, Text, Button, Platform } from "react-native";
// import { Button } from "react-native";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log("navigation", navigation);
    return {
      title: "Review Jobs",
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate("settings")}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0, 122,255,1)"
        />
      ),
    //   headerStyle: {
    //     marginTop: Platform.OS === "android" ? 24 : 0
    //   }
    };
  };
  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;
