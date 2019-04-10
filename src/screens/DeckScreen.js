import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { Button, Card } from "react-native-elements";
import Swipe from "../components/Swipe";
import { likedJobs } from "../actions";

class DeckScreen extends Component {
  renderCard(job) {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };
    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === "android"}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>{job.snippet.replace(/<b>/g, "").replace(/<\/b/g, "")}</Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No more jobs">
        <Button
          title="Back to map"
          onPress={() => this.props.navigation.navigate("map")}
          icon={{ name: "my-location" }}
        />
      </Card>
    );
  };
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => this.props.likedJobs(job)}
          keyProp="jobkey"
          navigation={this.props.navigation}
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

const mapDispatchToProps = dispatch => {
  return {
    likedJobs: job => dispatch(likedJobs(job))
  };
};

const mapStateToProps = ({ jobs }) => {
  return {
    jobs: jobs.results
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckScreen);
