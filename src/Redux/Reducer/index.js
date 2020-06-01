import { combineReducers } from 'redux'
import isLogin from '../Reducer/Auth/isLogin'
import addContact from '../Reducer/Auth/addContact'
import Chat from '../Reducer/chat'
import Profile from '../Reducer/User/Profile'
import Register from '../Reducer/Auth/Register'
const Reducer = combineReducers({
  isLogin, addContact, Chat, Profile, Register
})

export default Reducer
