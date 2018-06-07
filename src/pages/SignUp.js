import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,Image,
  View,
  TextInput,
  ScrollView,Animated
} from 'react-native';
 
import {
  StackNavigator,
} from 'react-navigation';

import { CheckBox } from 'react-native-elements'

import Settings from '../pages/Settings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

export default class SignUp extends Component {
 constructor(props) {
        super(props);
        this.state = {
            checked: false, email: null, password: null , fname:null, lname: null, policy:null, 
        }
    }

goBackAAction = () => {
    const {navigation} = this.props;
    const {state} = navigation;
    let refreshFunc = state.refresh;

    if(typeof refreshFunc === 'function'){
        refreshFunc();
    }
       navigation.goBack();
}

static navigationOptions = {
    title: 'REGISTER',
};

toggle() {
   this.setState({checked: !this.state.checked});
}

userRegister() {
  if (!this.state.checked) return;
  const {navigate} = this.props.navigation;
  const email = this.state.email;
  const password = this.state.password;
  const lname = this.state.lname;
  const fname = this.state.fname;
 
  const requestBody = `email=${email}&Password=${password}&ConfirmPassword=${password}&FirstName=${fname}&LastName=${lname}&accept-privacy-policy=on&register-button=MobileRegister`; 
  this.state.password = true;
  fetch('http://www.abs-projects.co.uk/absretailnop/mobileregister', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }, 
 body:requestBody
//  })
})
.then((response) =>  
  response.text()
)
.then((responseText) => {

try {
  //alert(responseText);
  let obj = JSON.parse(responseText);
  //alert(obj.Result);
  if (obj.ResultCode ===1) {
    navigate('Featured');
   // alert(JSON.stringify(obj.Result));
  }
  else{
    alert(obj.Result);
  }
   // navigate('Featured');
} catch (ex) {
  console.error(ex);
}
 
 // responseText
})
  .then((responseJson) => {
    
  })
 
  .done();
}

render() {
	  const { navigate } = this.props.navigation;
    return (
    <ScrollView style={styles.scroll}>
        
      <Container>  
      <Image source={{uri: 'https://www.absbiz.co.uk/Portals/0/Logo.png'}}
         	style={{width: 140, height: 60}} />
		  </Container>

    <Container>
      <Label text="First name" />
      <TextInput
           editable={true}
           onChangeText={(fname) => this.setState({fname})}
           placeholder='First name'
           ref='fname'
           returnKeyType='next' 
           value={this.state.fname}
           secureTextEntry={false}
           style={styles.textInput}/>
    </Container>

    <Container>
      <Label text="Last name" />
      <TextInput
          editable={true}
          onChangeText={(lname) => this.setState({lname})}
          placeholder='Last name'
          ref='lname'
          returnKeyType='next' 
          value={this.state.lname}
          secureTextEntry={false}
          style={styles.textInput}/>
    </Container>

		<Container> 
    	<Label text="Email" />
    	<TextInput
          editable={true}
          onChangeText={(email) => this.setState({email})}
          placeholder='Email'
          ref='email'
          returnKeyType='next' 
          value={this.state.email}
          style={styles.textInput}/>
		</Container>

    <Container>
      <Label text="Password" />
      <TextInput
          placeholder='Password'
          secureTextEntry={true}
          style={styles.textInput}/>
    </Container>
    <Container>
      <Label text="Confirm Password" />
      <TextInput
        editable={true}
        onChangeText={(password) => this.setState({password})}
        placeholder='Confirm Password'
        ref='password'
        returnKeyType='next'
        value={this.state.password}
        secureTextEntry={true}
        style={styles.textInput}/>

    </Container>
    <Container>
        <CheckBox
          onPress={this.toggle.bind(this)}
          center
          title='I accept privacy policy.'
          checked={this.state.checked}
        />
    </Container>

    <Container>
    	<Button 
        onPress={this.userRegister.bind(this)}
        styles={{button: styles.transparentButton}}>
        	<View style={styles.inline}>
            <Icon name="user" size={30} color="#3B5699" />
            <Text style={[styles.buttonBlueText, styles.buttonBigText]}> Sign Up </Text> 
         	</View>
    	</Button>
		</Container>
		<View style={styles.footer}>
	   
	  <Container>
	    <Button 
	      label="CANCEL"
	      styles={{label: styles.buttonBlackText}} 
	      onPress={this.goBackAAction } />
	  </Container>
		</View>

  </ScrollView>
    );
  }
}

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
   marginTop: 40,
}
}); 