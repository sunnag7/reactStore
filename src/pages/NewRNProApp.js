import React, { Component } from 'react';
import {
  StackNavigator, DrawerNavigator
} from 'react-navigation';

import Login from '../pages/Login';
import Settings from '../pages/Settings';
import ChatScreen from '../pages/ChatScreen';
import FlatListDemo from '../pages/FlatListDemo';
import FlatListCard from '../pages/FlatListCard';
import FeaturedList from '../pages/FeaturedList';
import SignUp from '../pages/SignUp';
import TopicsLIst from '../pages/TopicsLIst';
import Profile from '../pages/Profile';
import EmployeeDetails from '../pages/EmployeeDetails';
import ForgotPass from '../pages/ForgotPass';
import ControlPanel from '../pages/ControlPanel';
import SubCategory from '../pages/SubCategory';
import SubSubCategory from '../pages/SubSubCategory';
import ProductList from '../pages/ProductList';
import SearchProducts from '../pages/SearchProducts';
import FilterProducts from '../pages/FilterProducts';
import CompareProducts from '../pages/CompareProducts';
import MainScreen from '../pages/MainScreen';


/*
const myDrawer = DrawerNavigator({
  Main: {screen: Login},
  Settings: {screen: Settings},
  Chat: {screen: ChatScreen},
  Datas: {screen: FlatListDemo},
  Prod: {screen: FlatListCard},
  Crd: {screen: TopicsLIst},
  Sign: {screen: SignUp},
  Basic: {screen: BasicExample},
  Employee: {screen: EmployeeDetails},
  Featured: {screen: FeaturedList},
  Forgot: {screen: ForgotPass},
  Controler: {screen: ControlPanel},
  SubSubCat: {screen: SubSubCategory},
  SubCat: {screen: SubCategory},
  Products: {screen: ProductList},
});*/

/*const NewRNPro = StackNavigator({
  Main: {screen: myDrawer},
});*/

const firstproduct = null;
const secondproduct  = null;

const NewRNPro = StackNavigator({
  Main: {screen: Login},
  Settings: {screen: Settings},
  Chat: {screen: ChatScreen},
  Datas: {screen: FlatListDemo},
  Prod: {screen: FlatListCard},
  Crd: {screen: TopicsLIst},
  Sign: {screen: SignUp},
  Profile: {screen: Profile},
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
  MainScreen: {screen: MainScreen},
   
});

const MyApp = DrawerNavigator({
  Home: {
    screen: MainScreen,
  },
  Notifications: {
    screen: Search,
  },
});

export default NewRNPro;