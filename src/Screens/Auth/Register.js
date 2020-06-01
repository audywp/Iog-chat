import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import Button from '../../Components/Button'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { connect } from 'react-redux'
import { setRegister } from '../../Redux/Actions/Auth/Register'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      error: false,
      loading: false
    }
  }

  handleRegister = async () => {

    try {
      this.setState({
        loading: true
      })
      await this.props.setRegister(this.state.phoneNumber, status => {
        if (!status) {
          this.props.navigation.navigate('Profile')
        } else {
          this.setState({
            error: true
          })
        }
      })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  componentDidMount = () => {
    if (this.state.error) {
      this.setState({
        loading: false
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    })
  }

  render() {
    console.log(this.state.phoneNumber)
    return (
      <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../Assets/Images/OTP.png')}
            style={{ width: '100%', height: 150 }}
            resizeMode='contain'
          />
          <Text style={{ marginBottom: 20, fontSize: 26, fontFamily: 'Roboto', textAlign: 'center' }}> Registration </Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> Enter your, phone number</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}></Text>
          <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> This season does'nt require verification </Text>
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
              onChangeText={phone => this.setState({ phoneNumber: `+62${phone}` })}
              style={{
                paddingHorizontal: 50,
                borderRadius: 8,
                borderBottomWidth: 2,
                borderColor: '#189A8A',
                width: 230,
                height: 40,
                marginLeft: 5,
              }}
            />
          </View>
          <View style={{
            marginBottom: 40
          }}>
            {this.state.error ? <Text style={{
              color: 'red'
            }}>Your phone number is already taken </Text> : null}
          </View>
          <Button
            title='Continue'
            onPress={this.handleRegister}
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
        <View />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  setRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

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
    marginTop: 30
  }
})
