import React, { Component } from 'react'
import { createStackNavigator, HeaderBackground } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from 'react-native'
import Greetings from "../Main/Greetings";
import LoginScreen from "../Auth/Login";
import Register from '../Auth/Register';
import ChatScreen from "../Main/Home/ChatScreen";
import Contact from "../Main/Home/Contact"
import OneTimePassword from '../Auth/Otp'
import Profile from '../Main/Home/Profile'
import HeaderNav from '../../Components/HeaderNav'
import Maps from './Maps'

import {setLogin} from '../../Redux/Actions/Auth/Login'
import { connect } from 'react-redux'


import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();


const BottomStack = props => {

  const Profile = () => {
    props.navigation.navigate('Profile')
  }
  return (
    <>
      <HeaderNav
        onpress={Profile}
      />
      <BottomTabs.Navigator>
        <BottomTabs.Screen name="Contact" component={Contact} options={{
          tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
          tabBarIcon: ({color, size}) => (
            <AntDesign name='contacts' size={25} color='#189A8A' />
            )
          }} />
        {/* <BottomTabs.Screen tabBarVisible = {false}  name="Chat" component={ChatScreen} options={{
          tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='chat-bubble-outline' size={25} color='#189A8A' />
          )
        }} /> */}
        <BottomTabs.Screen name="Maps" component={Maps} options={{
          tabBarVisible: false,
          tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name='google-maps' size={25} color='#189A8A' />
          )
        }} />
      </BottomTabs.Navigator>
    </>
  )
}

const mapStateToProps = state => {
  return {
    login: state.isLogin,
    register: state.Register,
    profile: state.Profile
  }
}
export default connect(mapStateToProps, { setLogin })(class StackNav extends Component {

  render() {
    const { login, register } = this.props
    if (login.isLogged) {
        return (
          <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={BottomStack}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            headerBackground= '#189A8A'
          />
          </Stack.Navigator>
          
        )
    } else {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Greetings}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false
            }}
          />
        
          <Stack.Screen
            name="OTP"
            component={OneTimePassword}
            options={{
              headerShown: false
            }}
          />
          
        </Stack.Navigator>
      )
    }
  }
})