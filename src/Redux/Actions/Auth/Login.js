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

export const hasLogin = () => async dispatch => {
  await auth().onAuthStateChanged(user => {
    if (user) {
      dispatch ({
        type: 'HAS_LOGIN',
        payload: user
      })
    }
  })
}

export const hasLogout = () => async dispatch => {
    try {
     dispatch({
       type:'LOGOUT'
     }) 
     Alert.alert('Thanks, please comeback later')
    } catch (error) {
      console.log(error)
    }
}