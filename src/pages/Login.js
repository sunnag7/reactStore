import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,Image,
  View,AsyncStorage,
  TextInput,ActivityIndicator,
  ScrollView,Animated,Alert
} from 'react-native';
 
import {
  StackNavigator,
} from 'react-navigation';

import FlatListDemo from '../pages/FlatListDemo';
import FeaturedList from '../pages/FeaturedList';
import Settings from '../pages/Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';
import SignUp from '../pages/SignUp';
import ForgotPass from '../pages/ForgotPass';

export default class Login extends Component {

constructor() {
    super();
    this.state = {hasToken: false, email: null, password: null, showProgress: false, isLoaded: false};
  }

static navigationOptions = {
    title: 'Welcome',
};

goBackAAction = () => {
    const {navigation} = this.props;
    const {state} = navigation;
    let refreshFunc = state.refresh;
    if(typeof refreshFunc === 'function'){
        refreshFunc();
    }
    navigation.goBack();
}

componentWillMount() {
    const {navigate} = this.props.navigation;
    /*if (this.state.isLoaded) {
      navigate('Featured');
    }*/
}

componentDidMount() {
    const {navigate} = this.props.navigation;

    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  
    if (!this.state.isLoaded) {
      navigate('MyHomeScreen');
    }
    else{
      navigate('Sign');
    } 
    //alert(this.state.isLoaded);
    if (this.state.hasToken === null) {
      navigate('Sign');
    }
    else
      navigate('MyHomeScreen');
}

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
}

userLogin() {
  //if (!this.state.username || !this.state.password) return;
  const {navigate} = this.props.navigation;
  const email = this.state.email;
  const password = this.state.password;
  const requestBody = `email=${email}&password=${password}`; 
  this.state.password = true;
  fetch('http://www.abs-projects.co.uk/absretailnop/mobilelogin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
//    body: JSON.stringify({
//    email: this.state.email,
//    password: this.state.password,
body:requestBody
//  })
})
.then((response) =>  
  response.text()
)
.then((responseText) => {

try {
  let obj = JSON.parse(responseText);
  
  if (obj.Result ==='Success') {
    //alert(obj.Token);
    this.saveItem('id_token', obj.Token);
    navigate('Featured');
  }
  else{
    alert(obj.Result);
    navigate('Sign');
  }
 
} catch (ex) {
  console.error(ex);
}
 
 // responseText
})
  .then((responseJson) => {
  // alert(responseJson);
  //  return responseJson;
})
  // this.saveItem('id_token', responseData.id_token),
  // Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
  // Actions.HomePage();
  // alert( responseData._bodyText );
  // alert(JSON.stringify(responseData));
  //})
  .done();

/*.then((response) => {
  alert(JSON.stringify(response._bodyText));
  alert(response._bodyText);
})
.then((responseData) => {
    //this.saveItem('id_token', responseData.id_token),
  //  Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
    //Actions.HomePage();
  // alert( responseData._bodyText );
    alert(JSON.stringify(responseData));
})
  .done();*/
 /* if (!this.state.username || !this.state.password) return;
  // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
  fetch('http://www.abs-projects.co.uk/absretailnop/mobilelogin', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
  })
  .then((response) => response.json())
  .then((responseData) => {
    //this.saveItem('id_token', responseData.id_token),
    Alert.alert('Login Success!', 'Click the button to get a Chuck Norris quote!'),
    //Actions.HomePage();
      alert(responseData);

  })
  .done();*/
}
//onPress={() => navigate('Settings', { name: 'Jane' })}/>
render() {
	const { navigate } = this.props.navigation;

/*if (this.state.isLoaded) {
  navigate('Featured');
}*/
    return (
        <ScrollView style={styles.scroll}>
        
       	<Container>  
    
        <Image source={{uri: 'https://www.absbiz.co.uk/Portals/0/Logo.png'}}
         	style={{width: 140 , height: 60}} />

		</Container>
		<Container> 
    	<Label text="Username or Email" />
    	<TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Username'
            ref='email'
            returnKeyType='next' 
            value={this.state.email}
        	  style={styles.textInput}/>
		</Container>
		<Container>
    	<Label text="Password" />
    	<TextInput
        	 editable={true}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            ref='password'
            returnKeyType='next'
            secureTextEntry={true} 
            value={this.state.password}
        	  style={styles.textInput}/>
		</Container>
		<Container>
    	
 			<Button
	       label="Sign In"
	       styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
         onPress={this.userLogin.bind(this)}/>
	   		 
    	<Button
		    label="Forgot Login/Pass"
		    styles={{button: styles.alignRight, label: styles.label}} 
		   onPress={() => navigate('Forgot' )} />
		</Container>
		<View style={styles.footer}>

	    <Container>

	    <Button 
        	styles={{button: styles.transparentButton}}
        	onPress={() => navigate('Sign')}>
        	<View style={styles.inline}>
            <Icon name="user" size={30} color="#3B5699" />
            <Text style={[styles.buttonBlueText, styles.buttonBigText]}> Sign Up </Text> 
           
        	</View>
    	</Button>
	       
	    </Container>
	    <Container>
	        <Button 
	            label="CANCEL"
	            styles={{label: styles.buttonBlackText}} 
	            onPress={this.goBackAAction }/>
	    </Container>
		  </View> 
      <ActivityIndicator animating={this.state.showProgress} size="large"/>

      </ScrollView>
    );

  }
}

const AppNavigator = StackNavigator({
  First: {
    screen: Settings,
  },
  Datas: {
    screen: FlatListDemo,
  },
});


const styles = StyleSheet.create({
 scroll: {
    backgroundColor: '#ffffff',
    padding: 30,
    flexDirection: 'column',
},
label: {
    color: '#0d8898',
    fontSize: 18,
},
alignRight: {
    alignSelf: 'flex-end',
},
textInput: {
    height: 60,
    fontSize: 18,
    backgroundColor: '#FFF',
},
transparentButton: {
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2,
},
buttonBlueText: {
    fontSize: 20,
    color: '#3B5699',
},
buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold',
},
inline: {
    flexDirection: 'row',
},
buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
},
buttonBlackText: {
    fontSize: 20,
    color: '#595856',
},
primaryButton: {
    backgroundColor: '#34A853',
},
footer: {
   marginTop: 10,
}
}); 