import React from 'react';
import { FlatList, View , ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar,Tabs, Tab, Icon } from "react-native-elements";

export default class FilterProducts extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Product filter',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: null,
      page:1,
      data:[],
      refreshing: false
    };
  }

  componentDidMount() {
      //alert( JSON.stringify( this.props.navigation.state.params )  );
    this.setState({ 
      data: this.props.navigation.state.params 
    });
  }

  render() {
    //const {navigation} = this.props;
    //const {state} = navigation;
    //const { navigate } = this.props.navigation;
    //const datas = state.params.data; //this.props.navigation.state.params.user.name. 
    //this.state(this.state.data)
    //alert(JSON.stringify(this.state.data.NotFilteredItemGroups));
    alert(JSON.stringify(this.props.navigation.state.params.NotFilteredItemGroups));
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.props.navigation.state.params}
          renderItem={({ item }) => (
           <ListItem
              button onPress={() => navigate('SubSubCat', { subsubcat:item.SpecificationAttributeGroups } )}
              //  button onPress={() => navigate('Product', { id:item.Id } )}
              //  roundAvatar
              title={`${item.SpecificationAttributeGroupName}`}
              containerStyle={{ borderBottomWidth: 1}}
              subtitle={
              <View style={{flexDirection: 'row'}}>

              </View>
             }
             subtitleContainerStyle={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5}}
            />
          )}
          keyExtractor={item => item.Id}
          //    ItemSeparatorComponent={this.renderSeparator}
        />
      </List>
    );
  }
}
