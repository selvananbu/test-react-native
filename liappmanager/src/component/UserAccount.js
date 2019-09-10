//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Alert,ScrollView } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import * as LocalSettings from '../lib/localsettings';


// create a component
class UserAccount extends Component {
    static navigationOptions = {
        drawerLabel: () => null
   }
    constructor(props) {
        super(props);
        this.state = {
            avatar: this.props.avatar,
            userListArr: LocalSettings.getStorageItem("config.credentialListArr"),
            currentLoggedUser: LocalSettings.getStorageItem("config.currentloggeduser") !== undefined ? LocalSettings.getStorageItem("config.currentloggeduser") : {}
        }

    }

    componentDidMount(){
        var currentLoggedUser = this.state.currentLoggedUser;
        var userListArr = this.state.userListArr;

        
        userListArr.forEach(function(item,i){
            if(item.usn === currentLoggedUser.usn){
              userListArr.splice(i, 1);
              userListArr.unshift(item);
            }
          });
          this.setState({userListArr:userListArr})
    }


    addUser(){
        LocalSettings.setStorageItem("config.credentiallist" + this.props.userfirstname, this.props.password);
       
        console.log('====================================');
        console.log("Hiiiiiiiiiiiiiiii");
        console.log('====================================');
        // Actions.Login({ addNewUser: true })
        // this.props.navigation.setParams({ addNewUser: true });
        this.props.navigation.push("Login",{addNewUser: true})

    }

    userAction(key, userData) {
        if (key == "SWAPUSER") {
            LocalSettings.setStorageItem("config.currentloggeduser", userData)
            LocalSettings.setStorageItem("config.avatardata", userData.avatar)
            LocalSettings.setStorageItem("config.usernamedata",userData.usn);

            Actions.Login({
                username: userData.usn,
                password: userData.pwd
            })
        }
    }

    deleteUser(userData) {
        if (this.state.currentLoggedUser.usn == userData.usn){
            console.log('CURRENY LOGGED IN')
            Actions.Login({ deleteUser: true, addNewUser:false })
        }

        var tempArr = this.state.userListArr
        console.log('BEFOREEEEEEEEEdel', tempArr.length)
        for (var i = 0; i < tempArr.length; i++) {
            if (tempArr[i].usn == userData.usn) {
                tempArr.splice(i, 1);
                i--;
            }
        }
        LocalSettings.setStorageItem("config.credentialListArr", tempArr)
        this.setState({ userListArr: tempArr });
        console.log(tempArr.length, 'AFTERERERERERE')
        
    }


    render() {
        console.log('HETYYYYYYYYYY', this.state.userListArr.length)
        var userCheck = this.state.currentLoggedUser.usn;
        return (
            <View style={styles.container}>
                <View style={styles.block}>
                    <ScrollView>
                    {this.state.userListArr.map((item, index) => {
                        return (
                            <View key = {index} style={{ marginVertical: 2, borderWidth: 3, borderColor: (userCheck == item.usn ? '#881b4c' : 'lightgrey'), width: width(75), height: height(13), backgroundColor: (userCheck == item.usn ? '#881b4c' : 'lightgrey'), paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image style={{ width: height(9), height: height(9), borderRadius: 50, borderColor: 'grey', borderWidth: 1, }}
                                    source={{ uri: item.avatar }}
                                />
                                <TouchableOpacity onPress={() => this.userAction('SWAPUSER', item)} style={{ width: width(35), height: height(6), borderColor: (userCheck == item.usn ? '#881b4c' : 'whitesmoke'), borderWidth: 1, borderTopRightRadius: 25, borderBottomRightRadius: 25, backgroundColor: (userCheck == item.usn ? 'whitesmoke' : 'grey'), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: (userCheck == item.usn ? '#333' : 'whitesmoke') }} > {item.usn} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Alert.alert('Lisec Core App', 'Do you want to remove the user?', [
                                    { text: 'Remove', onPress: () => this.deleteUser(item) },
                                    { text: 'No', onPress: () => console.log("EXIT NO for delete user!") }
                                ],
                                )}>
                                    <Image style={{ height: width(6), width: width(6), resizeMode: 'contain' }} source={require("../asset/clearfieldicon.png")} />
                                </TouchableOpacity>

                            </View>
                        )
                    }
                    )
                    }
                    </ScrollView>
                </View>

                <TouchableOpacity style={{ backgroundColor: '#881b4c', width: '50%', height: '9%', borderColor:'whitesmoke', borderWidth:1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize:16 }} onPress={this.addUser.bind(this)}> +  ADD USER </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
    block: {

        height: height(72),


    }

});

export default UserAccount;
