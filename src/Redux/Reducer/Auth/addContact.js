const initalState = {
  friend: [],
  contact: {},
  isLoading: false,
}

export default function addContact(state = initalState, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        isLoading: true,
        friend: action.payload
      }
    case 'CONTACT_LOADING':
      return {
        ...state,
        isLoading: false,
      }
    case 'LIST_CONTACT':
      return {
        ...state,
        isLoading: true,
        contact: action.payload
      }
    default:
      return {
        ...state
      }
  }
}