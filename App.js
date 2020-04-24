import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/Screens/Auth/Login";
import Register from './src/Screens/Auth/Register'
import ChatScreen from "./src/Screens/Main/Home/ChatScreen";
import Contact from "./src/Screens/Main/Home/Contact"
import Greetings from "./src/Screens/Main/Greetings";
import LoadingScreen from "./src/Components/LoadingScreen";
import OTP from './src/Screens/Auth/Otp'

import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/Redux/Store'

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomStack = props => {
  return (
    
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Contact" component={Contact} options={{
        tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
        tabBarIcon: ({color, size}) => (
          <AntDesign name='contacts' size={25} color='#189A8A' />
        )
      }} />
      <BottomTabs.Screen name="Chat" component={ChatScreen} options={{
        tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
        tabBarIcon: ({color, size}) => (
          <MaterialIcons name='chat-bubble-outline' size={25} color='#189A8A' />
        )
      }} />
      <BottomTabs.Screen name="Profile" component={ChatScreen} options={{
        tabBarLabel: () => <Text style={{ display: 'none' }}></Text>,
        tabBarIcon: ({color, size}) => (
          <AntDesign name='user' size={25} color='#189A8A' />
        )
      }} />
    </BottomTabs.Navigator>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashTime: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setSplashTime();
    }, 2000);
  }

  setSplashTime() {
    this.setState({
      splashTime: true
    });
  }

  render() {
    if (!this.state.splashTime) {
      return <LoadingScreen />;
    } else {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
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
                  name="Home"
                  component={BottomStack}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="OTP"
                  component={OTP}
                  options={{
                    headerShown: false
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
      </Provider>
      );
    }
  }
}

export default App;
