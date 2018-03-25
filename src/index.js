export default class AppsScriptDB {
	constructor(url, fetch = window.fetch.bind(window)) {
		if (typeof url !== 'string' || typeof fetch !== 'function')
			throw new TypeError('url should be string,fetch should be whatwg-fetch.')
		this.url = url
		this.fetch = fetch
	}
	handleResult(t) {
		return d => {
			if (d === 'error') throw new Error(`Failed to ${t}`)
		}
	}
	_stringify(data) {
		return Object.keys(data)
			.map(k => `${k}=${data[k]}`)
			.join('&')
	}
	_GET(url, data) {
		return this.fetch(`${url}?${this._stringify(data)}`).then(r => r.text())
	}
	_POST(url, data) {
		return this.fetch(url, {
			method: 'POST',
			body: this._stringify(data),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(r => r.text())
	}
	get(key = '*') {
		if (typeof key !== 'string') throw new TypeError('key should be string.')
		return this._GET(this.url, { key })
	}
	set(key, value) {
		if (typeof key !== 'string' || typeof value !== 'string') throw new TypeError('key,value should be string.')
		return this._POST(this.url, { key, value }).then(this.handleResult('set'))
	}
	del(del = '*') {
		if (typeof del !== 'string') throw new TypeError('key should be string.')
		return this._POST(this.url, { del }).then(this.handleResult('del'))
	}
}
