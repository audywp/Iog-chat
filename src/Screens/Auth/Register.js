import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'

class Login extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../Assets/Images/OTP.png')}
            style={{ width: '100%', height: 150 }}
            resizeMode='contain'
          />
          <Text style={{ marginBottom: 20, fontSize: 26, fontFamily: 'Roboto', textAlign: 'center' }}> Registration </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> Enter your phone number, we will send </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> you OTP to verify later </Text>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
                keyboardType='phone-pad'
                dataDetectorTypes='phoneNumber'
                maxLength={11}
                placeholder='Phone Number'
                placeholderTextColor='#333'
                onChangeText={ phone => this.setState({ phoneNumb: `+62${phone}` })}
                style={{
                  paddingHorizontal: 50,
                  borderRadius: 8,
                  borderBottomWidth: 2,
                  borderColor: '#189A8A',
                  width: 230,
                  height: 40,
                  marginLeft: 5
                }}
              />
          <Button
            title='Continue'
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20
            }}
            style={{
              width: 250,
              backgroundColor: '#189A8A',
              borderRadius: 20
            }}
            textStyle={{ textAlign: 'center', color: 'white', flex: 1 }}
          />
        </View>
        <View />
      </ScrollView>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 20,
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
