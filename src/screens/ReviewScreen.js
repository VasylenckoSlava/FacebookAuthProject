import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  ScrollView,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
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
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0
      }
    };
  };

  renderLikedJobs() {
    if (this.props.likedJobs) {
      return this.props.likedJobs.map(job => {
        const { company, formattedRelativeTime, url } = job;
        return (
          <Card>
            <View style={{ height: 200 }}>
              <View style={styles.detailWrapper}>
                <Text style={styles.italics}>{company}</Text>
                <Text style={styles.italics}>{formattedRelativeTime}</Text>
              </View>
              <Button
                title="Apply now!"
                backgroundColor="#03A9F4"
                onPress={() => Linking.openURL(url)}
              />
            </View>
          </Card>
        );
      });
    }
  }

  render() {
    console.log("this.props.likedJobs", this.props);
    return (<ScrollView>{this.renderLikedJobs()}</ScrollView>);
  }
}

const styles = {
  detailWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  italics: {
    fontStyle: "italic"
  }
};

const mapStateToProps = state => {
  return {
    likedJobs: state.likedJobs
  };
};

export default connect(mapStateToProps)(ReviewScreen);
