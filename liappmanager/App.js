/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native';
import {
  createAppContainer,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
 
import Home from './src/component/Home';
import CustomHeader from './src/component/CustomHeader';
import Login from './src/component/Login';
import LicenseInfo from './src/component/lilibrary';
import Settings from './src/component/lisettings';
import {width,height} from 'react-native-dimension';
 
class NavigationDrawerStructure extends Component {
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
            source={require('./src/asset/drawer.png')}
            style={{ width: 30, height: 30, marginLeft: 15, }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const HomeActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      // title: 'Lisec.Core ',
      headerTitle:<View style={{marginLeft:width(7)}}>
        <Text style={{color:"#fff",fontSize:20,fontWeight:"bold"}}>Lisec.Core</Text>
        </View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#a0185c',
      },
      headerRight:<View style={{flexDirection:"row",justifyContent:"center"}}>
        <TouchableOpacity style={{width:width(15),alignItems:"center",justifyContent:"center"}}>
            <Image source={require("./src/asset/newsfeedwhiteicon.png")} style={{width:width(8),height:height(8)}} resizeMode="contain"/>
        </TouchableOpacity>
      </View>,
      headerTintColor: '#fff',
    }),
  },
});

const LoginActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      // title: 'Lisec.Core ',
      headerTitle:<View style={{marginLeft:width(7)}}>
        <Text style={{color:"#fff",fontSize:20,fontWeight:"800"}}>Lisec.Core</Text>
        </View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#a0185c',
      },
      headerRight:<View style={{flexDirection:"row",justifyContent:"center"}}>
        <TouchableOpacity style={{width:width(15),alignItems:"center",justifyContent:"center"}}>
            <Image source={require("./src/asset/newsfeedwhiteicon.png")} style={{width:width(8),height:height(8)}} resizeMode="contain"/>
        </TouchableOpacity>
      </View>,
      headerTintColor: '#fff',
    }),
  },
});

const LicenseActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  License: {
    screen: LicenseInfo,
    navigationOptions: ({ navigation }) => ({
      // title: 'Lisec.Core ',
      headerTitle:<View style={{marginLeft:width(7)}}>
        <Text style={{color:"#fff",fontSize:20,fontWeight:"800"}}>Lisec.Core</Text>
        </View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#a0185c',
      },
      headerRight:<View style={{flexDirection:"row",justifyContent:"center"}}>
        <TouchableOpacity style={{width:width(15),alignItems:"center",justifyContent:"center"}}>
            <Image source={require("./src/asset/newsfeedwhiteicon.png")} style={{width:width(8),height:height(8)}} resizeMode="contain"/>
        </TouchableOpacity>
      </View>,
      headerTintColor: '#fff',
    }),
  },
});

const SettingsActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      // title: 'Lisec.Core ',
      headerTitle:<View style={{marginLeft:width(7)}}>
        <Text style={{color:"#fff",fontSize:20,fontWeight:"800"}}>Lisec.Core</Text>
        </View>,
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#a0185c',
      },
      headerRight:<View style={{flexDirection:"row",justifyContent:"center"}}>
        <TouchableOpacity style={{width:width(15),alignItems:"center",justifyContent:"center"}}>
            <Image source={require("./src/asset/newsfeedwhiteicon.png")} style={{width:width(8),height:height(8)}} resizeMode="contain"/>
        </TouchableOpacity>
      </View>,
      headerTintColor: '#fff',
    }),
  },
});

 
const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Home: {
    //Title
    screen: HomeActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./src/asset/homeicon.png")}
          resizeMode="contain"
          style={{  width: 25, height: 25 }}
        />)
    },
  },
  Settings: {
    //Title
    screen: SettingsActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./src/asset/settingsicon.png")}
          resizeMode="contain"
          style={{  width: 25, height: 25 }}
        />)
    }
  },
      
  License: {
    //Title
    screen: LicenseActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'License Info',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require("./src/asset/lisenceicon.png")}
          resizeMode="contain"
          style={{  width: 25, height: 25 }}
        />)
  }
},
    Login: {
      //Title
      screen: LoginActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Account',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require("./src/asset/accounticon.png")}
            resizeMode="contain"
            style={{  width: 25, height: 25 }}
          />)
      },
    }
  
},{
  contentComponent: CustomHeader,
  drawerWidth: width(65)
}
);
 
export default createAppContainer(DrawerNavigatorExample);