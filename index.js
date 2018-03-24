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
	tryParse(t) {
		try {
			return JSON.parse(t)
		} catch (e) {}
		return t
	}
	get(key = '*') {
		return axios
			.get(this.url, { params: { key } })
			.then(r => r.data)
			.then(log('get'))
			.then(this.tryParse)
			.then(log('get:parsed'))
	}
	set(key, value) {
		if (typeof key !== 'string' || typeof value === 'undefined') {
			throw new TypeError('key should be string,value shouldn\'t be null.')
		}
		return axios
			.post(this.url, qs.stringify({ key, value: JSON.stringify(value) }))
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
