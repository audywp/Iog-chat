const initalState = {
  isLoading: false,
  isRegisted: false
}

export default function Register (state= initalState, action) {
  switch (action.type) {
    case 'IS_REGISTER':
      return {
        ...state,
        isLoading: true,
        isRegisted: true,
      }
  
    default:
      return{
        ...state
      }
  }
}