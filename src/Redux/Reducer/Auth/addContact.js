const initalState = {
  data: [],
  isLoading: false,
}

export default function Register (state= initalState, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
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