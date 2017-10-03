import { FETCH_DATA, FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED } from './types'
import { fromPromise, of as _of }  from 'most'
import { select } from 'redux-most'
import { compose, prop, pick, path } from 'ramda'
import { get } from 'axios'
import {
  curriedMap as map,
  curriedChain as chain,
  curriedRecover as recoverWith
} from 'utils'

export const fetchData = query => ({ type: FETCH_DATA, payload: query })
export const fetchDataFulfilled = payload => ({ type: FETCH_DATA_FULFILLED, payload })
export const fetchDataRejected = payload => ({ type: FETCH_DATA_REJECTED, payload })

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {}
    case FETCH_DATA_FULFILLED:
      return { ...state, data: action.payload }
    case FETCH_DATA_REJECTED:
      return { ...state, err: action.payload }
    default:
      return state
  }
}

// Helpers
const request = query => get(`http://localhost:8080/api/${query}`) 

const getDataPropAndPick = compose(pick(['url', 'shortenedUrl']), prop('data'))

const pickAndFulfill = compose(fetchDataFulfilled, getDataPropAndPick)

// aFetch :: String -> Promise
const aFetch = query => compose(
  map(pickAndFulfill),
  fromPromise,
  request,
)(query)

const handleError = compose(
  map(fetchDataRejected),
  _of,
  path(['response', 'data'])
)

const safeFetch = compose(recoverWith(handleError), aFetch)

// EPICS
export const fetchShortUrlEpic = compose(
  chain(safeFetch),
  map(prop('payload')),
  select(FETCH_DATA)
)
