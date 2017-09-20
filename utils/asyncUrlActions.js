import { curry } from 'ramda'
import Url from '../models/Url'

// find :: DB, String -> Promise(Url)
const find = (db, url) => db.findOne({ url }) 

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
const fetchUrlDBAsync = curry((db, url) => find(db, url))

// findUrlAsync :: String -> Promise
const findUrlAsync = fetchUrlDBAsync(Url)

const create = (db, url) => db.create({ url })

const createUrlDBAsync = curry((db, url) => create(db, url))

const createUrlAsync = createUrlDBAsync(Url)


export default {
	fetchUrlDBAsync,
	findUrlAsync,
	createUrlDBAsync,
	createUrlAsync
}
