import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'

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
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> Enter your name and phone number, and create </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> you SecurityCode to verify later </Text>
        </View>
        <View style={styles.bottomContainer}>
        <View style={styles.inputText}>
          <Text
              style={{
                position: 'absolute',
                left: 17,
                top: 20
              }}
            >
              <AntDesign name='user' size={20} /> :
            </Text>
          <TextInput
             placeholder='Username'
             placeholderTextColor='#333'
             onChangeText={ phone => this.setState({ phoneNumb: `+62${phone}` })}
             style={{
               paddingHorizontal: 50,
               marginTop: 10,
               borderBottomWidth: 2,
               borderColor: '#189A8A',
               width: 230,
               height: 40,
               marginLeft: 5,
             }}
           />
           </View>
           
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
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  }
})
