import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Spinner } from 'native-base'

const LoadingScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
      }}
    >
      <Spinner color='white' />
    </View>
  )
}

export default LoadingScreen
