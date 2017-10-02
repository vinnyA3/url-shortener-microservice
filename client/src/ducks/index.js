import { combineReducers } from 'redux'
import getShortUrl from './getShortUrl.js'

const rootReducer = combineReducers({
  shortUrl: getShortUrl
})

export default rootReducer
