import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TextInput, Alert } from 'react-native'
import Button from '../../Components/Button'
import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { onLogin, loginWithGoogle } from '../../Redux/Actions/Auth/Login'
import { Spinner } from 'native-base'
import LoadingScreen from '../../Components/LoadingScreen'
import { GoogleSigninButton, GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import { LoginButton } from 'react-native-fbsdk'

GoogleSignin.configure({
  webClientId: '116923230557-rcuseevof4hpde53tio0crl41tf9rpc2.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  loginHint: '',
  forceCodeForRefreshToken: true,
  accountName: '',
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: '',
      phoneNumb: '',
      confirm: null,
      code: '',
      loading: false,
      loadingScreen: false
    }
  }

  onLogin = async () => {
    if (!this.props.login.isLoading) {
      this.setState({
        loading: true
      })
    }
    const { phoneNumb, confirm } = this.state

    this.setState({
      message: 'sending code ...'
    })
    try {
      await this.props.onLogin(phoneNumb).then(() => {
        this.props.navigation.navigate('OTP')
      })
    } catch (error) {
      console.log(error)
    }
  }

  googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn()
      this.setState({
        loadingScreen: true
      })
      this.props.loginWithGoogle(idToken, status => {
        if (!status) {
          this.props.navigation.navigate('Register')
        } else {
          console.log('success login')
        }
      })
      this.setState({
        loadingScreen: false
      })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({
          loadingScreen: false
        })
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({
          loadingScreen: true
        })
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Seems like your Services is time-out, try again')
        this.setState({
          loadingScreen: false
        })
      } else {
        console.log(error)
      }
    }

  };

  render() {
    console.log(this.props.login.isLoading)
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        {this.state.loadingScreen ? <LoadingScreen /> : null}
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
              onChangeText={phone => this.setState({ phoneNumb: `+62${phone}` })}
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
          <View>
            <Button
              onPress={() => this.onLogin(this.state.phoneNumb)}
              title='Continue'
              loading={this.state.loading}
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
          <Text style={{ marginTop: 10, marginBottom: 5 }}>
            Or
          </Text>

        </View>
        <View />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={styles.signinMethod}>

            <GoogleSigninButton
              style={{
                width: 240
              }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={(() => this.googleSignin().then(() => console.log('Sign in goggle')))}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
  login: state.isLogin
})

const mapDispatchToProps = {
  onLogin, loginWithGoogle
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
  },
  signinMethod: {
    marginTop: -10,
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
