import { curry } from 'ramda'
import Url from '../models/Url'

// find :: DB, String -> Promise(Url)
export const find = (db, url) => db.findOne({ url })

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
export const fetchUrlDBAsync = curry((db, url) => find(db, url))

// findUrlAsync :: String -> Promise
export const findUrlAsync = fetchUrlDBAsync(Url)

export const create = (db, url) => db.create({ url })

export const createUrlDBAsync = curry((db, url) => create(db, url))

export const createUrlAsync = createUrlDBAsync(Url)
