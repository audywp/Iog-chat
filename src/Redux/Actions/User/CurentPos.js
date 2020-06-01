import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import Geolocation from '@react-native-community/geolocation'
export const getDataUser = () => dispatch => {
  try {
    database()
      .ref(`users/${auth().currentUser.phoneNumber}/friend`)
      .on('value', (snapshot) => {
        const current_user = auth().currentUser.uid;
        console.log(snapshot.val())
        console.log('hahaha', current_user);
        const data = snapshot.val();
        const user = !snapshot.val() ? snapshot.val() : Object.values(data);
        dispatch({
          type: 'CURENT_POS',
          payload: user
        })
      });
    dispatch({
      type: 'LOADING_PROFILE'
    })
  } catch (error) {
    console.log(error)
  }
}

export const getUserPos = () => dispatch => {
  Geolocation.getCurrentPosition(info => dispatch({
    type: "USER_POS",
    payload: info.coords
  }), err => console.log(err), { enableHighAccuracy: false })
}