import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import ButtonSend from '../../Components/Button';
import OtpInputs from 'react-native-otp-inputs';
import { setLogin } from '../../Redux/Actions/Auth/Login'
import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { Spinner } from 'native-base';

function OneTimePassword(props) {
  const [code, setCode] = useState([]);
  console.log(code)
  async function onConfirm (verificationCode) {
    const { data, phone } = props.route.params
    console.log(data)
    if (data) {
     props.setLogin(verificationCode,data)
    } else {
      console.log('failed')
    }
    console.log(code)
  }

  // async function onReset () {
  //   const user = auth().currentUser.delete()
  //   .then(()=>{
  //     Alert.alert('user has been delete')
      
  //   })
  //   .catch(error=>{
  //     console.log(error, user)
  //   })
  // }
  
  return (
    <ImageBackground
    source={require('../../Assets/Images/background.jpg')}
    resizeMode="cover"
    style={{
      flex: 1,
      alignItems: 'center',
      paddingVertical: 60
      }}
      >
      <ScrollView>
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
                handleChange={text=>setCode(text)}
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
        <TouchableOpacity
          style={{
            width: 250,
            backgroundColor: '#189A8A',
            borderRadius: 20,
            marginTop: 40
          }}
        >
          <ButtonSend
            onPress={() => onConfirm(code)}
            title="Send"
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
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
    </ScrollView>
    </ImageBackground>
  );
}
const mapStateToProps = state => {
  return {
    login: state.isLogin
  }
}
export default connect(mapStateToProps, { setLogin })(OneTimePassword)