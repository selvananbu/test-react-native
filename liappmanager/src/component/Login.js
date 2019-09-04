import React, { Component } from 'react';
import {  View,NativeModules ,TouchableOpacity,TextInput,Picker,StyleSheet,Image,Text,Keyboard,ActivityIndicator, Platform, PickerIOS } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { width, height } from 'react-native-dimension';
import * as LocalSettings from '../lib/localsettings';
import * as commonFunction from '../lib/responseFunction';
import { sha3_512 } from 'js-sha3';
import {decode as atob, encode as btoa} from 'base-64'
import axios from 'axios';
import LiMultiTerm from '../lib/limultiterm';
const muobj = new LiMultiTerm("", "");

import OpenApiClient_auth from '../openapi/openapiclient_auth';
import OpenApiClient_usr_mgmt from '../openapi/openapiclient_user_management';
import {getSiteName,decodeToken} from '../lilayoutauthentication/authutil';
// import * as MenuConnector from '../nativeconnector/menuconnector'

let siteNameGlobal = null;

var sessionId;
export default class Login extends Component {

    constructor(props){
        super(props);
       
        // console.log("###########3", LocalSettings.getStorageItem("config.loggedin"), LocalSettings.getStorageItem("config.selectedSiteID"));
        
        this.state = {
                        username: 'lisec',
                        password: 'lisec',
                        selectedSite: LocalSettings.getStorageItem("config.selectedSiteID") === undefined ? 0 : LocalSettings.getStorageItem("config.selectedSiteID"),
                        sites: [],
                        keepsignedin:false,
                        isLoggedIn: LocalSettings.getStorageItem("config.loggedin") === undefined ? false : LocalSettings.getStorageItem("config.loggedin"),
                        isBaseURLAvailable: true,
                       baseurl: 'http://swpdmsrv4.lisec.internal/',
                       avatar: LocalSettings.getStorageItem("config.avatardata") === undefined ? '' : LocalSettings.getStorageItem("config.avatardata"),
                       userfirstname: LocalSettings.getStorageItem("config.usernamedata") === undefined ? '' : LocalSettings.getStorageItem("config.usernamedata").split(" ")[0],
                       userlastname: LocalSettings.getStorageItem("config.usernamedata") === undefined ? '' : LocalSettings.getStorageItem("config.usernamedata").split(" ")[1],
                    }

        this.onBaseURLEnetered = this.onBaseURLEnetered.bind(this);
         
    }
       componentWillUnmount() {
    //  muobj.setupText();
   }
   componentDidUpdate() {
    //  muobj.setupText();
   }
  
    componentDidMount(){
        var isBaseURLAvailable = this.props.navigation.getParam("isBaseURLAvailable");
        isBaseURLAvailable = LocalSettings.getStorageItem("config.baseurl");
        console.log('====================================');
        console.log(isBaseURLAvailable);
        console.log('====================================');
          if (isBaseURLAvailable === false || isBaseURLAvailable === undefined) {
           
              this.setState({
                  isBaseURLAvailable: false
              });
          } else{
                var baseURL = LocalSettings.getStorageItem("config.baseurl");
                var loggedin = LocalSettings.getStorageItem("config.loggedin");
                console.log('**********baseURL**********');
                console.log(baseURL);
                console.log('*********baseURL*********');
                
                if (loggedin !== undefined && loggedin === true) {
                         siteNameGlobal = LocalSettings.getStorageItem("config.sitename");
                        this.setState({baseurl:baseURL,isLoggedIn:loggedin})
                        this.loadUserData();
                }
                else
                     this.setState({baseurl:baseURL})

                this.loadSites();

          }

    }
    loadUserData() {
        
        let accessToken = LocalSettings.getStorageItem("config.accessToken." + siteNameGlobal);
        let parts = accessToken.split(".");
        var decodedPayload = JSON.parse(atob(parts[1]));
        console.log(decodedPayload.user,siteNameGlobal,'decodedPayloaddecodedPayloaddecodedPayload')
        OpenApiClient_usr_mgmt.getClient(siteNameGlobal).GET_users_userId(this.callbackLoadUserData.bind(this), decodedPayload.user);
    }

