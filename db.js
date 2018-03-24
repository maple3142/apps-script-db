function doGet(e) {
	const P = PropertiesService.getScriptProperties()
	const type = e.parameter.type
	const key = e.parameter.key
	if (!key || key === '*') {
		Logger.log('Get: *')
		return reply(JSON.stringify(P.getProperties()))
	} else {
		Logger.log('Get: %s', key)
		return reply(P.getProperty(key))
	}
}
function doPost(e) {
	const P = PropertiesService.getScriptProperties()
	const key = e.parameter.key
	const value = e.parameter.value
	const del = e.parameter.del
	if (del) {
		Logger.log('Delete: %s', del)
		if (del === '*') P.deleteAllProperties()
		else P.deleteProperty(del)
		return reply('success')
	} else if (key && value) {
		Logger.log('Set: %s=%s', key, value)
		P.setProperty(key, value)
		return reply('success')
	} else return reply('error')
}
function reply(o) {
	return ContentService.createTextOutput(o)
}
