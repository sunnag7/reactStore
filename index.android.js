import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
 
//import NewRNPro from './src/pages/NewRNProApp';
 
import { DrawerNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import tabnav from './src/pages/tabnav';
import stacknav from './src/pages/stacknav';
import controler from './src/pages/ControlPanel';
import Profile from './src/pages/Profile';

//export default class NewRNPro extends Component {
 
//  render() {
//    return (
//      <Login />
//    );
//  }
//}
//this has to be moved

const drawernav = DrawerNavigator({

    DrawerItem1: {
        screen: stacknav,
        navigationOptions: {
            drawerLabel: "Home",
            drawerIcon: ({ tintColor }) => 
            <Icon name="home" size={24} 
            />
        },
    },
    DrawerItem2: {
        screen: controler,
        navigationOptions: {
            drawerLabel: "Product Categories",
            drawerIcon: ({ tintColor }) => 
            <Icon name="th-list" size={24} 
           />
        },
    },
    DrawerItem3: {
        screen: Profile,
        navigationOptions: {
            drawerLabel: "My Account",
            drawerIcon: ({ tintColor }) => 
            <Icon name="user" size={24} 
           />
        },
    }
} 
);
 
//AppRegistry.registerComponent('NewRNPro', () => NewRNPro);
AppRegistry.registerComponent('NewRNPro', () => drawernav);