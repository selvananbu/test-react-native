import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

  import {width,height} from 'react-native-dimension';
  import {DrawerNavigatorItems} from 'react-navigation-drawer';
import { ScrollView } from 'react-native-gesture-handler';

export default class CustomHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    
    render() {
        return (
            
      <SafeAreaView style={styles.drawercontainer}>
     <LinearGradient colors={['#a0185c','#660033']} style={styles.drawermenu}>
     <View style={{margin:15}}>
              <Image source={require("../asset/appiconround.png")} style={{height:height(10),width:width(17),borderRadius:height(15)/2}} resizeMode="contain"/>
       
        <Text style={{color:"#fff",fontWeight:"bold"}}>
                Lisec Mobile Apps
            </Text>

        </View>
       
    </LinearGradient>
    <ScrollView style={{width:width(65)}}>
            <DrawerNavigatorItems {...this.props} labelStyle={{color:"#000"}} activeTintColor={"grey"}/>
    </ScrollView>
      </SafeAreaView>
          
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawercontainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawermenu:{
        height:height(20),
        width:width(65),
        backgroundColor: "#a0185c",
        paddingTop:15
    },
    drawericon:{
        height:height(8),
        width:width(8),
        backgroundColor: "#a0185c",
    },
});
