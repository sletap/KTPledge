/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './src/components/Login.js'
import Main from './src/components/Main.js'
import Menu from './src/components/Menu.js'
import AboutMe from './src/components/Aboutme.js'
import Leaders from './src/components/Leaders'
import ActivesList from './src/components/ActivesList'
import Profile from './src/components/Profile'
import { createStackNavigator,createAppContainer, DrawerNavigator } from 'react-navigation';
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyCc4W4annW8hstY99LCBC1IlEyXETrdapE",
  authDomain: "ktpoints-68071.firebaseapp.com",
  databaseURL: "https://ktpoints-68071.firebaseio.com",
  storageBucket: "ktpoints-68071.appspot.com"
});





const Navigator = createStackNavigator({
  LoginScreen: { screen: Login },
  MainScreen: {screen: Main},
  MenuScreen: {screen: Menu},
  ProfileScreen: {screen: AboutMe},
  LeadersScreen: {screen: Leaders},
  ActivesScreen: {screen: ActivesList},
  DiffProfileScreen: {screen: Profile},
 },
 {
  initialRouteName: 'LoginScreen',
}
);


const App = createAppContainer(Navigator);


// class App extends Component {
//   render() {
//     return <AppContainer />
//   }
// }
export default App;

