import React, { Component } from 'react';
 
import {
  View,StyleSheet,Animated,Button,
  Text,Image, ScrollView, Dimensions, FlatList, ActivityIndicator 
} from 'react-native'; 
 
import { List, ListItem, SearchBar,Tabs, Tab, Icon  } from "react-native-elements";

import EmployeeDetails from '../pages/EmployeeDetails';

export default class SubSubCategory extends Component {

static navigationOptions = ({navigation}) => ({
    title: 'Sub Category List',
});

constructor(props) {
  super(props);
  this.state = {
    loading: false,
    dataSource: null,
    data: [],
    page:1,
    refreshing: false
  };
}

  _renderHeader(section) {
    return (
      <View >
        <Text fontFamily='Lato-bold'
         style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
         {section.item.Name}</Text>
      </View>
    );
  }

  /*  _renderContent(section) {
    return (
      <View>
        <Text 
         fontFamily='Lato-bold'
         style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
         {section.item.Name}</Text>
      </View>
       );
  }*/

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}>
      <ActivityIndicator animating size="large" />
      </View>
    );
  };

renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  render() {
    const {navigation} = this.props;
    const {state} = navigation;
    const {navigate} = this.props.navigation;
    const data = state.params.subsubcat;
    //alert(JSON.stringify(data));
    return (
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
       
            <ListItem
              button onPress={() => navigate('Produ', {ids:item.Id} )}
              title={`${item.Name}`}
              containerStyle={{ borderBottomWidth: 1 }}
               subtitle={
              <View style={{flexDirection: 'row'}}>
                <Text button onPress={() => navigate('Produ', {ids:item.Id} )}>View Products</Text>
              </View>
             }

             subtitleContainerStyle={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}
                    //    ItemSeparatorComponent={this.renderSeparator}
            />
          )}
          keyExtractor={item => item.Id}/>
      </List>
 
    );
  }
}