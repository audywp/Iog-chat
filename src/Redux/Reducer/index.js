import { combineReducers } from 'redux'
import isLogin from '../Reducer/Auth/isLogin'
import addContact from '../Reducer/Auth/addContact'
import Chat from '../Reducer/chat'
import Profile from '../Reducer/User/Profile'

const Reducer = combineReducers({
  isLogin, addContact, Chat, Profile
})

export default Reducer
