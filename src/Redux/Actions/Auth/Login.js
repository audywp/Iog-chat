import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

export const setLogin = (code, data) => async dispatch => {
  const user = await data.confirm(code)
  try {
    if (user) {
      dispatch({
        type: 'IS_LOGIN',
        payload: user
      })
    } else {
      Alert.alert('verification code wrong!')
    }
  } catch (error) {
    console.log(error)
  }
}