import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-most'
import rootReducer from 'ducks'
import { fetchShortUrlEpic } from 'ducks/getShortUrl' 

const epicMiddleware = createEpicMiddleware(fetchShortUrlEpic)

export default function configureStore() {
  const store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    )

  return store
}
