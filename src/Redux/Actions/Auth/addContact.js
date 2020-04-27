import database from '@react-native-firebase/database'


export const addContacts = current_user => async dispatch => {
  database()
  .ref(`/users/${current_user}/friend`)
  .once('value')
  .then(snapshot => {
    const user = snapshot.va
  })
}
