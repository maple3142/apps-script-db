const axios = require('axios')
const qs = require('querystring')
const debug = require('debug')

const log = pfx => msg => {
	debug(`apps-script-db:${pfx}`)(msg)
	return msg
}

module.exports = class AppsScriptDB {
	constructor(url) {
		this.url = url
	}
	resultHandler(t) {
		return d => {
			if (d === 'error') throw new Error(`Failed to ${t}`)
			return d
		}
	}
	get(key = '*') {
		return axios
			.get(this.url, { params: { key }, transformResponse: r => r })
			.then(r => r.data)
			.then(log('get'))
	}
	set(key, value) {
		if (typeof key !== 'string' || typeof value !== 'string') {
			throw new TypeError('key,value should be string.')
		}
		return axios
			.post(this.url, qs.stringify({ key, value }))
			.then(r => r.data)
			.then(log('set'))
			.then(this.resultHandler('set'))
	}
	del(del = '*') {
		return axios
			.post(this.url, qs.stringify({ del }))
			.then(r => r.data)
			.then(log('del'))
			.then(this.resultHandler('del'))
	}
}
