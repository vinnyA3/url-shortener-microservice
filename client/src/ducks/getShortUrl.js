import { FETCH_DATA, FETCH_DATA_FULFILLED } from './types'
import { fromPromise } from 'most'
import { select } from 'redux-most'
import { compose, prop } from 'ramda'
import { get } from 'axios'
import {
  curriedMap as map,
  curriedChain as chain
} from 'utils'

export const fetchData = query => ({ type: FETCH_DATA, payload: query })
export const fetchDataFulfilled = payload => ({ type: FETCH_DATA_FULFILLED, payload })

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {}
    case FETCH_DATA_FULFILLED:
      return { ...state, data: action.payload }
    default:
      return state
  }
}

// Helpers
// aFetch :: String -> Promise
const aFetch = query => get(`http://localhost:8080/api/${query}`)

// fetchStream :: String -> Observable<Promise>
const fetchStream = compose(fromPromise, aFetch)

// EPICS
export const fetchShortUrlEpic = compose(
  map(fetchDataFulfilled),
  map(({ url, shortenedUrl }) => ({ url, shortenedUrl })),
  map(prop('data')),
  chain(fetchStream),
  map(prop('payload')),
  select(FETCH_DATA)
)
