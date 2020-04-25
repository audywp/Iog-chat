const initalState = {
  data: {},
  isLoading: false
}

export default function Register (state= initalState, action) {
  switch (action.type) {
    case 'IS_REGISTER':
      return {
        ...state,
        isLoading: true,
        data: action.payload
      }
  
    default:
      return{
        ...state
      }
  }
}