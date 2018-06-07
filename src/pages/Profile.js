import React, { Component } from 'react';
import {
  View,StyleSheet,Animated,Text,Image, ScrollView, Dimensions
} from 'react-native'; 
import {Avatar,FormLabel, Header, Card, Button, Rating ,Icon, ListItem, SearchBar, PricingCard, Badge } from "react-native-elements";

import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard';
import TopicsLIst from '../pages/TopicsLIst';
import EmployeeDetails from '../pages/EmployeeDetails';

export default class Profile extends Component {
 static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const { navigate } = params;
    return {
      title: 'ABS Retail',
      headerLeft:
          <Icon 
            onPress={() => navigation.navigate('Controler') }
            name= "search"
            type='evil-icons'
            style={{marginLeft: 16}} />,

      headerRight: 
  
      <Icon
        name='search'
        type='evil-icons'
        color='#000'
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('Search')}
        />,
    };
  };


 constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(5),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start();
  }

render = () => {
     const { navigate } = this.props.navigation;
     const users = [
                     {
                        name: 'brynn',
                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                     },
                     {
                        name: 'brynn',
                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                     },
                   ];
    return (
      <ScrollView style={styles.scroll}>
     
      <View
        style={{ flexDirection: 'row',marginLeft: 10, justifyContent: 'center', alignItems: 'center',}}>
        <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={{marginLeft: 10, justifyContent: 'center', alignItems: 'center',}}>
          User name        </Text>
        </View>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
 scroll: {
     padding: 0,
     marginLeft: 10,marginRight:10, marginBottom:10,marginTop:10,
    flexDirection: 'column',
} 
});