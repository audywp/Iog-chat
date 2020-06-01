const initialState = {
  user: null,
  message: [],
  path: [],
  curentPos: [],
  pos: [],
  isLoading: false,
  isRegistered: false
}

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        isLoading: true
      }
    case 'DATA_USER':
      return {
        ...state,
        isLoading: true,
        user: action.payload
      }
    case 'UPLOAD_PHOTO':
      return {
        ...state,
        path: action.payload
      }
    case 'CURENT_POS':
      return {
        ...state,
        isLoading: true,
        curentPos: action.payload,
      }
    case 'USER_POS':
      return {
        ...state,
        isLoading: true,
        pos: action.payload
      }
    case 'LOADING_PROFILE':
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
      return { ...state }
  }
}