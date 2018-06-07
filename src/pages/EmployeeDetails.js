import React, {PropTypes} from 'react';
import {
    View,Text,WebView,ActivityIndicator, Image,ScrollView,TouchableOpacity,StyleSheet,Dimensions,AsyncStorage,Alert
} from 'react-native';
import { List, ListItem, SearchBar,Tabs, Tab, Icon  } from "react-native-elements";

import ImageSlider from 'react-native-image-slider';
import ScrollableTabView  from 'react-native-scrollable-tab-view';

//const { width, height } = Dimensions.get("window");

//const CARD_HEIGHT = height / 2;
const { width, height } = Dimensions.get('window');

const equalWidth =  (width / 2 ) 

export default class EmployeeDetails extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    loading: false,
    data: [],
    imagesArr:[],
    page:1,
    seed: 1,
    error: null,
    productName: null, 
    prPrice: null,
    prUrl: null, 
    prID: null,
    description: null,
    specification: null,
    keyfeatures: null,
    whatsinbox: null,
    refreshing: false
  };
}

static navigationOptions = ({navigation}) => {
        // const {params = {}} = navigation.state;
        // alert(JSON.stringify(  params.data ) );
        // const { navigate } = this.props.navigation;//{() => {AsyncStorage.removeItem('id_token'),
        return {
            title: 'Product Details',
            headerRight: <Icon
                           onPress={this.userLogout}
                           name='log-out'
                           type='entypo'
                           color='#000'
                           style={{marginRight: 10}}/>,
        };
};

 
componentDidMount() {
    this.makeRemoteRequest();
}

   userLogout() {
   // const { navigate } = ;
    // try {
      AsyncStorage.removeItem('id_token');
      //Alert.alert('Logout Success!');
     // Actions.Authentication();
        this.props.navigation('Main');
    // } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    // }
    } 

