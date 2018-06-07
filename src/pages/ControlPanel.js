import React, { Component } from 'react';
 
import {
  View,StyleSheet,Animated,Button,
  Text,Image, ScrollView, Dimensions, FlatList, ActivityIndicator 
} from 'react-native'; 
 
import { List, ListItem, SearchBar,Tabs, Tab, Icon  } from "react-native-elements";
import EmployeeDetails from '../pages/EmployeeDetails';
import SubCategory from '../pages/SubCategory';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

export default class ControlPanel extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Product Category',
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

componentDidMount() {
    this.makeRemoteRequest();
}

makeRemoteRequest = () => {
   
  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state;

  //const data = this.state.data[0];
  //http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedProducts 
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobileapi/Getcategories/0';
  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(respJson => { 
    this.setState({loading: false}) ;  
    this.setState({data: respJson}) ;  
  })
  .catch(error => {
     this.setState({ error, loading: false });
  });
};

  _renderHeader(section) {
    return (
      <View >
        <Text fontFamily='Lato-bold'
         style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
         {section.item.Name}</Text>
      </View>
    );
  }

  /*_renderContent(section) {
    return (
      <View>
        <Text 
         fontFamily='Lato-bold'
         style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
         {section.item.Name}</Text>
      </View>
    );
  }*/

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
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

    const {navigation} = this.props;
    const {state} = navigation;
    const { navigate } = this.props.navigation;

    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data.Categories}
          renderItem={({ item }) => (
       
      /*  <View style={styles.layout}>
          <Text >
         {item.Name} 
          </Text>
          <Button
              icon={{name: 'search'}} 
              button onPress={() => navigate('SubCat', { subcat:item.SubCategories })}
              lightTheme
              title='GO' />
        /* <Image source={require('../images/stars.png')} style={{height: 19.21, width: 150}}/>
        </View>*/

            <ListItem
              button onPress={() => navigate('SubCat', { subcat:item.SubCategories })}
              title={`${item.Name}`}
              containerStyle={{ borderBottomWidth: 1 }}
              subtitle={
              <View style={{flexDirection: 'row'}}>
                   <Text button onPress={() => navigate('Produ', {ids:item.Id} )}>View Products</Text>
              </View>
             }

             subtitleContainerStyle={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}
            />

          )}
          keyExtractor={item => item.Id}
          //ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
          //refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>

     /* <Accordion
        sections={this.state.data}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />*/
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  layout: {
    justifyContent: 'center',
    flexDirection:'row', 
},
});