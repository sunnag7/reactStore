import React, { Component } from 'react';
import {
  View,StyleSheet,
  Text,Image, ScrollView, Dimensions
} from 'react-native';

import {FormLabel, Header, Card, Button, Rating , ListItem, SearchBar, PricingCard, Badge } from "react-native-elements";
import GridView from 'react-native-gridview';
import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard'; 

const itemsPerRow = 2;
 
// Use data from an array... 
const data = Array(20)
  .fill(null)
  .map((item, index) => index + 1);
 
// ...or create your own data source. 
// This will randomly allocate 1-3 items per row, and will be used 
// if the `randomizeRows` prop is `true`. 

// <View style={{ flex: 1, backgroundColor: '#8F8', borderWidth: 1 }}>
//            <Text>{`${item} (${sectionID}-${rowID}-${itemIndex}-${itemID})`}</Text>
 //         </View>

const randomData = [];
for (let i = 0; i < data.length; i) {
  const endIndex = Math.max(Math.round(Math.random() * itemsPerRow), 1) + i;
  randomData.push(data.slice(i, endIndex));
  i = endIndex;
}
const dataSource = new GridView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
}).cloneWithRows(randomData);
 
export default class TopicsLIst extends Component {
static navigationOptions = ({navigation}) => ({
    title: 'Products',
  });

render = () => {
  
const { navigate } = this.props.navigation;
const users = [  {
                        name: 'brynn',
                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                     },
                      {
                        name: 'brynn',
                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
                     }, ];
    return (
      <GridView
      data={data}
      dataSource={this.props.randomizeRows ? dataSource : null}
      itemsPerRow={itemsPerRow}
      renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
        return (
          <View  >
            <Card
              title='MAC BOOK'
              image={require('../images/mac.jpg')}>
              <Text style={{marginBottom: 10}}>
                Apple MacBook Pro with Touch Bar - 15.4" 
              </Text>
              <Button
                icon={{name: 'shopping-cart'}}
                backgroundColor='#03A9F4'
                fontFamily='Lato'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='VIEW' />
            </Card>
          </View>
        );
      }}
    />
    );
  }
}

const styles = StyleSheet.create({
 scroll: {
    backgroundColor: '#E1D7D8',
    padding: 30,
    flexDirection: 'column',
} 
}); 