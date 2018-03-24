/*
this script should be run on google apps script
1. Go to https://script.google.com/home
2. Create a script with content of current file and save with any project name you wants
3. Click "Publish" -> "Deploy as web app..."
4. Set "Who has access to the app:" to "Anyone, even anonymous"
5. Click "Deploy" and get the url
*/

function doGet(e) {
	Logger.log('Get: ', e.parameter)
	const P = PropertiesService.getScriptProperties()
	const type = e.parameter.type
	const key = e.parameter.key
	if (!key || key === '*') {
		Logger.log('Get: *')
		return reply(P.getProperties())
	} else {
		Logger.log('Get: %s', key)
		return ContentService.createTextOutput(P.getProperty(key))
	}
}
function doPost(e) {
	Logger.log('Post: ', e.parameter)
	const P = PropertiesService.getScriptProperties()
	const key = e.parameter.key
	const value = e.parameter.value
	const del = e.parameter.del
	if (del) {
		Logger.log('Delete: %s', del)
		if (del === '*') P.deleteAllProperties()
		else P.deleteProperty(del)
		return reply({ msg: 'success' })
	} else if (key && value) {
		Logger.log('Set: %s=%s', key, value)
		P.setProperty(key, value)
		return reply({ msg: 'success' })
	} else return reply({ msg: 'error' })
}
function reply(o) {
	return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)
}
