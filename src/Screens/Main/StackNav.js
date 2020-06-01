/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Greetings from '../Main/Greetings';
import LoginScreen from '../Auth/Login';
import Register from '../Auth/Register';
import ChatScreen from '../Main/Home/ChatScreen';
import BottomStack from '../../Components/BottomStack';
import OneTimePassword from '../Auth/Otp';
import Profile from '../Main/Home/Profile';

import { setLogin } from '../../Redux/Actions/Auth/Login';
import { connect } from 'react-redux';
const Stack = createStackNavigator();

const mapStateToProps = state => {
  return {
    login: state.isLogin,
    register: state.Register,
  };
};
export default connect(
  mapStateToProps,
  { setLogin }
)(
  class StackNav extends Component {
    render() {
      const { login } = this.props;
      if (login.isLogged) {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={BottomStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Profile" component={Profile} options={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#189A8A' }
            }} />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                headerShown: false,
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#189A8A' }
              }}
            />
          </Stack.Navigator>
        );
      } else {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Greetings}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="OTP"
              component={OneTimePassword}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        );
      }
    }
  }
);
