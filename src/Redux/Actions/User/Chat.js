import database from '@react-native-firebase/database'
import { Alert } from 'react-native'

export const Chat = (phone,phoneFriend, massageFriend, myMessage) => async dispatch => {
  try {
    await database().
    ref(`/messages/${phone}/`)
    .child(`${phoneFriend}`)
    .set(massageFriend)

    await database().
    ref(`/messages/${phoneFriend}/`)
    .child(`${phone}`)
    .set(myMessage)
  } catch (error) {
    console.log(error)
  }
}