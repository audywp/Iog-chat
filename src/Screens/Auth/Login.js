import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, Alert, AsyncStorage } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { onLogin } from '../../Redux/Actions/Auth/Login'
import { Spinner } from 'native-base'

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: null,
      message: '',
      phoneNumb: '',
      confirm: null,
      code: '',
      loading: false
    }
  }

  componentDidMount () {
    this.unsubscribe = auth().onAuthStateChanged(user => {
      console.log(this.unsubscribe)
      if (user) {
        this.setState({
          user: user.toJSON()
        })
      } else {
        this.setState({
          user: null,
          message: '',
          phoneNumb: '',
          confirm: null,
          code: '',
        })
      }
    })
  }

  componentWillUnmount () {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    this.setState({
      loading: false
    })
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

  render () {
    console.log(this.props.login.isLoading)
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
          <Text style= {{ marginTop: 10, marginBottom: 5 }}>
            Didn't have account ?
          </Text>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
          <Text style= {{ color: '#189A8A' }}>
            Register
          </Text>
          </TouchableOpacity>
        </View>
        <View />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({
    login: state.isLogin
})

const mapDispatchToProps = {
  onLogin
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)

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
