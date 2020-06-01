import database from '@react-native-firebase/database'
import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

export const setRegister = (phoneNumber, callback) => async dispatch => {

  try {
    database().ref(`users/${phoneNumber}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          callback(true)
        } else {
          dispatch({
            type: 'IS_LOGIN',
            payload: snapshot.val()
          });
          callback(false)
        }
      })
    dispatch({
      type: 'IS_REGISTER',
      payload: phoneNumber
    })
  } catch (error) {
    this.props.navigation.navigate('Profile')
    dispatch({
      type: 'NOT_REGISTER'
    })
    console.log(error)
  }
}