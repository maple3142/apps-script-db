const axios = require('axios')
const qs = require('querystring')

module.exports = class AppsScriptDB {
	constructor(url) {
		this.url = url
	}
	resultHandler(t) {
		return r => {
			if (!r.data || r.data.msg === 'error') throw new Error(`Failed to ${t}`)
			return r.data
		}
	}
	get(key = '*') {
		return axios.get(this.url, { params: { key } }).then(r => r.data)
	}
	set(key, value) {
		if (typeof key !== 'string' || typeof value === 'undefined') {
			throw new TypeError('key should be string,value shouldn\'t be null.')
		}
		return axios.post(this.url, qs.stringify({ key, value: JSON.stringify(value) })).then(this.resultHandler('set'))
	}
	del(del = '*') {
		return axios.post(this.url, qs.stringify({ del })).then(this.resultHandler('del'))
	}
}
