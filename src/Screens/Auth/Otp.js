import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import ButtonSend from '../../Components/Button';
import OtpInputs from 'react-native-otp-inputs';
import { setLogin, onLogin } from '../../Redux/Actions/Auth/Login'
import { connect } from 'react-redux'
import { getContact } from '../../Redux/Actions/Auth/addContact'
import { getDataProfile } from '../../Redux/Actions/User/Profile'
import auth from '@react-native-firebase/auth'
import { Spinner } from 'native-base';

function OneTimePassword(props) {
  const [code, setCode] = useState([]);
  const [loading, setLoading] = useState(false)
  async function onConfirm(verificationCode) {
    try {
      if (!props.login.isLoading) {
        setLoading(true)
      }
      const { otp } = props.login
      if (otp) {
        await props.setLogin(verificationCode, otp, (status) => {
          console.log(status)
          if (!status) {
            props.navigation.navigate('Profile')
          } else {
            props.getDataProfile(auth().currentUser.phoneNumber)
          }
        })
        await props.getDataProfile(auth().currentUser.phoneNumber)
      } else {
        console.log('failed')
      }
    } catch (error) {
      console.log(error)
    }
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
                  handleChange={text => setCode(text)}
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
              loading={loading}
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
            <TouchableOpacity onPress={() => props.onLogin(auth().currentUser.phoneNumber)}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Roboto',
                  fontSize: 16,
                  textAlign: 'center',
                  marginBottom: 20
                }}
              > Send again </Text>
            </TouchableOpacity>
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
export default connect(mapStateToProps, { onLogin, setLogin, getContact, getDataProfile })(OneTimePassword)