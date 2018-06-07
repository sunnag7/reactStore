import React from 'react';
import { StyleSheet, Text,Image, View, TextInput, ActivityIndicator, ScrollView,Animated } from 'react-native';
import Animation from 'lottie-react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Label from '../components/Label';

import { StackNavigator,} from 'react-navigation';

export default class ForgotPass extends React.Component {
  goBackAAction = () => {
    const {navigation} = this.props;
    const {state} = navigation;
    let refreshFunc = state.refresh;
if(typeof refreshFunc === 'function'){
    refreshFunc();
}
   navigation.goBack();
}

state = {
    isLoading: false,
}

static navigationOptions = {
    title: 'Forgot Password',
};
 
userLogin() {
  //if (!this.state.username || !this.state.password) return;
  const {navigate} = this.props.navigation;
  const email = this.state.email;
  const password = this.state.password;
  const requestBody = `email=${email}&send-email=Recover&__RequestVerificationToken=sfaTQAI1DxJdKG0WV9ZmihnrjYdYrr03rJmF5NiKSzaR4hZSgzudMK6-T4WyoIi1xJXXpVXKjwoAIRhXHE6wea7tCKn8gQTEr89kMY2x30s1`; 
  this.state.password = true;
  fetch('http://www.abs-projects.co.uk/absretailnop/mobilepasswordrecovery', {
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
 .then( this.setState({isLoading: false }))
.then((response) =>  
  response.text()
)
.then((responseText) => {
try {
  let obj = JSON.parse(responseText);
  alert(obj.Result);
  // alert(responseText);
  /*if (obj.Result ==='Success') {
    navigate('Featured');
   
  }
  else{
    alert(obj.Result);
  }*/
 
} catch (ex) {
  console.error(ex);
}
 
 // responseText
})
  .then((responseJson) => {
    // alert(responseJson);
      //  return responseJson;
  })
  .done();
}

  render() {
    const { navigate } = this.props.navigation;
        const {  isLoading} = this.state;

    return (
      <ScrollView style={styles.scroll}>
        
          {isLoading && (
          <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
          />
        )}

      <Container>  
      <Image source={{uri: 'https://www.absbiz.co.uk/Portals/0/Logo.png'}}
          style={{width: 150, height: 60, alignItems: 'center'}} />
      </Container>

      <Container> 
      <Label text="Email" />
          <TextInput
            editable={true}
            onChangeText={(email) => this.setState({email})}
            placeholder='Email'
            ref='email'
            returnKeyType='next' 
            style={styles.textInput}
          />
    </Container>

    <Container>
      <Button 
          onPress={this.userLogin.bind(this)}
          styles={{button: styles.transparentButton}}>
          <View style={styles.inline}>
            <Icon name="user" size={30} color="#3B5699" />
            <Text style={[styles.buttonBlueText, styles.buttonBigText]}> Recover Password </Text> 
         
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