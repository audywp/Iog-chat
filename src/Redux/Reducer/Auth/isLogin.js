const initalState = {
  data: [],
  hasLogin : [],
  isLogged: false,
  isLoading: false
}

export default function isLogin (state = initalState, action) {
  switch (action.type) {
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
        isLoading: true,
        data: {},
        hasLogin: {}
      }
    default:
      return{
        ...state
      }
  }
}