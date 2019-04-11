import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Button, Icon} from "react-native-elements";

class Drawer extends Component {
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    <Icon name="my-location" />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Drawer;
