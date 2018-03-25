function doGet(e) {
	const P = PropertiesService.getScriptProperties()
	const type = e.parameter.type
	const key = e.parameter.key
	if (key === '*') {
		Logger.log('Get: *')
		return reply(JSON.stringify(P.getProperties()))
	} else if (typeof key !== 'undefined') {
		Logger.log('Get: %s', key)
		return reply(P.getProperty(key))
	}
}
function doPost(e) {
	const P = PropertiesService.getScriptProperties()
	const key = e.parameter.key
	const value = e.parameter.value
	const del = e.parameter.del
	if (typeof del !== 'undefined') {
		Logger.log('Delete: %s', del)
		if (del === '*') P.deleteAllProperties()
		else P.deleteProperty(del)
		return reply('success')
	} else if (typeof key !== 'undefined' && typeof value !== 'undefined') {
		Logger.log('Set: %s=%s', key, value)
		P.setProperty(key, value)
		return reply('success')
	} else return reply('error')
}
function reply(o) {
	return ContentService.createTextOutput(o)
}
