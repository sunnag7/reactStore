import React, { Component } from 'react';
import {
  View,StyleSheet,
  Text, Button, ScrollView, Dimensions
} from 'react-native';

export default class ChatScreen extends Component {
static navigationOptions = ({navigation}) => ({
    title: 'Chaat',
  });

  render = () => {
     const { navigate } = this.props.navigation;
    return (
      
        <View style={{display:'flex',alignItems:'center'}}>
            <Text>Settings page</Text>
            <Button title="Go back"
             onPress={() => navigate('Flat')} />
        </View>
      
    );
  }
}

 