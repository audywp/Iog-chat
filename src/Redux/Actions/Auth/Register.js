import database from '@react-native-firebase/database'
import { Alert } from 'react-native'

export const setRegister = (phone) => async dispatch => {
  
  try {
    await database().ref(`/users/${phone}`).once('value').then(
      snapshot => {
        if (snapshot.val()) {
          dispatch({
            type:'IS_REGISTER',
            payload: snapshot.val()
          })
        } else {
          this.props.navigation.navigate('Profile')
        }
      }
    )
  } catch (error) {
    this.props.navigation.navigate('Profile')
    dispatch({
      type: 'NOT_REGISTER'
    })
    console.log(error)
  }
}