/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Picker,Platform,
  Text,ImageBackground,PickerIOS, NativeModules
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { width, height } from 'react-native-dimension';



import OpenApiClient_search from '../openapi/openapiclient_search';
import * as LocalSettings from '../lib/localsettings';
import * as commonFunction from '../lib/responseFunction';

// import * as MenuConnector from './nativeconnector/menuconnector';
import LiMultiTerm from '../lib/limultiterm';
const muobj = new LiMultiTerm("", "");
const PREFIX = 'AAD_';



  
export default class LiSettings extends Component {

  constructor(props){
    super(props);
    this.state={
      languageList:'',
      modalVisible:false,
      currentUnit:{},
      selectedSite: LocalSettings.getStorageItem("core.app.language.id3") === undefined ? 0 : LocalSettings.getStorageItem("core.app.language.id3"),
      sites: [],
      attributeList: LocalSettings.getStorageItem("FAV_ATTRLIST") === undefined ? 0 : LocalSettings.getStorageItem("FAV_ATTRLIST"),
      selectedAttribute:'',
      selectedFavUnit:'',
      favunitlist:[],
      selectedAttributeIndex:0,
      selectedFavUnitIndex:0,
      darkmode:false
    }
  }
  componentDidMount(){
     muobj.setupText();
     
          var siteNameGlobal = LocalSettings.getStorageItem("config.sitename");
          if (siteNameGlobal !== undefined || siteNameGlobal !== null)
                OpenApiClient_search.getClient(siteNameGlobal).GET_languages(this.callBackWithLanguage.bind(this));
  }
  callBackForAttributes(responseData){
     var jsonData = commonFunction.convertToUint(responseData.state.response.data);
     LocalSettings.setStorageItem("FAV_ATTRLIST",jsonData);
     this.setState({attributeList:jsonData,favunitlist:jsonData.attr[0].unit})
  }
  callBackWithLanguage(responseData){
       var jsonData = commonFunction.convertToUint(responseData.state.response.data);
       this.setState({languageList:jsonData});
       var siteNameGlobal = LocalSettings.getStorageItem("config.sitename");
 if ((siteNameGlobal !== undefined || siteNameGlobal !== null ) && LocalSettings.getStorageItem("FAV_ATTRLIST") === undefined){
    OpenApiClient_search.getClient(siteNameGlobal).GET_attributes(this.callBackForAttributes.bind(this));
 }
  else if(LocalSettings.getStorageItem("FAV_ATTRLIST") !== undefined){
     var attrList =  LocalSettings.getStorageItem("FAV_ATTRLIST");
   
     if(LocalSettings.getStorageItem(attrList.attr[0].attrType) !== undefined && LocalSettings.getStorageItem(attrList.attr[0].attrType) !== null){
       attrList.attr[0].unit.map((value, index) => {
         if (value.unitStr === LocalSettings.getStorageItem(attrList.attr[0].attrType)) {
                   this.setState({selectedAttribute:attrList.attr[0],favunitlist:attrList.attr[0].unit,selectedFavUnit:value})
         }

       });
     }
     else{
         this.setState({selectedAttribute:attrList.attr[0],favunitlist:attrList.attr[0].unit})
     }
  }
  }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    componentWillUnmount() {
      muobj.setupText();
    }
    componentDidUpdate() {
      muobj.setupText();
    }
    handleComboChange(site, index) {
      this.setState({
        selectedSite: site
      });      
      LocalSettings.setStorageItem("core.app.language.id3", site);
      if(Platform.OS === "android"){
        // MenuConnector.writeKeyValueItem("core.app.language.id3", site);
      }
      else{
        NativeModules.TestBridge.writeKeyValueItem("core.app.language.id3", site)
      }
      // MenuConnector.setLocale(site);
    }

     handleComboChangeForFav(favindex,index){
       console.log('====================================');
       console.log(favindex);
       console.log('====================================');

      var favunit = this.state.selectedAttribute.unit[favindex];
        this.setState({
          selectedFavUnit: favunit,
          selectedFavUnitIndex:favindex
        });
        LocalSettings.setStorageItem(PREFIX + this.state.selectedAttribute.attrType+"_FAV",index);
        if(Platform.OS === "android"){
          // MenuConnector.writeKeyValueInteger(PREFIX + this.state.selectedAttribute.attrType + "_FAV", index);
          }
          else{
            NativeModules.TestBridge.writeKeyValueInteger(PREFIX + this.state.selectedAttribute.attrType + "_FAV", index);
          }
        
    }
    handleComboChangeForAttribute(mainindex, index) {

      var attribute = this.state.attributeList.attr[mainindex];

      

      if (LocalSettings.getStorageItem(PREFIX + attribute.attrType+"_FAV") !== undefined && LocalSettings.getStorageItem(PREFIX + attribute.attrType+"_FAV") !== null) {
        var indx = LocalSettings.getStorageItem(PREFIX + attribute.attrType + "_FAV");
        attribute.unit.map((value,index) => {

          if(value.unitStr === attribute.unit[indx].unitStr)
          {

               this.setState({
                 selectedAttribute: attribute,
                 favunitlist: attribute.unit,
                 selectedFavUnit: value,
                 selectedAttributeIndex:mainindex
               });
          }
            
        });

       
      }
      else{
          this.setState({
        selectedAttribute: attribute,
        selectedAttributeIndex:mainindex,
        favunitlist: attribute.unit
      });
      }
      

    }

