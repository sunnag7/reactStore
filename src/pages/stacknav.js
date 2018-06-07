import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigator} from 'react-navigation'

import DetailScreen from '../pages/FeaturedList';
import Icon from "react-native-vector-icons/FontAwesome";
import MainScreen from '../pages/MainScreen';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import ChatScreen from '../pages/ChatScreen';
import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard';
import FeaturedList from '../pages/FeaturedList';
import SignUp from '../pages/SignUp';
import TopicsLIst from '../pages/TopicsLIst';
import EmployeeDetails from '../pages/EmployeeDetails';
import ForgotPass from '../pages/ForgotPass';
import ControlPanel from '../pages/ControlPanel';
import SubCategory from '../pages/SubCategory';
import SubSubCategory from '../pages/SubSubCategory';
import ProductList from '../pages/ProductList';
import SearchProducts from '../pages/SearchProducts';
import FilterProducts from '../pages/FilterProducts';
import CompareProducts from '../pages/CompareProducts';
 
const stackNav = StackNavigator({
    Mains: {
        screen: MainScreen,
        navigationOptions:({navigation}) => ({
            title: "ABS Retail",
            headerLeft:(
              <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
                <Icon name="navicon" size={20} />
              </TouchableOpacity>
            ),
            headerStyle: { paddingRight: 10, paddingLeft: 16 },
            headerRight: 
  
      <Icon
        name='search'
        type='evil-icons'
        color='#000'
        size={20} 
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('Search')}
        />,
        })
    },
    Detail: {
        screen: DetailScreen,
        navigationOptions: (props) => ({
            title: "Detail",
        })
    },

  Main: {screen: Login},
  Settings: {screen: Settings},
  Chat: {screen: ChatScreen},
  Datas: {screen: FlatListDemo},
  Prod: {screen: FlatListCard},
  Crd: {screen: TopicsLIst},
  Sign: {screen: SignUp},
  //Basic: {screen: BasicExample},
  Employee: {screen: EmployeeDetails},
  Featured: {screen: FeaturedList},
  Forgot: {screen: ForgotPass},
  Controler: {screen: ControlPanel},
  SubCat: {screen: SubCategory},
  SubSubCat: {screen: SubSubCategory},
  Produ: {screen: ProductList},
  Search: {screen: SearchProducts},
  Filter: {screen: FilterProducts},
  Compare: {screen: CompareProducts},
})

export default stackNav;