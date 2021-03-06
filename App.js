import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";

import LoadingScreen from "./src/Components/LoadingScreen";
import Stacks from './src/Screens/Main/StackNav'

import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/Redux/Store'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashTime: false
    };
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  

  render() {
      return (
        <> 
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <NavigationContainer>
                <Stacks />
              </NavigationContainer>
            </PersistGate>
        </Provider>
      </>
      );
    
  }
}

export default App;
