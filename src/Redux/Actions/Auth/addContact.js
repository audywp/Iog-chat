import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import { error } from 'react-native-gifted-chat/lib/utils'

export const searchContacts = (phone, callback) => async dispatch => {
  try {
    await database()
  .ref(`/users/${phone}`)
  .once('value')
  .then(snapshot=>{
    const current_user = auth().currentUser.phoneNumber
    const data = snapshot.val()
    if (data && phone > 1 && data.phone != current_user) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: data
      })
      dispatch({
        type: 'CONTACT_LOADING',
        payload: data
      })
      callback(true)
    } else {
      callback(false)
    }
  })
  } catch (error) {
    console.log(error)
  }
}

export const addContact = (phone,phoneFriend, friend, ownAccount) => async dispatch => {
  try {
    await database().
    ref(`/users/${phone}/friend`)
    .child(`${phoneFriend}`)
    .set(friend)

    await database().
    ref(`/users/${phoneFriend}/friend`)
    .child(`${phone}`)
    .set(ownAccount)
  } catch (error) {
    console.log(error)
  }
}

export const getContact = (phone) => async dispatch => {
  try {
    await database()
  .ref(`/users/${phone}/friend`)
  .once('value')
  .then(snapshot=>{
      dispatch({
        type: 'LIST_CONTACT',
        payload: snapshot.val()
      })
      dispatch({
        type: 'CONTACT_LOADING',
      })
  })
  } catch (error) {
    console.log(error)
  }
}

