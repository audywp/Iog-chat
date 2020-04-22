// import React, { Component } from 'react'
// import PhoneInput from 'react-native-intl-phone-input'
// import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native'
// import Button from '../../Components/Button'
// import { ScrollView } from 'react-native-gesture-handler'

// class Login extends Component {
//   constructor (props) {
//     super(props)

//     this.onPressFlag = this.onPressFlag.bind(this)
//     this.selectCountry = this.selectCountry.bind(this)
//     this.state = {
//       pickerData: null
//     }
//   }

//   onPressFlag () {
//     this.myCountryPicker.open()
//   }

//   selectCountry () {
//     this.phone.selectCountry(country.iso2)
//   }

//   render () {
//     return (
//       <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
//         <View style={{ alignItems: 'center' }}>
//           <Image
//             source={require('../../Assets/Images/OTP.png')}
//             style={{ width: '100%', height: 280 }}
//             resizeMode='contain'
//           />
//           <Text style={{ marginBottom: 20, fontSize: 26, fontFamily: 'Roboto', textAlign: 'center' }}> Registration </Text>
//           <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> Enter your phone number, we will send </Text>
//           <Text style={{ fontSize: 14, fontFamily: 'Roboto', textAlign: 'center' }}> you OTP to verify later </Text>
//         </View>
//         <View style={styles.bottomContainer}>
//           <SafeAreaView style={{ width: '60%', alignItems: 'center', justifyContent: 'space-around', height: '60%' }}>
//             <PhoneInput defaultCountry='ID' />

//           </SafeAreaView>
//           <Button
//             title='Continue'
//             containerStyle={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 20
//             }}
//             style={{
//               width: 250,
//               backgroundColor: '#189A8A',
//               borderRadius: 20
//             }}
//             textStyle={{ textAlign: 'center', color: 'white', flex: 1 }}
//           />
//         </View>
//         <View />
//       </ScrollView>
//     )
//   }
// }

// export default Login

// const styles = StyleSheet.create({
//   bottomContainer: {
//     marginTop: 20,
//     height: 150,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })
