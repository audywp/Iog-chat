import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2c3d63'
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Ionicons name='ios-chatboxes' size={200} color='#189A8A' />
        <Text
          style={{
            fontSize: 48,
            textAlign: 'center',
            fontFamily: 'Roboto',
            color: 'white'
          }}
        >
          Iog App
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontFamily: 'OpenSans-Italic',
            color: '#189A8A',
            marginTop: 20
          }}
        >
          EXPLORE WITH US
        </Text>
      </View>
    </View>
  )
}

export default LoadingScreen
