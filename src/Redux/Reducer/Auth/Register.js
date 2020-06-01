const initalState = {
  phone: null,
  isLoading: false,
  isRegisted: false
}

export default function Register(state = initalState, action) {
  switch (action.type) {
    case 'IS_REGISTER':
      return {
        ...state,
        isLoading: true,
        isRegisted: true,
        phone: action.payload
      }
    case 'REGISTER_LOADING':
      return {
        ...state,
        isLoading: false
      }
    case 'NOT_REGISTER':
      return {
        ...state,
        isLoading: true
      }
    case 'RESET':
      return {
        ...state
      }
    default:
      return state
  }
}