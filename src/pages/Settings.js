import React, { Component } from 'react';
import {
  View,StyleSheet,Animated,Text,Image, ScrollView, Dimensions
} from 'react-native'; 
import {FormLabel, Header, Card, Button, Rating , ListItem, SearchBar, PricingCard, Badge } from "react-native-elements";

import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard';
import TopicsLIst from '../pages/TopicsLIst';
import EmployeeDetails from '../pages/EmployeeDetails';

export default class Settings extends Component {
static navigationOptions = ({navigation}) => ({
    title: 'Settings',
  });

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
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }} 
          rightComponent={{ icon: 'home', color: '#fff' }}
          />
        <View style={{display:'flex',alignItems:'center'}}>
            <Text>Settings page</Text>
            <Button title="View List"
              icon={{name: 'envira', type: 'font-awesome'}}
              onPress={() => navigate('Prod')} />    

            <Rating
                type="star"
                ratingCount={5}
                fractions={0}
                startingValue={1.57}
                imageSize={40}
                onFinishRating={this.ratingCompleted}
                showRating
                style={{ paddingVertical: 10 }}
            />
 
            <Badge
              value={3}
              textStyle={{ color: 'orange' }}
            />
            <PricingCard
              color='#4f9deb'
              title='Free'
              price='$0'
              info={['1 User', 'Basic Support', 'All Core Features']}
              button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
              onPress={() => navigate('Prod')}
            />

            <Button title="go to cards"
                  icon={{name: 'envira', type: 'font-awesome'}}
                  onPress={() => navigate('Crd')} />   

              <Button title="go to cards"
                  icon={{name: 'envira', type: 'font-awesome'}}
                  onPress={() => navigate('Employee')} />  

            <Button title="go to animate"
                  icon={{name: 'envira', type: 'font-awesome'}}
                  onPress={() => navigate('Basic')} />   

                  <Button title="go to test"
                  icon={{name: 'envira', type: 'font-awesome'}}
                  onPress={() => navigate('Datas')} />     

            <FormLabel>Name</FormLabel>
        </View>
        </ScrollView>
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