import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import database from '@react-native-firebase/database';

export const onLogin = phoneNumber => async dispatch => {
  try {
    const res = await auth().signInWithPhoneNumber(phoneNumber);
    dispatch({
      type: 'LOGIN',
      payload: res
    });
    dispatch({
      type: 'IS_REGISTER',
      payload: phoneNumber
    });

    dispatch({
      type: 'LOGIN_LOADING'
    });
  } catch (error) {
    dispatch({
      type: 'FAILED_LOADING'
    });
    console.log(error);
  }
};

export const setLogin = (code, data, callback) => async dispatch => {
  try {
    const user = await data.confirm(code);
    if (user) {
      database()
        .ref(`users/${user.phoneNumber}`)
        .once('value')
        .then(snapshot => {
          console.log(snapshot.val());
          if (snapshot.val()) {
            console.log('data', snapshot.val());
            callback(true);
            dispatch({
              type: 'IS_LOGIN',
              payload: snapshot.val()
            });
          } else {
            callback(false);
          }
        });
      dispatch({
        type: 'IS_LOGIN',
        payload: user
      });
      dispatch({
        type: 'LOGIN_LOADING'
      });
    } else {
      Alert.alert('Code Otp salah');
    }
  } catch (error) {
    dispatch({
      type: 'FAILED_LOADING'
    });
    console.log(error);
  }
};

export const loginWithGoogle = (credential, callback) => async dispatch => {
  try {
    const googleCredential = auth.GoogleAuthProvider.credential(credential);
    if (googleCredential) {
      await auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          database()
            .ref(`users/${googleCredential.phoneNumber}`)
            .once('value')
            .then(snapshot => {
              console.log(snapshot.val());
              if (snapshot.val()) {
                console.log('data', snapshot.val());
                callback(true);
                dispatch({
                  type: 'IS_LOGIN',
                  payload: snapshot.val()
                });
              } else {
                callback(false);
              }
            });
        });
    } else {
      Alert.alert('Login gagal');
    }
    dispatch({
      type: 'LOGIN_LOADING'
    });
  } catch (error) {
    console.log(error);
  }
};

export const hasLogin = () => async dispatch => {
  await auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: 'HAS_LOGIN',
        payload: user
      });
    }
  });
};

export const hasLogout = () => async dispatch => {
  try {
    dispatch({
      type: 'LOGOUT'
    });
    Alert.alert('Thanks, please comeback later');
  } catch (error) {
    console.log(error);
  }
};
