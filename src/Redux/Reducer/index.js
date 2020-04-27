import { combineReducers } from 'redux'
import isLogin from '../Reducer/Auth/isLogin'
import Register from '../Reducer/Auth/Register'
import Chat from '../Reducer/chat'
const Reducer = combineReducers({
  isLogin, Register,Chat
})

export default Reducer
