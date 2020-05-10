import database from '@react-native-firebase/database'
import { Alert } from 'react-native'

export const CreateProfile = (phone, data) => async dispatch => {
  
  try {
    await database().ref(`users/${phone}`).set({data})
    dispatch({
      type:'CREATE',
      payload: data
    })
    dispatch({
      type: 'LOADING_PROFILE'
    })
      
  } catch (error) {
    dispatch({
      type: 'FAILED_LOADING'
    })
    console.log(error)
  }
}

export const getDataProfile = (phone, callback) => async dispatch =>{
  try {
    await database().ref(`users/${phone}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        dispatch({
          type: 'DATA_USER',
          payload: snapshot.val()
        })
        callback(true)
      } else {
        callback(false)
      }
      dispatch({
        type: 'DATA_USER',
        payload: snapshot.val()
      })
    })
    dispatch({
      type: 'LOADING_PROFILE'
    })
  } catch (error) {
    dispatch({
      type: 'FAILED_LOADING'
    })
    console.log(error)
  }
}

export const UploadPhoto = (path) => async dispatch => {
  try {
    dispatch({
      type: 'UPLOAD_PHOTO',
      payload: path
    })
  } catch (error) {
    console.log(error)
  }
}

export const UpdateUser = (phone, data) => async dispatch => {
  try {
    await database().ref(`users/${phone}`).update({data}).then(() => {
      dispatch({
        type:'CREATE',
      })
    })
    
    dispatch({
      type: 'LOADING_PROFILE'
    })
      
  } catch (error) {
    dispatch({
      type: 'FAILED_LOADING'
    })
    console.log(error)
  }
}