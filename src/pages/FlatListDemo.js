import React, { Component } from 'react';
import {
  View,StyleSheet,
  Text, Button, ScrollView, Dimensions, FlatList, ActivityIndicator 
} from 'react-native';

import { List, ListItem, SearchBar,Tabs, Tab, Icon  } from "react-native-elements";

import {
  StackNavigator,
} from 'react-navigation';

import EmployeeDetails from '../pages/EmployeeDetails';

class FlatListDemo extends Component {
constructor(props) {
  super(props);

  this.state = {
    loading: false,
    data: [],
    page:1,
    seed: 1,
    error: null,
    refreshing: false
  };
}
 
static navigationOptions = ({navigation}) => ({
    title: 'Featured Product',
});

componentDidMount() {
    this.makeRemoteRequest();
}

makeRemoteRequest = () => {
  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state;

  const { params } = this.props.navigation.state;
  const Ids = params.search;
  //const movie = this.state.movies[0]; http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedProducts 
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobilesearch?q='+Ids;
  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(res => {
//  alert(res);
  this.setState({data: res});
  /*this.setState({data: page === 1 ? res.results : [...this.state.data, ...res.results],
      error: res.error || null,
       loading: false,
          refreshing: false 
  });*/
  })
  .catch(error => {
     this.setState({ error, loading: false });
  });
};

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

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
        }}
      >
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
    const { navigate } = this.props.navigation;

    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data.Products}
          renderItem={({ item }) => (
       
            <ListItem
              button onPress={() => navigate('Employee', { id:item.Id } )}
              roundAvatar
              title={`${item.Name}`}
              subtitle= {item.Price}
              avatar={{ uri: item.Image_url }}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.Id}
          ItemSeparatorComponent={this.renderSeparator}
       //   ListHeaderComponent={this.renderHeader}
        //  ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={100}
        />
      </List>
    );
  }
}

export default FlatListDemo;