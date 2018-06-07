import React from 'react';
import {
  View, 
  StyleSheet, 
  FlatList,
  Text,Image,
  ScrollView, 
  Dimensions,
  TextInput
} from 'react-native';

import {
  StackNavigator, DrawerNavigator, DrawerView,TabNavigator
} from 'react-navigation'; 

import { List, ListItem, SearchBar,Tabs, Tab, Icon, CheckBox  } from "react-native-elements";

export default class SearchProducts extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Product',
    headerRight: 
       <Icon
         onPress={() => navigation.navigate('Controler') }
         name='filter-list'
         color='#000'
         style={{marginRight: 10}}/>,
});

constructor(props) {
    super(props);
    this.state = {
    searchparam:null,
    };
}

  /*componentDidMount() {
  
  }*/

render() {

 const { navigate } = this.props.navigation;
    return (
       <View style={styles.layout}>  
          <TextInput
            editable={true}
            onChangeText={(searchparam) => this.setState({searchparam})}
            placeholder='Search products'
            ref='searchparam'
            returnKeyType='next' 
            value={this.state.searchparam}
            secureTextEntry={false}
            style={styles.textInput}
            />
         <Icon
           reverse
           name='search'
           type='evil-icons'
           color='#000'
           onPress={() => navigate('Datas', {search:this.state.searchparam})}
        />
       
    </View>
    );
  }
}


const styles = StyleSheet.create({
 
layout: {
    borderColor: 'gray', 
    borderWidth:1,
    justifyContent: 'center',
    flexDirection:'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
},
box: {
    padding: 20,
    backgroundColor: 'steelblue',
    margin: 5,
},
textInput: {
    flex: 1,
    margin: 5, 
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',  
    height: 40,
},
 
}); 
