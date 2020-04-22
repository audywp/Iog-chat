import React, { useState } from 'react'
import { View } from 'native-base'
import { Text, Image, TouchableOpacity } from 'react-native'

import ButtonComp from '../../Components/Button'

const Greetings = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 20
      }}
    >
      <View>
        <Text style={{ fontSize: 32, fontFamily: 'OpenSans-Italic' }}>
          Quick
        </Text>
        <Text style={{ fontSize: 32, fontFamily: 'OpenSans-Italic' }}>
          and easy
        </Text>
      </View>
      <View>
        <Image
          source={require('../../Assets/Images/chat.png')}
          style={{ width: 320, height: 280 }}
          resizeMode='contain'
          containerStyle={{ backgroundColor: 'red' }}
        />
        <Text
          style={{ fontSize: 32, fontFamily: 'Roboto', textAlign: 'center' }}
        >
          Iog App
        </Text>
      </View>

      <View>
        <TouchableOpacity>
          <ButtonComp
            onPress={() => navigation.navigate('Login')}
            containerStyle={{
              alignItems: 'center'
            }}
            title='Take me in'
            style={{
              width: '80%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#189A8A'
            }}
            textStyle={{
              fontSize: 16,
              fontFamily: 'Roboto',
              color: 'white'
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Greetings
