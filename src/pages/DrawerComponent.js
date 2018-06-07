import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 
 class DrawerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.pressLink = this.pressLink.bind(this);
  }

  closeDrawer() {
    this.props.drawerMethods.closeDrawer();
  }

  pressLink(screen) {
    this.props.navigate(screen);
    this.props.drawerMethods.closeDrawer();
  }

  render() {
    return (
      <View >
        <TouchableOpacity  onPress={this.closeDrawer}>
          <Text>x</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => this.pressLink('Home')}>
            <Text >Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.pressLink('About')}>
            <Text >About</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
 