makeRemoteRequest = () => {
  const { navigate } = this.props.navigation;
  const { page, seed } = this.state;
  const { selectedTab } = this.state
  const { params } = this.props.navigation.state;
  const Ids = params.id;
  //const movie = this.state.movies[0]; http://www.abs-projects.co.uk/absretailnop/mobileapi/GetFeaturedProducts 
  const url = 'http://www.abs-projects.co.uk/absretailnop/mobileapi/GetProductByID/'+Ids;

  this.setState({ loading: true});
  fetch(url)
  .then(res => res.json())
  .then(res => {

  //alert(JSON.stringify(res.Gallery));
 
  this.setState({data: res});
  this.setState({productName: res.Name});
  this.setState({prPrice: res.NewPrice});
  this.setState({prUrl: res.PictureUrl});
  this.setState({prID: Ids});
  this.setState({imagesArr: res.Gallery});
  this.setState({description: res.MarketDescription});
  this.setState({keyfeatures: res.KeyFeatures});
  this.setState({whatsinbox: res.WhatsInTheBox});
  this.setState({specification: res.ProductSpecs});
  this.setState({ loading: false});
  /*this.setState({data: page === 1 ? res.results : [...this.state.data, ...res.results],
      error: res.error || null,
      loading: false,
      refreshing: false 
  });*/
  })
  .then((response) =>  
  response.text()
)
.then((responseText) => {
//alert(responseText);
try {
  let obj = JSON.parse(responseText);
  
  if (obj.Result ==='Success') {
        navigate('Datas');
       // alert(responseText);
  }
  else{
 alert(obj.Result);
  }
 
} catch (ex) {
  console.error(ex);
}
 // responseText
})
.catch(error => {
     this.setState({ error, loading: false });
  });
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

    // Extract values from movie object
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const prd = this.props.productName;
    const imgA = this.props.imagesArr;
    //alert( this.state.imagesArr);
    const imgUrlsArr = this.state.imagesArr.map(function(item) {
    return item.ImageURL;      
    });
   // alert(JSON.stringify(imgUrlsArr));ImageURL ThumbnailURL
    return (
      <View style={styles.container}>
        {/* Background image with large image */}
        <View  style={styles.imageBackground}>
          {/* Use ScrollView in case plot is too large to fit on the screen */}
          <ScrollView
            style={{flex: 1}}>
          
            <View style={styles.rating}>
              {/* Icon */}
                <ImageSlider
                    height={300}
                    resizeMode='cover'
                    style={{ height: 150 , width : width }}
                    images={imgUrlsArr} />
              {/*  <Image
                source={{uri: `${this.state.prUrl}`}}
                style={{ flex: 1, aspectRatio: 1.5, resizeMode: 'contain', }}
              />Value  <Text style={[styles.text, styles.value]}>rating</Text>*/}
            </View>
              {/* Title */}
            <Text style={[styles.text, styles.title]}>{this.state.productName}</Text> 
            {/* Plot */}
            <View style={styles.plot}>
              <Text style={styles.plotText}>Price: £ {this.state.prPrice}</Text>
              <Text style={[styles.plotText, styles.value]}>Description: {this.state.description}</Text>
            </View>
            {/* Rating */}
             <ScrollableTabView style={{marginTop: 5, height: 500,}}>
                 <WebView tabLabel='Specifications' source={{html: this.state.specification }} />
                 {/* <Text tabLabel='SPECIFICATIONS'> {this.state.description} </Text>*/ } 
                 <WebView tabLabel='Whats in the box' source={{html: this.state.whatsinbox }} />
                 <WebView tabLabel='Product features' source={{html: this.state.keyfeatures }} />
                 { /*  <Text tabLabel='WHATS IN THE BOX'>{this.state.whatsinbox} </Text>
                    <Text tabLabel='PRODUCT FEATURES'>{this.state.keyfeatures} </Text>*/ }
            </ScrollableTabView>
            { /*<View style={styles.plot}>
              <Text style={styles.plotText}>Descp: {this.state.prdesc}</Text>
            </View>*/}
          </ScrollView>
          {/* Button container */}
          <View style={styles.buttonContainer}>
            {/* Press handler */}
            <TouchableOpacity
              // Go to the previous screen
              //  onPress={() => {this.props.navigator.pop();}}
               onPress={() => navigate('Main')}
              // Dim button a little bit when pressed
              activeOpacity={0.7}
              // Pass button style
              style={styles.button}>
              <Text style={styles.buttonText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,                            // Take up all screen space
    backgroundColor: '#333',            // Dark background
  },
  // Background image
  imageBackground: {
    flex: 1,     
    backgroundColor: '#fff',                         // Take up all screen space
    padding: 10                         // Add padding for content inside
  },
  text: {
    backgroundColor: 'transparent',     // No background
    color: '#000',                      // White text color
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    // Add text shadow
 //   textShadowColor: '#222',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  title: {
    fontSize: 22,                       // Bigger font size
    marginTop: 30,                      // Add space between top screen edge
    marginBottom: 5,                    // Add space at the bottom
    textAlign: 'center',                // Center horizontally
  },
  rating: {
    flexDirection: 'row',               // Arrange icon and rating in one line
    justifyContent: 'center',           // Center horizontally
  },
  icon: {
    width: 22,                          // Set width
    height: 22,                         // Set height
    marginRight: 5,                     // Add some margin between icon and rating
  },
  value: {
    fontSize: 16,                       // Smaller font size
  },
  plot: {
    backgroundColor: 'rgba(255,255,255,0.5)', // Semi-transparent white background
    borderRadius: 10,                   // Rounder corners
    marginTop: 10,                      // Margin at the top
    padding: 10,                        // Padding for content inside
  },
  plotText: {
    color: '#333',                      // Dark text color
    fontFamily: 'Avenir',               // Change default font
    fontSize: 15,                       // Small font size
  },
  buttonContainer: {
    marginTop: 0,                      // Add some margin at the top
  },
  button: {
    backgroundColor: '#617D8A',         // Color the button
    padding: 15                         // Padding inside
  },
  buttonText: {
    color: '#fff',                      // White button text
    fontFamily: 'Avenir',               // Change default font
    fontWeight: 'bold',                 // Bold font
    textAlign: 'center',                // Center horizontally
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});