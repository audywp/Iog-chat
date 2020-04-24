import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import ButtonSend from '../../Components/Button';
import OtpInputs from 'react-native-otp-inputs';
import { setLogin } from '../../Redux/Actions/Auth/Login'
import { connect } from 'react-redux'

function OneTimePassword(props) {
  const [verificationCode, setCode] = useState([]);
  async function onConfirm (verificationCode) {
    const { data, phone } = props.route.params
    if (data) {
     const user =  props.setLogin(verificationCode,data)
     if (user) {
       props.navigation.navigate('Home', { data: phone })
     } else {
       console.log('fail')
     }
    } else {
      console.log('failed')
    }
  }
  return (
    <ImageBackground
      source={require('../../Assets/Images/background.jpg')}
      resizeMode="cover"
      style={{
        flex: 1,
        alignItems: 'center'
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontFamily: 'Roboto'
            }}
          >
            One Time Password
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              Enter the OTP sent to
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 20
              }}
            >
              {/* {props.route.params.data} */}
            </Text>
            <View
              style={{
                width: 220,
                height: 70,
              }}
            >
              
              <OtpInputs
                inputContainerStyles={{
                  borderColor: 'white',
                  borderBottomWidth: 2,
                  color: 'white'
                }}
                inputStyles={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center'
                }}
                numberOfInputs={6}
                numberOfLines={6}
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity>
          <ButtonSend
            onPress={() => onConfirm('123456')}
            title="Send"
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
        </TouchableOpacity>
        <View
          style={{ marginTop: 20 }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 20
            }}
          >Didn't receive any massage ?</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 20
            }}
          > Send again </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {
    login: state.isLogin
  }
}
export default connect(mapStateToProps, { setLogin })(OneTimePassword)