import React, { Component } from 'react';
import {
  View,StyleSheet,ToastAndroid,AsyncStorage,
  Text, Button, ScrollView, Dimensions, FlatList, ActivityIndicator 
} from 'react-native';

import { List, ListItem, SearchBar,Tabs, Tab, Icon, CheckBox} from "react-native-elements";
import { StackNavigator,} from 'react-navigation';

//import { createStore } from 'redux'
//import EmployeeDetails from '../pages/EmployeeDetails';
//import Container from '../components/Container';
 
class ProductList extends Component {
constructor(props) {
  super(props);

  this.state = {
    loading: false,
    data: [],
    page:1,
    seed: 1,
    proda:0,
    prodb:0,
    checked: false, 
    error: null,
    obj:null,
    refreshing: false
  };
}
 
/*static navigationOptions = ({navigation}) => ({
    title: 'Product',
    headerRight: 
       <Icon
         onPress={() => navigation.navigate('Filter',{ data: data } ) }
         name='filter-list'
         color='#000'
         style={{marginRight: 10}}/>,
});*/



async saveItem(item, selectedValue) {
    try {
      ToastAndroid.show(selectedValue+' Added to compare! ' +item, ToastAndroid.SHORT);
      await AsyncStorage.setItem(item, ""+selectedValue);

    } catch (error) {
      //  console.error('AsyncStorage error: ' + error.message);
    }
}

  static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        //alert(JSON.stringify(  params.data ) );
        return {
            title: 'Product',
            headerRight: <Icon
                           onPress={this.userLogout}
                           name='log-out'
                           type='entypo'
                           color='#000'
                           style={{marginRight: 10}}/>,
                         //<Icon
                         //  text='Filter by'
                         //  onPress={() => navigation.navigate('Filter',{ params: params.data } ,) }
                         //  name='filter-list'
                         //  color='#000'
                         //  style={{marginRight: 10}}/>,
        };
  };

componentDidMount() {
    this.makeRemoteRequest();
}

makeRemoteRequest = () => {

  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state;
  const { params } = this.props.navigation.state;
  const Ids = params.ids; 
  
  //const movie = this.state.movies[0]; 
  //http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedProducts 
  
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobileapi/GetProductsByCategory/'+Ids;
  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(res => {
    this.setState({
      data: res,
      loading: false,
    });

   // this.setState({});
   // alert(data);
   //  alert(JSON.stringify(  data ) );
   //this.setState({obj: res.PagingFilteringContext.SpecificationFilter});
   //alert(res.PagingFilteringContext);
   //alert(data);
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
    const {navigation} = this.props;
    const {state} = navigation;
    const { navigate } = this.props.navigation;
    //   return <SearchBar placeholder="Type Here..." lightTheme round />;style={{flexDirection: 'row'}}.SpecificationFilter.NotFilteredItemGroups.SpecificationAttributeGroups
  return (
      <View
        style={{
          paddingVertical: 10,
          borderTopWidth: 1,
          borderColor: "#CED0CE",flexDirection: 'row'
        }}>
        <Text style={{paddingLeft: 20}}>Filter</Text>
          <Icon
              onPress={() => navigate('Filter',{ params: this.state.data.PagingFilteringContext } ) }
              name='filter-list'
              color='#000'
              style={{marginRight: 10}}/>
      </View>);
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

  async toggle(txt) {
    const {navigation} = this.props;
     
    const { navigate } = this.props.navigation;

 // this.setState({ color: '#ff00ff' });
    this.saveItem(this.state.page,txt);
    this.setState({ page: this.state.page + 1 } );

    ToastAndroid.show( txt+' Product Added to compare! ' , ToastAndroid.SHORT);
   
    if ( this.state.page==1) {
      this.setState({ proda: txt } );
      this.setState({ page: this.state.page + 1 } );
    }
    else if ( this.state.page==2){
      this.setState({ page:  0 } );
      this.setState({ prodb: txt }); 
      ToastAndroid.show( this.state.proda+' Product Added to compare! ' , ToastAndroid.SHORT);
      navigate('Compare',{ params:this.state.proda+':'+txt} )
    }
  }

  render() {
    //.SpecificationFilter.NotFilteredItemGroups.SpecificationAttributeGroups
    // 
     if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

// this.props.onPressItem(this.props.Id);
    const {navigation} = this.props;
    const {state} = navigation;
    const { navigate } = this.props.navigation;
    const textColor = this.props.selected ? "red" : "black";

    return (
      <View >

      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> 
        <FlatList
          data={this.state.data.Products}
          renderItem={({ item }) => (
            <ListItem
              button onPress={() => navigate('Employee', { id:item.Id } )}
              //roundAvatar
              title={`${item.Name}`}
              // subtitle={item.Price}
              subtitle={
              <View style={{flexDirection: 'row'}}>
              <Text>£ {item.Price}</Text>
              { /*<CheckBox
                  onPress={this.toggle.bind(this)}
                  center
                  title='Add to compare'/>
              */}
              <Text style={{fontWeight: 'bold',marginLeft: "14%"}}>Add to Cart </Text>
              <Text
                // selected={!!this.state.selected.get(item.Id)}
                style={{fontWeight: 'bold',marginLeft: "14%", }}
                onPress={this.toggle.bind(this, item.Id)}>Compare</Text>
              {/*style={{fontWeight: 'bold',marginLeft: "14%"}}>Compare</Text>*/} 
              </View>
              }
              subtitleContainerStyle={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}
              avatar={{ uri: item.ImageURL }}
              containerStyle={{ borderBottomWidth: 1 }}
            />
          )}
          keyExtractor={item => item.Id}
          extraData={this.state}
          //   ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //   ListFooterComponent={this.renderFooter}
          //onRefresh={this.handleRefresh}
          //refreshing={this.state.refreshing}
          //   onEndReached={this.handleLoadMore}
          onEndReachedThreshold={100}
        />
      </List>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default ProductList;