    callbackLoadUserData(responseData) {
        console.log('====================================');
            console.log("Avatar Loguin",responseData);
            console.log('====================================');
        if (responseData.state.response !== undefined && responseData.state.response.data !== undefined ) {
            
       
            var jsonData = commonFunction.convertToUint(responseData.state.response.data);
            console.log('================ after Conv===============');
            console.log("Avatar Loguin after Conv",jsonData);
            console.log('=============== after Conve===============');
            if (jsonData !== undefined && Object.keys(jsonData).length !== 0) {
                LocalSettings.setStorageItem("config.usernamedata", jsonData.userData.firstNameField + " " + jsonData.userData.lastNameField);
                LocalSettings.setStorageItem("config.avatardata", (jsonData.avatar !== undefined ? 'data:image/gif;base64,' + jsonData.avatar.data : ''));
            }
             var final = 'data:image/gif;base64,' + jsonData.avatar.data;
                if (jsonData.avatar.data !== '')
                console.log('================ final===============');
                console.log("Avatar Loguin final",final);
                console.log('=============== finale===============');
                        this.setState({avatar:final,userfirstname:jsonData.userData.firstNameField,userlastname:jsonData.userData.lastNameField});
                    

            // history.push(basename + "liorderstatus");
            // history.go(0);

            this.loadNewsFeedTime();
        } else {
            // console.log("RESPONSE : " + responseData.state.response);
        }
    }


    loadSites() {
        OpenApiClient_auth.getClient("default").GET_sites(this.callbackLoadSites.bind(this));
    }

    loadNewsFeedTime() {
        axios.get("https://business-portal.lisec.com/newsfeed/newsfeednewcount.php")
        .then(function (response) {
            // console.log(response);

            let newFeedCounter = 0;

            if(response.data !== undefined){
                response.data.map((eachObj, index) => {
                    let userLastVisitTime = LocalSettings.getStorageItem('newsfeed.lastaccesstime');
                    if(parseInt(eachObj.publishedTimeStamp) > userLastVisitTime)
                    {
                        newFeedCounter++;                        
                    }                    
                })
            } 
            if(newFeedCounter > 0){
                       LocalSettings.setStorageItem('newsfeed.newcount', newFeedCounter);
                    //    MenuConnector.setBadgeNewsFeed(newFeedCounter);
            }
            // Actions.LiNewsFeed({isLogging:false});
            // this.props.navigation.navigate("Home",{isLogging:false})
            //Actions.LiScannerMenu({isLogging:false});

            // history.push(basename + "liorderstatus");
            // history.go(0);

        })
        .catch(function (error) {
            console.error(error, "Error in loading news feed data");
        })
    }