      generateSitesList(languageList) {
        if(Platform.OS === "ios"){
          return (
            <PickerIOS  
            itemStyle={{ width: width(98), height: height(8)}}
            selectedValue={this.state.selectedSite}
            onValueChange={(site,index) => this.handleComboChange(site,index)}
            >
            {
                languageList.lang.map((siteDetails, siteIndex) => (
                        <PickerIOS.Item key={siteIndex} label = {siteDetails.langDesc} value = {siteDetails.langId3}/>
                ))}
            </PickerIOS>
        )
        }
        else{
          return (
            <Picker  
            style={styles.picker}
            mode="dropdown"
            selectedValue={this.state.selectedSite}
            onValueChange={(site,index) => this.handleComboChange(site,index)}
            >
            {
                languageList.lang.map((siteDetails, siteIndex) => (
                        <Picker.Item key={siteIndex} label = {siteDetails.langDesc} value = {siteDetails.langId3}/>
                ))}
            </Picker>
        )
        }
     
    }
          generateAttributeList(attributeList) {

        if(Platform.OS === "ios"){
          console.log('========grtrrr==================');
          console.log(this.state.attributeList.attr[this.state.selectedAttributeIndex]);
          console.log('====================================');
          return (
            <PickerIOS  
            itemStyle={{ width: width(98), height: height(8)}}
            selectedValue={this.state.selectedAttributeIndex}
            onValueChange={(site,index) => this.handleComboChangeForAttribute(site,index)}
            >
            {
               attributeList.attr.map((item, index) => (
                 
                        <PickerIOS.Item key={index} label = {item.attrType} value = {index}/>
                ))}
            </PickerIOS>
        )
        }
        else{
          
          return (
            <Picker  
            style={styles.picker}
            selectedValue={this.state.selectedAttribute}
            onValueChange={(site,index) => this.handleComboChangeForAttribute(site,index)}
            >
            {
                attributeList.attr.map((item, index) => (
                        <Picker.Item key={index} label = {item.attrType} value = {item}/>
                ))}
            </Picker>
        )
        }
     
    }
    generateFavUnit(favlist) {
      console.log('====================================');
      console.log("dddd",this.state.selectedAttribute);
      console.log('====================================');
        if(Platform.OS === "ios"){
          return (
            <PickerIOS  
            itemStyle={{ width: width(98), height: height(8)}}
            selectedValue={this.state.selectedFavUnitIndex}
            onValueChange={(site,index) => this.handleComboChangeForFav(site,index)}
            >
            {
               
                favlist.map((item, index) => (
                        <PickerIOS.Item key={index} label = {item.unitStr} value = {index}/>
                ))}
            </PickerIOS>
        )
        }
        else{
          return (
            <Picker  
            style={styles.picker}
            selectedValue={this.state.selectedFavUnit}
            onValueChange={(site,index) => this.handleComboChangeForFav(site,index)}
            >
            {
                favlist.map((item, index) => (
                        <Picker.Item key={index} label = {item.unitStr} value = {item}/>
                ))}
            </Picker>
        )
        }
     
    }
    onDarkModeChanged(event){
      if (theme.name == 'darkmode') {
        theme.active('default');
      }
      else{
        theme.active('darkmode');
      }
      
    console.log('===========$$$================',theme.active);
        this.setState({darkmode:!this.state.darkmode})
    }
  render() {
    console.log('===========$$$================');
    console.log(this.state.selectedAttribute);
    console.log('====================================');
  return (
    <ImageBackground style={{ flex: 1, }} resizeMode='cover' source={{uri:'glass_block2'}}>

   <View style={styles.container}>
       <Text style={styles.combolabel}>
       <LiMultiTerm textId="99004568" textVal="Languages"/>
      </Text>
      {this.state.languageList.lang !== undefined ?
      <View style={{alignItems:"center",justifyContent:"center"}}>
             <View style={styles.combostyle}>
                        {this.state.sites !== null
                            ?
                            this.generateSitesList(this.state.languageList)
                            : <View />
                        }
        </View>
      </View>
    
        : 
        <View/>
      }
         <Text style={styles.combolabel}>
        Attribute Units
      </Text>
      {this.state.attributeList.attr !== undefined ?
       <View style={{alignItems:"center",justifyContent:"center"}}>
             <View style={styles.combostyle}>
                        {this.state.sites !== null
                            ?
                            this.generateAttributeList(this.state.attributeList)
                            : <View />
                        }
        </View>
      </View>
      :
      <View/>
      }
      <Text style={styles.combolabel}>
        Favourite Units
      </Text>
         {this.state.favunitlist !== undefined ?
       <View style={{alignItems:"center",justifyContent:"center"}}>
             <View style={styles.combostyle}>
                        {this.state.sites !== null
                            ?
                            this.generateFavUnit(this.state.favunitlist)
                            : <View />
                        }
        </View>
      </View>
      :
      <View/>
      }
      
      {/* <View style={{width:width(98),height:height(10),flexDirection:"row",margin:10}}>
        <View style={{width:width(45)}}>
        <Text style={styles.header}>Dark Mode</Text>
        </View>
        <CheckBox value={this.state.darkmode} onValueChange={this.onDarkModeChanged.bind(this)}/>
      </View> */}
    </View>
    </ImageBackground>
     

  );
}
}

const styles = StyleSheet.create({
  container: {
    width:width(100),
    height: height(20),
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width:width(100),
    height: height(20),
  },
  header: {
    fontSize:17,
      margin:3,
    color:"#c13e6c"
  },
  combostyle:{
    width: width(98), 
    height: height(7), 
    borderWidth: 1.5, 
    borderColor: '#881b4c', 
    borderRadius: 15,
  },
  picker:{
    width: width(98),
     height: height(6)
  },
  combolabel:{
    color:"#c13e6c",
    fontSize:17,
  }
});
