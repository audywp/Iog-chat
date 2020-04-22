import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'

class Login extends Component {
  constructor (props) {
    super(props)

    this.onPressFlag = this.onPressFlag.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.state = {
      pickerData: null
    }
  }

  onPressFlag () {
    this.myCountryPicker.open()
  }

  selectCountry () {
    this.phone.selectCountry(country.iso2)
  }

  render () {
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../Assets/Images/login.png')}
            style={{ width: '100%', height: 280 }}
            resizeMode='contain'
          />
          <Text style={{ marginBottom: 20, fontSize: 26, fontFamily: 'Roboto', textAlign: 'center' }}> Get in the app </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> Enter your phone number, we will send </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> you OTP to verify later </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputText}>
            <Text
              style={{
                position: 'absolute',
                left: 15,
                color: '#444',
                fontSize: 18
              }}
            >
              +62 :
            </Text>
            <TextInput
              keyboardType='phone-pad'
              dataDetectorTypes='phoneNumber'
              maxLength={12}
              placeholder='Phone Number'
              placeholderTextColor='#444'
              style={{
                fontSize: 18,
                paddingHorizontal: 52,
                borderRadius: 8,
                borderBottomWidth: 2,
                borderColor: '#189A8A',
                width: 230,
                height: 50,
                marginLeft: 5
              }}
            />
          </View>
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
              borderRadius: 20,
              fontSize: 18
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
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
})
