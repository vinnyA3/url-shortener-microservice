import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-most'
import rootReducer from 'ducks'
import { fetchShortUrlEpic } from 'ducks/getShortUrl' 

const rootEpic = combineEpics([
  fetchShortUrlEpic
])

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore() {
  const store = createStore(
      rootReducer,
      applyMiddleware(epicMiddleware)
    )

  return store
}
