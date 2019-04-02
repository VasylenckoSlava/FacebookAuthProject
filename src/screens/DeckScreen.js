import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Button, Card } from "react-native-elements";
import Swipe from "../components/Swipe";
import * as actions from "../actions";

class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.title}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={PlatformOS === "android"}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.created_at}</Text>
        </View>
        <Text>{job.description}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button title="Back to map" onPress={() => {}} />
      </Card>
    );
  };
  render() {
    console.log("DeckScreen", this.props);
    return (
      <View>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  return {
    jobs: jobs.results
  };
};

export default connect(mapStateToProps, actions)(DeckScreen);
