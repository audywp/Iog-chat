const initalState = {
  data: [],
  otp: [],
  hasLogin : [],
  isLogged: false,
  isLoading: false
}

export default function isLogin (state = initalState, action) {
  switch (action.type) {
    
    case 'LOGIN':
      return{
        ...state,
        isLoading: true,
        otp: action.payload
      }
    case 'IS_LOGIN':
      return {
        ...state,
        isLogged: true,
        isLoading: true,
        data: action.payload
      }
    case 'HAS_LOGIN':
      return {
        ...state,
        isLogged: true,
        isLoading: true,
        hasLogin: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isLogged: false,
        isLoading: false,
        data: {},
        hasLogin: {}
      }
    case 'LOGIN_LOADING':
      return {
        ...state,
        isLoading: false
      }
    case 'FAILED_LOADING':
      return {
        ...state,
        isLoading: true
      }
    default:
      return state
  }
}