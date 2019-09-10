import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    StatusBar,
    ActivityIndicator,
    Platform,
    NativeModules
} from 'react-native';

import {width,height} from 'react-native-dimension';
import * as LocalSettings from '../lib/localsettings';

import {AuthUtil,ensureAccessTokenIsValid} from '../lilayoutauthentication/authutil';
import OpenApiClient_search from '../openapi/openapiclient_search';
import * as commonFunction from '../lib/responseFunction';
import LiMultiTerm from '../lib/limultiterm';
const muobj = new LiMultiTerm("", "");
import { WebView } from 'react-native-webview';

var WEBVIEW_REF = 'webview';
export default class Home extends Component {

    // static navigationOptions = {
    //         drawerLabel: 'Home1111111',
    //         drawerIcon: ({ tintColor }) => (
    //           <Image
    //             source={require("../asset/homeicon.png")}
    //             style={{  width: 50, height: 50 }}
    //           />)
    //   };

    constructor(props) {
        super(props);
        this.state = {
            isLogging: true,
            url: 'https://business-portal.lisec.com/newsfeed/newsfeedlistallview.php',
            backButtonEnabled:false
        }
    }
    
   checkForLogin = async () => {
    let baseurl = LocalSettings.getStorageItem("config.baseurl");
    let loggedIn = LocalSettings.getStorageItem("config.loggedin");

    console.log('====================================');
    console.log("!!!!!!!!!!!!!!!",baseurl,loggedIn);
    console.log('====================================');
    
    if (baseurl === undefined || baseurl === []) {
        // this.props.navigation.setParams({ isBaseURLAvailable: false });
        this.props.navigation.push("Login")
        // Actions.Login({
        //     isBaseURLAvailable: false
        // });
    } else if (loggedIn === false || loggedIn === undefined) {
        this.props.navigation.navigate("Login")
        // Actions.Login();
    } else
        ensureAccessTokenIsValid(this.callBackLoginCheck.bind(this));
}
 componentDidMount() {
     LocalSettings.initializeLocalSettings(this.callBackAfterStorageInit.bind(this));
     console.log('======Navigateeeeeeeeeeeee==================');
     console.log(this.props.navigation);
     console.log('====================================');
     this.focusListener = this.props.navigation.addListener("didFocus", () => {

        let loggedIn = LocalSettings.getStorageItem("config.loggedin");
        if(loggedIn){
            this.setState({isLogging:false})
        }
     })
 
 }
 callBackForAttributes(responseData){
 var jsonData = commonFunction.convertToUint(responseData.state.response.data);
 LocalSettings.setStorageItem("FAV_ATTRLIST",jsonData);
 if(Platform.OS === "android"){
        
//  MenuConnector.writeKeyValueItem("FAV_ATTRLIST", JSON.stringify(jsonData));
 }
 else{
    
 NativeModules.TestBridge.writeKeyValueItem("FAV_ATTRLIST", JSON.stringify(jsonData));
 }
}
 callBackAfterStorageInit() {
   
     var siteNameGlobal = LocalSettings.getStorageItem("config.sitename")
     if (LocalSettings.getStorageItem("FAV_ATTRLIST") === undefined){
         OpenApiClient_search.getClient(siteNameGlobal).GET_attributes(this.callBackForAttributes.bind(this));
    }
     this.checkForLogin();

 }
   componentWillUnmount() {
       muobj.setupText();
       this.didFocusSubscription.remove();
   }
   componentDidUpdate() {
       muobj.setupText();
   }

 callBackLoginCheck(accessToken) {
     this.setState({
         isLogging: false
     })
     var count = LocalSettings.getStorageItem('newsfeed.newcount');
     if (count !== undefined) {
         LocalSettings.removeStorageItem('newsfeed.newcount');
     }
     BackHandler.addEventListener('hardwareBackPress', this.backHandler);
   muobj.setupText();


 }
componentWillUnmount(){
     BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
     this.focusListener.remove();
}
 backHandler = () => {
     if (this.state.backButtonEnabled) {
         this.refs[WEBVIEW_REF].goBack();
         return true;
     }
 }

onNavigationStateChange = (navState) => {
    this.setState({
        backButtonEnabled: navState.canGoBack,
    });
};

render() {
    return (
        
<View style={{flex:1,height:height(75),width:width(100),flexDirection: 'column'}} testID="newsfeedscreen">
<StatusBar backgroundColor="#660033" barStyle="light-content" />
    {this.state.isLogging === true
    ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                height: height(30), width: width(50), paddingVertical: height(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.7)',
                }}>
                <ActivityIndicator />
                <Text>Logging in...</Text>
                </View>
        </View> 
    :
    <View style={styles.container}>
    <WebView
      source={{uri:this.state.url}}
      style={styles.webview}
    />
  </View>
    }
    </View>
    );
}
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
      },
    //   container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    
    //   },
      webview: {
        maxHeight: height(99),
        width: width(99),
        flex: 1
      }
});
