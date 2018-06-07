/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Alert, AppRegistry,TextInput, StyleSheet, Button, Image, Text, View } from 'react-native';
import tabNav from '../pages/tabnav';
import { DrawerNavigator} from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";

const drawernav = DrawerNavigator({
    DrawerItem1: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Drawer Item 1",
            drawerIcon: ({ tintColor }) => <Icon name="rocket" size={24} />
        },
    }
});

export default class NewRNPro extends Component {
 constructor(props) {
    super(props);
    this.state = {
      text: ''
  };
  }
 
  render() {
    return (
        <View>
          <Image source={{uri: 'https://www.absbiz.co.uk/Portals/0/Logo.png'}}
         style={{width: 200, height: 100}} >
        <Text style={styles.whiter}>Inside</Text>
        </Image>
        <Text style={styles.welcome}>
          Welcome to ABS Retail App!
        </Text>
         
        <Button
          onPress={() => { Alert.alert('You tapped the button!')}}
          title="Press Me"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   whiter: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 10,
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('NewRNPro', () => NewRNPro);
