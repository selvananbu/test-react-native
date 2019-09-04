import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    WebView,
    BackHandler,

} from 'react-native';
import axios from "axios";
import * as data from './licenseinfo'

import { width, height, totalSize } from 'react-native-dimension';

var WEBVIEW_REF = 'webview';
var isHome = false;

export default class LiLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showLisecenseTypeDesc:false,
            lisence:'',
            header:'',
            modalVisible: false,
            showweb:false,
            url:''
        };
    }

     backHandler = () => {
         if (this.state.backButtonEnabled) {
             this.refs[WEBVIEW_REF].goBack();
             return true;
         }
         else if(!isHome){
             this.setState({showweb:false});
             isHome = true;
             return true;
         }
     }

     componentDidMount(){
         isHome = false;
         BackHandler.addEventListener('hardwareBackPress', this.backHandler);
     }
     componentWillUnmount() {
         BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
     }

     onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
        });
    };


    licenseClick(value){
        this.setState({modalVisible:true})
      
        var context =  '';
        var header = '';
        
        data.details.map((innervalue,innerindex) => {
            if(value['license_type'] === Object.keys(innervalue)[0]){
                  context = innervalue[Object.keys(innervalue)[0]];
                  header = Object.keys(innervalue)[0];

            }
        })
        if(context !== '')
                this.setState({showLisecenseTypeDesc:true,lisence:context,header:header})
        
    }
    linkClick(value){
              this.setState({showweb:true,url:value.url})
    }
    
    render() {
        return (
            <View style={styles.container}>
            {this.state.showweb === true 
            ?
             <WebView
                ref={WEBVIEW_REF}
                source={{uri:this.state.url}}
                onNavigationStateChange={this.onNavigationStateChange}
                style={{marginTop: 20}}
                />
            :
            <View>
             {this.state.showLisecenseTypeDesc === true ?
             <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    hardwareAccelerated={true}
                    onRequestClose={() => {
                        this.setState({modalVisible : false})  }}>
                    < View style = { {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'whitesmoke',
                            marginVertical: width(50),
                            marginHorizontal:width(5),
                            borderWidth: 1,
                            borderColor: 'grey',
                            shadowRadius: 20,
                            elevation: 5,
                            shadowOffset: {
                                width: 3.5,
                                height: 4
                            }
                        }
                    }
>
                    <TouchableOpacity style={{height:height(6),width:width(95),backgroundColor:"#881b4c"}}>
                         <Text style={{color:"#fff",fontSize: 28,fontWeight: 'bold',marginLeft:width(3)}}>
                        {this.state.header}
                    </Text>
                    </TouchableOpacity>
                   
                    <ScrollView>
                        <Text>
                        {this.state.lisence}
                        </Text>
                    </ScrollView>
                    
                    <TouchableOpacity style={styles.modalButton} onPress={()=> this.setState({modalVisible:false})}>
                        <Text>OK</Text>
                    </TouchableOpacity>
                    </View>
                </Modal> 
            :

            <View/>
                }
            
            <ScrollView>
              {data !== undefined && data.data.map((value,index) => {
                    return(
                        <View style={{width:width(98)}}
                                key={index}>
                            <View style={styles.machineName}>
                            <View style={{width:width(30), justifyContent:'center'}}>
                               <Text style={{color:'#881b4c', fontSize:18,fontWeight:'bold'}}>
                                {value.lib_name} 
                            </Text>
                            </View>
                            <View style={{width:width(65), alignContent:'space-around', justifyContent:'center'}}>
                                <TouchableOpacity onPress={this.licenseClick.bind(this,value)}>
                               <Text  style={{color:'#881b4c', fontSize:18, textDecorationLine:'underline'}}>
                                {value.license_type} 
                            </Text>
                            </TouchableOpacity>
                            <Text onPress={this.linkClick.bind(this,value)} style={{textDecorationLine:'underline'}}>
                                {value.url} 
                            </Text> 
                            </View>

                            </View>
                           <View
                        style={{
                          height:1,
                          width:"100%",
                          backgroundColor:"black",
                        }}
                      />
                      </View>
                    )
              })}

              </ScrollView>
            </View>

            }
           
            </View>
        );
    }
    
}

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      header: {
        backgroundColor: '#dfcee7',
        padding:10,
      },
      headerText: {

        color:'#660033',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        paddingBottom:10
      },
      containerPlain: {
        backgroundColor:'#F5FCFF',
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        height:height(90)
      },
      items: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Cochin',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
      },
          modalButton: {
              borderWidth: 2,
              borderColor: '#881b4c',
              borderRadius: 15,
              paddingVertical: width(2),
              paddingHorizontal: width(4),
              margin:width(5)
          },

      ImageIconStyle2: {
        marginLeft: 20,
        paddingHorizontal: 1,
        margin: 2,
        height: height(8),
        width: width(8),
        resizeMode : 'contain',

      },
      machineStatus:{
        width:"30%",
         flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    machineName:{
        // height:height(8),
        padding:width(1),
      flexDirection:"row",
      justifyContent:'space-around',
      alignContent:'space-around'
  },
  machineDirection:{
    width:"30%",
    justifyContent:'center'
}
    });
