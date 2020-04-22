import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'

class Login extends Component {
  constructor (props) {
    super(props);
    
    this.onGoHome = this.onGoHome.bind(this);
    this.onPressFlag = this.onPressFlag.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.state = {
      pickerData: null
    }
  }

  onGoHome() {
    this.props.navigation.navigate('Home')
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
                left: 15
              }}
            >
              +62 :
            </Text>
            <TextInput
              keyboardType='phone-pad'
              dataDetectorTypes='phoneNumber'
              maxLength={11}
              placeholder='Phone Number'
              placeholderTextColor='#333'
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
          </View>
          <Button
            onPress={this.onGoHome}
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
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
})
