import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native';

export default class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
      //Props to open/close the drawer
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image
              source={require('../asset/drawer.png')}
              style={{ width: 30, height: 30, marginLeft: 15, }}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }