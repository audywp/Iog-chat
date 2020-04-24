const initalState = {
  data: {},
  isLogged: false,
  isLoading: false
}

export default function isLogin (state= initalState, action) {
  switch (action.type) {
    case 'IS_LOGIN':
      return {
        ...state,
        isLogged: true,
        isLoading: true,
        data: action.payload
      }
  
    default:
      return{
        ...state
      }
  }
}