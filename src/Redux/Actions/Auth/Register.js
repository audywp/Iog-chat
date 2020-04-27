import database from '@react-native-firebase/database'
import { Alert } from 'react-native'

export const setRegister = (data, phone) => async dispatch => {
  await database().ref(`/users/${phone}`).update(data)
  try {
      dispatch({
        type:'IS_REGISTER',
      })
  } catch (error) {
    console.log(error)
  }
}