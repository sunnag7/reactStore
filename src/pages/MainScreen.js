import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import {FormLabel, Header, Card, Button, Rating, ListItem, SearchBar, PricingCard, Badge, Tabs, Icon, Tab, CheckBox } from "react-native-elements";
import ImageSlider from 'react-native-image-slider';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

const itemsPerRow = 2;

const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 

class MainScreen extends Component {

constructor(props) {
  super(props);

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

_keyExtractor = (item, index) => item.Id;

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
    render() {
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

            <ScrollableTabView style={{marginTop: 5, height: 1200, }}>
                   <ScrollView tabLabel='Featured Products'>
                    <FlatList
                      data={this.state.data}
                      numColumns={2}
                      style={{ marginTop: 10 }}
                      keyExtractor={this._keyExtractor}
                      renderItem={this.renderRowItem} />
                   </ScrollView>
                    <ScrollView tabLabel='PH2 Items'><FlatList
                      data={this.state.data}
                      numColumns={2}
                      style={{ marginTop: 10 }}
                      keyExtractor={this._keyExtractor}
                      renderItem={this.renderRowItem} /></ScrollView>
            </ScrollableTabView>
         
        </ScrollView> 
    
        )
    }
 // <Image style={{ height: 150,  width : equalWidth}} source={{ uri: itemData.item.imageUrl }} resizeMode='cover' />
}


const styles = StyleSheet.create({

    scroll: {
    backgroundColor: '#E1D7D8',
    padding: 10,
    flexDirection: 'column',
} ,
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

export default MainScreen