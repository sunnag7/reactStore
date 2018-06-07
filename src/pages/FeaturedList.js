import React, { Component } from 'react';
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
 
//import Icon from "react-native-vector-icons/FontAwesome";
import {FormLabel, Header, Card, Button, Rating, ListItem, SearchBar, PricingCard, Badge, Tabs, Icon, Tab, CheckBox } from "react-native-elements";
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
import ImageSlider from 'react-native-image-slider';

const itemsPerRow = 2;

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 
// Use data from an array... 
 
export default class FeaturedList extends Component {

  toggleSearch() {
        this.setState({
            showSearch: !this.state.showSearch
        });
  }

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

navigates() {
    this.props.navigation.navigate('Controler'); // open drawer
}

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

constructor(props) {
  super(props);
  this.openDrawer = this.openDrawer.bind(this);
  this.closeDrawer = this.closeDrawer.bind(this);

  this.state = {
    loading: false,
    dataSource: null,
    data: [],
    page:1,
    moviesList: [],
    searchparam:null,
    seed: 1,
    error: null,
    showSearch: false,
    checked: false, 
    refreshing: false
  };
}

renderSearch(){
      if (this.state.showSearch) {
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
       
      </View> );
        } else {
            return null;
        }
}

submitStatus = () => {
    // logic for right button on click
}

componentDidMount() {
  this.props.navigation.setParams({ handleSubmit: this.submitStatus });
}

toggle() {
   this.setState({checked: !this.state.checked});
   this.state.firstproduct
}

_keyExtractor = (item, index) => item.Id;
 // <Image style={{ height: 150,  width : equalWidth}} source={{ uri: itemData.item.imageUrl }} resizeMode='cover' />
renderRowItem = (itemData) => {
//alert(JSON.stringify(itemData));
 const { navigate } = this.props.navigation;
    return (
  
          <View style={styles.listItem}>
            <Card
              title={itemData.item.Name}>
              <Image
                style={{ height: 100, width : equalWidth, alignItems: 'center', alignSelf: 'stretch',
                width: undefined}} 
                resizeMode="contain"
                source={{ uri: itemData.item.Image_url }}/>
              <Text
                fontFamily='Lato-bold'
                style={{ alignItems: 'center', borderRadius: 0, marginLeft: 40, marginRight: 0, marginBottom: 0}}>
                £ {itemData.item.Price}
              </Text>
              <Button
                icon={{name: 'bookmark'}}
                backgroundColor='#febe36'
                onPress={() => navigate('Employee', { id:itemData.item.Id } )}
                fontFamily='Lato-bold'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}}
                title='VIEW' />
            </Card>
          </View>
    );
}

componentDidMount() {
  this.makeRemoteRequest();
}

makeRemoteRequest = () => {
  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state;
  //const data = this.state.data[0];
  // http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedProducts 
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedproducts';
  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(respJson => { 
    // alert(JSON.stringify(res))
    this.setState({data: respJson})   
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

render = () => {
  const { navigate } = this.props.navigation;
  const dataVal = this.state.data;
  const drawerMethods = {
        openDrawer: this.openDrawer,
        closeDrawer: this.closeDrawer,
};

//iterate through object keys
/* <SearchBar
      lightTheme
      onChangeText={this.handleRefresh}
      placeholder='Search products...' />*/

return ( 
       
    <ScrollView
            style={{flex: 1}}>

               {/* Icon */}
                <ImageSlider
                  height={200}
                  resizeMode='cover'
                  images={[
                      'http://cdn.cnetcontent.com/2c/69/2c69e400-be73-4334-b521-b6c618d770fa.jpg',
                      'http://cdn.cnetcontent.com/07/63/0763a146-f2f0-42db-89e3-dafea5c184e5.jpg',
                      'http://cdn.cnetcontent.com/fa/20/fa20d6db-7220-47cc-b555-42b9f60b6ba9.jpg',
                  ]} />
              {/*  <Image
                source={{uri: `${this.state.prUrl}`}}                                                     
                resizeMode="contain"
                style={{ flex: 1, aspectRatio: 1.5, resizeMode: 'contain', }}
              />Value  <Text style={[styles.text, styles.value]}>rating</Text>*/}
           
    {/* <View style={styles.layout}> // {this.state.renderSearch()} 
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
       
    </View>*/}
 
    {/*    <Container>
   
        <TextInput
            editable={true}
            onChangeText={(searchparam) => this.setState({searchparam})}
            placeholder='Search products'
            ref='searchparam'
            returnKeyType='next' 
            value={this.state.searchparam}
            secureTextEntry={false}
            style={styles.textInput}/>

            <Button
              icon={{name: 'search'}} 
              onPress={() => navigate('Datas', {search:this.state.searchparam})}
              lightTheme
              title='GO' />
    </Container>
*/}
    {/*   <Button
          icon={{name: 'list'}} 
          onPress={() => navigate('Controler')}
          lightTheme
          title='Category' />*/}

        <FlatList
          data={this.state.data}
          numColumns={2}
          style={{  marginTop: 10 }}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem} />
    </ScrollView> 
   
    );
  }
}

const nav_drawer = DrawerNavigator(
  // route config
  {
    HomeRoute: {
      screen: FeaturedList,
      navigationOptions: {
        drawerLabel: 'Main App',
        drawerIcon: ({tintColor}) => <Icon name="wb-sunny" color={tintColor}/>,
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        drawerLabel: 'Settings',
        drawerIcon: ({tintColor}) => <Icon name="settings" color={tintColor}/>,
      }
    },
  },
  // navigator config
  {
   // initialRouteName:''
    contentComponent: customComponent,
    drawerPosition: 'left',
    // styling for for DrawerView.Items in contentOptions
    contentOptions: css.drawer
  }
);

const customComponent = (props) => (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: css.drawer.style.backgroundColor,
    }}>
    <DrawerView.Items {...props} />
  </ScrollView>
);

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