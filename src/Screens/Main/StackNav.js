import React, { Component } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
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

import {setLogin} from '../../Redux/Actions/Auth/Login'
import { connect } from 'react-redux'


import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();


const BottomStack = props => {

  const Profile = () => {
    props.navigation.navigate('Profile')
  }
  return (
    <>
      <HeaderNav
        source={require('../../Assets/Images/person1.jpg')}
        title='IOG'
        onpress={Profile}
      />
      <BottomTabs.Navigator>
        <BottomTabs.Screen name="Chat" component={ChatScreen} options={{
          tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name='chat-bubble-outline' size={25} color='#189A8A' />
          )
        }} />
        <BottomTabs.Screen name="Contact" component={Contact} options={{
          tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
          tabBarIcon: ({color, size}) => (
            <AntDesign name='contacts' size={25} color='#189A8A' />
          )
        }} />
      </BottomTabs.Navigator>
    </>
  )
}

const mapStateToProps = state => {
  return {
    login: state.isLogin
  }
}
export default connect(mapStateToProps, { setLogin })(class StackNav extends Component {

  render() {
    const { login } = this.props
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