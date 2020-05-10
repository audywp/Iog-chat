import database from '@react-native-firebase/database'
import { Alert } from 'react-native'

export const Chat = (phone,phoneFriend, massageFriend, myMessage) => async dispatch => {
  try {
    await database().
    ref(`messages`)
    .child(`${phone}`)
    .child(`${phoneFriend}`)
    .on(massageFriend)

  } catch (error) {
    console.log(error)
  }
}