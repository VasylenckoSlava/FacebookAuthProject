import React, { Component } from "react";
import { View, Text, Platform, ActivityIndicator } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, Icon } from "react-native-elements";
import { fetchJobs } from "../actions";

class MapScreen extends Component {
  static navigationOptions = {

  };

  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    mapLoaded: false
  };

  componentDidMount() {
    this.setState({
      mapLoaded: true
    });
  }

  onRegionChangeComplete = region => {
    this.setState({
      region
    });
  };

  onButtonPress = () => {
    this.props.getJobs(this.state.region, () => {
      this.props.navigation.navigate("deck", {});
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: "search" }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getJobs: (region, callback) => dispatch(fetchJobs(region, callback))
  };
};

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0
  }
};
export default connect(
  null,
  mapDispatchToProps
)(MapScreen);
