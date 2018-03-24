export default Object.assign(
	...location.search
		.replace(/^\?/, '')
		.split('&')
		.map(tok => tok.split('='))
		.map(k => ({ [k[0]]: decodeURIComponent(k[1]) }))
)
