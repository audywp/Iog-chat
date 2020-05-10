import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import Reducer from './Reducer'
import AsyncStorage from '@react-native-community/async-storage'

const config = {
  key: 'iogchat',
  storage: AsyncStorage
}

const persisted = persistReducer(config, Reducer)

export const store = createStore(
  persisted, applyMiddleware(logger, thunk)
)

export const persistor = persistStore(store)
