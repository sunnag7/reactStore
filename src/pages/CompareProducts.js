import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, Text,Image, ScrollView, 
  Dimensions,
  TextInput
} from 'react-native';

import {
  StackNavigator, DrawerNavigator, DrawerView,TabNavigator
} from 'react-navigation'; 

import {FormLabel, Header, Card, Button, Rating, ListItem, SearchBar, PricingCard, Badge, Icon, Tabs, Tab, CheckBox } from "react-native-elements";

import GridView from 'react-native-gridview';
import Drawer from 'react-native-drawer'
import ControlPanel from '../pages/ControlPanel';
import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard'; 
import EmployeeDetails from '../pages/EmployeeDetails';
import DrawerComponent from '../pages/DrawerComponent';
import Settings from '../pages/Settings';
import * as css from "../pages/Styles";
import Container from '../components/Container';
import Label from '../components/Label';

const itemsPerRow = 2;

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 
// Use data from an array... 

export default class CompareProducts extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Comparison',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: null,
      page:1,
      data:[],
      refreshing: false
    };
  }

 renderRowItem = (itemData) => {

    const { navigate } = this.props.navigation;
     return (
         <View style={styles.listItem}>
            <Card
              title={itemData.item.Name}>
              <Image
                style={{ height: 100, width : equalWidth, alignItems: 'center', alignSelf: 'stretch',
                width: undefined}} 
                resizeMode="contain"
                source={{ uri: itemData.item.DefaultPictureModel.ImageUrl }}/>
              <Text
                fontFamily='Lato-bold'
                style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
                 {itemData.item.ProductPrice.Price}
              </Text>
                <Text
                fontFamily='Lato-bold'
                style={{ alignItems: 'center', borderRadius: 0, marginTop: 10, marginRight: 0, marginBottom: 0}}>
                 {itemData.item.FullDescription}
              </Text>
              {/* <Text
                fontFamily='Lato'
                style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
                 {itemData.item.FullDescription}
              </Text>
              <Text
                fontFamily='Lato-bold'
                style={{ alignItems: 'center', borderRadius: 0, marginLeft: 5, marginRight: 0, marginTop: 10}}>
                 {itemData.item.FullDescription}
              </Text>*/}
              <FlatList
                data= {itemData.item.SpecificationAttributeModels}
                renderItem={({items}) => <ListItem title={items.SpecificationAttributeName} />}
              />
              <Button
                icon={{name: 'bookmark'}}
                backgroundColor='#febe36'
                onPress={() => navigate('Employee', { id:itemData.item.Id })}
                fontFamily='Lato-bold'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
                title='VIEW' />
            </Card>
          </View>
    );
}

 _keyExtractor = (item, index) => item.Id;

componentDidMount() {
  //alert( JSON.stringify( this.props.navigation.state.params )  );
  this.makeRemoteRequest();
  /*this.setState({ 
    data: this.props.navigation.state.params 
  });*/
}

makeRemoteRequest = () => {
  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state;
  const { params } = this.props.navigation.state;
  const Ids = params.params;
  //const data = this.state.data[0];
  // 
  //alert( JSON.stringify( this.props.navigation.state.params )  );
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobilecompareproducts/?q='+Ids; 
  //alert(url);
  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(respJson => { 
    //alert( JSON.stringify(respJson));
    this.setState({data: respJson}) ;  
  })
  .catch(error => {
     this.setState({ error, loading: false });
  });
};

  render() {
    //const {navigation} = this.props;
    //const {state} = navigation;
    //const { navigate } = this.props.navigation;
    //const datas = state.params.data; //this.props.navigation.state.params.user.name. 
    //this.state(this.state.data)
    //alert(this.state.data);
     return (
      <View>
        <FlatList
          data={this.state.data.Products}
          numColumns={2}
          renderItem={this.renderRowItem}
          keyExtractor={this._keyExtractor} />
      </View> 
    );
  }
}


const styles = StyleSheet.create({
scroll: {
    backgroundColor: '#E1D7D8',
    padding: 10,
    flexDirection: 'column',
} ,
container: {
    //flex: 1,
    alignItems: 'center',
    //  marginBottom: 10,
    // backgroundColor: '#F5FCFF',
    // flexDirection: 'column'
},
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
listItem: {
    maxWidth: Dimensions.get('window').width /2,
    flex:0.5,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 4,
},
}); 