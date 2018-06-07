import React, { Component } from 'react';
import { TabNavigator, TabView } from 'react-navigation'
import Icon from "react-native-vector-icons/FontAwesome";
import stackNav from '../pages/stacknav';

const tabnav = TabNavigator({
    TabItem1: {
        screen: stackNav,
        navigationOptions: {
            tabBarLabel:"Tab 1",
            tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />
        }
    },
    TabItem2: {
        screen: stackNav,
        navigationOptions: {
            tabBarLabel:"Tab 2",
            tabBarIcon: ({ tintColor }) => <Icon name={"glass"} size={30} color={tintColor} />
        }
    }
    ///... add more tabs here

}, {
        tabBarOptions: {
            activeTintColor: '#fff',
        }
});

export default tabnav;