    callbackLoadSites(responseData) {
      
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                var result = commonFunction.convertToUint(responseData.state.response.data)
             if(this.state.selectedSite !== 0){
                            
                this.setState({sites: result.sites,selectedSite:this.state.selectedSite})
                }
                else{
                  
                this.setState({sites: result.sites,selectedSite:result.sites[0].name});
                 LocalSettings.setStorageItem("config.selectedSiteID", result.sites[0].name);
                 if(Platform.OS === "android"){
                    // MenuConnector.writeKeyValueItem("config.selectedSiteID", result.sites[0].name)
                 }
                 else{
                    NativeModules.TestBridge.writeKeyValueItem("config.selectedSiteID", result.sites[0].name)
                 }
                }
            } 
            else {
                console.log("Error in load sites");
            }
        }
        else {
            // console.log("RESPONSE : " + responseData.state.response);
        }
    }

    generateSitesList(siteList) {
    
        if(siteList.length <= 0) return;
      
        if(Platform.OS === "android" ){
            return (
                <View style={{ width: width(98), height: height(8),  borderWidth: 1.5, borderColor: '#881b4c', borderRadius: 15,justifyContent:"center" }}>
                       <Picker 
                       testID={"sitepicker"}
                selectedValue={this.state.selectedSite}
                onValueChange={(site,index) => this.handleComboChange(site,index)}
                    
                >
                {
                    siteList.map((siteDetails, siteIndex) => (
                            <Picker.Item key={siteIndex} label = {siteDetails.name} value = {siteDetails.name}/>
                        
                    ))}
                </Picker>
                </View>
             
            )
        }
        else{
            return (
                <PickerIOS 
                selectedValue={this.state.selectedSite}
                onValueChange={(site,index) => this.handleComboChange(site,index)}
                itemStyle={{ width: width(98), height: height(8),fontSize:18, borderWidth: 1.5, borderColor: '#881b4c', borderRadius: 15}}
                >
                {
                    siteList.map((siteDetails, siteIndex) => (
                            <PickerIOS.Item key={siteIndex} label = {siteDetails.name} value = {siteDetails.name}/>
                    ))}
                </PickerIOS>
            )
        }
      
    }

    handleComboChange(site,index) {
        // console.log("COMBO VALUE", event.target.value)
        this.setState({selectedSite: site });     
        
        LocalSettings.setStorageItem("config.selectedSiteID", site);
        if(Platform.OS === "android"){
            // MenuConnector.writeKeyValueItem("config.selectedSiteID", site);
        }
        else{
            NativeModules.TestBridge.writeKeyValueItem("config.selectedSiteID", site);
        }
    }

    doLogin = async () => {
        Keyboard.dismiss();
        let username = this.state.username;
        let password = this.state.password;
        let siteName = this.state.selectedSite; // initial set

        LocalSettings.setStorageItem("config.username", username);
        LocalSettings.setStorageItem("config.sitename", 'PROD');

        if(Platform.OS === "android"){
            //  MenuConnector.writeKeyValueItem("config.username", username);
            //  MenuConnector.writeKeyValueItem("config.sitename", siteName);
        }
        else{
             NativeModules.TestBridge.writeKeyValueItem("config.username", username);
             NativeModules.TestBridge.writeKeyValueItem("config.sitename", siteName);
        }
       


        siteNameGlobal = LocalSettings.getStorageItem("config.sitename");

        console.log('====================================');
        console.log("PRODDDDDDDDD",siteName);
        console.log('====================================');

        var arrayBuffer = sha3_512.arrayBuffer(password);
        var base64StringPassword = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))) 
        // var base64StringPassword = Buffer.from(arrayBuffer).toString('base64');

        // console.log(username + "<<<<<<<>>>>>>>" + btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))));

        OpenApiClient_auth.getClient(siteNameGlobal).POST_tokens(this.callbackDoLogin.bind(this), username, base64StringPassword, null, null);
                // let siteName = await LocalSettings.getStorageItem("config.sitename");
          
        // OpenApiClient_auth.getClient(siteName).POST_tokens(this.callbackDoLogin.bind(this), null, null, username, base64StringPassword);
    }

    doLogout = async () =>{
                Keyboard.dismiss();
                this.setState({isLoggedIn:false,avatar:''})
                LocalSettings.removeStorageItem("config.avatardata");
                  let siteName = LocalSettings.getStorageItem("config.sitename");
                  let refreshToken =  LocalSettings.getStorageItem("config.refreshToken." + siteName);
                //  console.log("Logging Outttttttttttt", refreshToken,siteName);
                  OpenApiClient_auth.getClient(siteName).DELETE_tokens(this.callbackDoLogout.bind(this), refreshToken);
    }
    callbackDoLogout = async (responseData) => {
        // console.log(responseData);
        
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {
                    console.log('Logout success=================',Platform.OS);
                    let siteName = LocalSettings.getStorageItem("config.sitename");
                    LocalSettings.removeStorageItem("core.refreshToken." + siteName);
                    LocalSettings.removeStorageItem("config.accessToken." + siteName);
                    LocalSettings.removeStorageItem("config.avatardata" + siteName);
                    LocalSettings.removeStorageItem("config.usernamedata" + siteName);


                    

                    LocalSettings.setStorageItem("config.loggedin",false);
                    // this.setState({isLoggedIn:false,avatar:''})
                    // Actions.HomeScreen();
                    // Actions.LiScannerMenu()
            }
        }
    }
    callBackForOrderSitePUTToken = async = (responseData) => {
        console.log('===============PUT_tokens==============',responseData.state.response.status == 200);
        console.log(responseData)
        if (responseData.state.response.status == 200){
            console.log('===============200=================');

            var binary = '';
            // var result = responseData.state.response.data;
            var bytes = new Uint8Array(responseData.state.response.data);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            var result=decodeURIComponent(escape(binary))
            // var result = commonFunction.convertToUint(responseData.state.response.data)
            console.log(result);
            console.log('===============200e==================');
            LocalSettings.setStorageItem("config.accessToken.ORDER",result);
            OpenApiClient_auth.getClient('ORDER').POST_lock_sessions(this.callBackLockSessions.bind(this), sessionId) //Only once per Login

            // console.log(result[0],result.accessToken,result.refreshTokenHeader,'@@@@@@@@@@=PUT_tokens@@@@@@@@@@=');
        }
        console.log('==============PUT_tokens==============');
    }

    callbackDoLogin = async  (responseData) => {
       
		var d = new Date();
		var n = d.getTime();
		var val1 = 'generatingsessionidd'        //Maintain this string length == 19
		var val2 = n.toString()
		sessionId = val1.concat(val2)
        let siteName = LocalSettings.getStorageItem("config.sitename");
        if (responseData.state.response !== undefined) {
            if (responseData.state.response.status === 200) {

                // console.log(sessionId,'sessionIdsessionIdsessionIdsessionIdsessionId')
                
                var result = commonFunction.convertToUint(responseData.state.response.data);

                

                LocalSettings.setStorageItem("config.refreshToken." + siteName, result.refreshToken);
                LocalSettings.setStorageItem("config.accessToken." + siteName, result.accessToken);
                LocalSettings.setStorageItem("config.loggedin", true);

                if(Platform.OS === "android"){
                                    console.log('====================================');
                                    console.log("Camgeertyfffffffffffffffffffffff Login");
                                    console.log('====================================');
                                    console.log( 'Login success=================', Platform.OS);
                        //  MenuConnector.showTestTitle("config.refreshToken." + siteName, result.refreshToken);
                        //  MenuConnector.showTestTitle("config.accessToken." + siteName, result.accessToken);
                        //  MenuConnector.writeKeyValueBoolean("config.loggedin", true);
                }
                else{
                         NativeModules.TestBridge.writeKeyValueItem("config.refreshToken." + siteName, result.refreshToken);
                         NativeModules.TestBridge.writeKeyValueItem("config.accessToken." + siteName, result.accessToken);
                         NativeModules.TestBridge.writeKeyValueBoolean("config.loggedin", true);
                }

           

                // OpenApiClient_auth.getClient("ORDER").PUT_tokens(this.callBackForOrderSitePUTToken.bind(this),null,result.refreshToken,null,'lisec',null,siteName);
                
                this.setState({isLoggedIn:true,userfirstname:'',userlastname:''})
                this.loadUserData();
                // Actions.LiHomeScreen({isLogging:false});
                // Actions.LiScannerMenu({isLogging:false})
                // history.push("/webapp1/orderStatus");
                // history.go();
            }
            else {
                console.log("Error in login");
                //  MenuConnector.showToast("Invalid Credentials.....");
            }

        }
        else {
            console.log("RESPONSE : " + responseData.state.response);
        }
    }

    callBackLockSessions(responseData) {
        console.log('SESSIONtokenregSTATUSSSSSS',responseData)

        if (responseData.state.response.status == 200){
            console.log(responseData.state.response.data,'SESSIONtokenregSTATUSSSSSS2')

            var result = commonFunction.convertToUint(responseData.state.response.data);
            console.log('SESSIONtokenregSTATUSSSSSS3',result)
            LocalSettings.setStorageItem("sessionid_ORDER",result);
        }
    }


    verifyAccessToken() {
        let siteName = getSiteName();
        let accessToken = AsyncStorage.getItem("config.accessToken." + siteName);

        return OpenApiClient_auth.getClient(siteName).GET_tokens(this.callbackVerifyAccessToken.bind(this), null, accessToken);
    }

    callbackVerifyAccessToken(responseData) {
        //return new Promise(function (resolve, reject) {
            if (responseData.state.response !== undefined) {
                if (responseData.state.response.status === 200) {
                    var result = LocalSettings.convertToJSON(responseData.state.response.data)
                    console.log('recieved result.........');
                }
                else if (responseData.state.response.response.status === 406) {
                    console.log(responseData.state.response.response.statusText + " :: Token expired");
                }
                else {
                    console.log("Error in verification");
                }
            }
            else {
                console.log("RESPONSE : " + responseData.state.response);
            }
        //})
    }
    callBackTest(responseData) { 
            console.log('====================================');
            console.log(responseData);
            console.log('====================================');
        if (responseData.state.response !== undefined && responseData.state.response.status !== undefined) {
            if (responseData.state.response.status === 200) {
                this.loadSites();
                this.setState({isBaseURLAvailable:true});
                if(Platform.OS === "android"){
                    // MenuConnector.writeKeyValueItem("config.baseurl", this.state.baseurl);
                }
                else{
                    NativeModules.TestBridge.writeKeyValueItem("config.baseurl", this.state.baseurl);
                }
            }
        }
        else{
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$",responseData);
            // MenuConnector.showToast("Error in URL....")
            
        }
    }
    onBaseURLEnetered =  () => {
        LocalSettings.setStorageItem("config.baseurl", this.state.baseurl);
        OpenApiClient_auth.getClient("default").GET_sites(this.callBackTest.bind(this));
    }
    onClearBaseURLEntered = () => {
        this.doLogout();
        this.setState({isBaseURLAvailable:false});
    }

     onClearBaseURLEntered = () => {
        this.doLogout();
        this.setState({isLoggedIn:"false"});
        LocalSettings.setStorageItem("config.baseurl", this.state.baseurl);
        OpenApiClient_auth.getClient("default").GET_sites(this.callBackTest.bind(this));
    }


    render() {
        return (
               <View testID="welcome" style={styles.container}>
                {this.state.isBaseURLAvailable === false
                ?
                   <View 
                    testID="UrlModel" style={
                        {
                            marginHorizontal: width(12), marginVertical: height(40),
                            height: height(20), width: width(75),  borderColor: '#881b4c', borderWidth: 1.5,
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            flexDirection: 'column'
                        }}>
                        <Text style={{ color: '#881b4c', fontSize: 16, marginTop: 10 }} textAlign> Enter the Base URL </Text>

                        <TextInput
                        testID="textinputurl"
                            style={{ width: width(55) }}
                            placeholder="Base URL..."
                            value={this.state.baseurl}
                            onChangeText={(text) => this.setState({ baseurl: text })}
                        />
                        <TouchableOpacity
                            testID="baseurl"
                             onPress={() => this.onBaseURLEnetered()}>
                            <Text style={{ color: '#881b4c', fontSize: 20, marginTop: 10 }}> OK </Text>
                        </TouchableOpacity>
                      
                    </View>
                    :
                    
                 <View testID="loginview"  style={{ width: width(100), height: height(98), alignItems: 'center' }}>
                    <View style={{ width: width(95),height:height(8),flexDirection:'row'}}>
                    <TextInput
                       testID="inputtexturl"
                       style={{ width: width(85), height: height(8), fontWeight: 'bold', fontFamily: 'Cochin' }}
                       placeholder="Enter Base URL...."
                       value={this.state.baseurl}
                        onChangeText={(text) => this.setState({ baseurl: text })}
                       onSubmitEditing={(event) => this.onClearBaseURLEntered()}
                   />
                    <TouchableOpacity
                            style={{width:width(10),height:height(8),alignItems:"center",justifyContent:"center"}}
                            onPress={() => this.onClearBaseURLEntered()}>
                            <Image style={styles.ImageIconStyle3} source={require("../asset/clearfieldicon.png")} />
                  
                       </TouchableOpacity>
                   </View>
                   <View style={{ width: width(95), height: height(45), alignItems: 'center', }}>
                    {this.state.isLoggedIn === true
                    ?
                        <View style={{alignContent:'center'}}>
                            {this.state.avatar !== ''
                            ?
                             <Image style={styles.ImageIconStyle2}
                                testID="avatarimage"
                                source={{uri:this.state.avatar}} resizeMode='contain'/>
                            :
                            <ActivityIndicator style={{width: width(95), height: height(18), alignItems: 'center',justifyContent:'center' }}/>
                            }
                            
                                <Text
                                style={styles.GridViewInsideTextItemStyle}
                                 >
                                   {this.state.userfirstname} {this.state.userlastname}
                                 </Text>
                        </View>
                    
                    :
                        <View style={{alignContent:'center'}}>
                            <View>
                            <Image style={styles.ImageIconStyle4} source={require("../asset/accounticon.png")}/> 
                            </View>
                            <TextInput
                            style={{ width: width(90), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                            placeholder="Enter your Username"
                            onChangeText={(text) => this.setState({ username: text})}
                            value={this.state.username}
                            underlineColorAndroid='#881b4c'
                            />
                            <TextInput
                            style={{ width: width(90), height: height(8), fontSize: 17, fontWeight: 'bold', fontFamily: 'Cochin' }}
                            placeholder="Enter your Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            underlineColorAndroid='#881b4c'
                            />
                        </View>
                    }
                    </View>
                    
                   
                    <View style={{width:width(95)}} testID="SiteView" >
                        <Text style={styles.loadText}  textAlign='flex-start'>Site</Text>
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <View>
                            {this.state.sites !== null
                            ?
                            this.generateSitesList(this.state.sites)
                            : <View/>
                            }
                        </View>
                    </View>
                    <View testID="loginbottomview" style={{ alignItems: "center", marginTop: height(5) }}>
                        {this.state.isLoggedIn === true
                            ?
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.doLogout()}>
                                <Text style={styles.textContainer}>
                                <LiMultiTerm textId="99023849" textVal="Logout" /></Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity testID="loginbutton" style={styles.buttonContainer} onPress={() => this.doLogin()}>
                                <Text style={styles.textContainer}> <LiMultiTerm textId="99023848" textVal="Login" /> </Text>
                            </TouchableOpacity>
                        }
                        <View style={{ flexDirection: 'row', height: height(8), alignItems: 'center' }}>
                            <CheckBox checked={this.state.keepsignedin} containerStyle={{ backgroundColor: 'whitesmoke' }}
                                onValueChange={() => this.setState({ keepsignedin: !this.state.keepsignedin })} />
                            <Text> 
                                <LiMultiTerm textId="99028981" textVal="Keep Me Signed In" />
                            </Text>
                        </View>
                    </View>
                </View>
                
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
                container: {
                flex: 1,
                },
                 loadText: {
                fontSize: 20,
                // marginTop: height(8),
                justifyContent:'flex-start',
                fontFamily: 'Cochin',
                alignItems: 'flex-start',
                color: '#881b4c'
                },
                buttonContainer:{
                backgroundColor: '#a0185c',
                borderRadius: 25,
                width:300,
                height:height(8),
                justifyContent: 'center',
                alignItems: 'center',
                },
                buttonURLContainer:{
                backgroundColor: '#a0185c',
                paddingVertical:15,
                borderRadius: 25,
                width:width(15),
                height:height(5),
                margin:5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                },
                textContainer:{
                fontSize: 24,
                color: '#FFF',
                textAlign: 'center',
                fontWeight: 'bold',
                },
                 ImageIconStyle2: {
                height: height(18),
                width: width(98),
                marginTop: height(5),
                resizeMode : 'contain',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50
            },
             ImageIconStyle3: {
                 height: height(10),
                 width: width(8),
                 resizeMode: 'contain',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
             ImageIconStyle4: {
                 height: height(18),
                 width: width(98),
                     marginTop: height(5),
                 resizeMode: 'contain',
                 justifyContent: 'center',
                 alignItems: 'center'
             },
                 GridViewInsideTextItemStyle: {
      paddingTop: 1,
      paddingBottom: 1,
      fontSize: 20,
      textShadowOffset:{wdith:2.5,height:2},
      fontWeight: '200',
      textShadowColor:'lightgrey',
      justifyContent: 'center',
      marginLeft:3,
      textAlign:'center'
    },
        });