export function copy(str) {
	const ta = document.createElement('textarea')
	ta.value = str
	document.body.appendChild(ta)
	ta.focus()
	ta.select()

	let result
	try {
		result = document.execCommand('copy')
	} catch (err) {
		result = false
	}

	document.body.removeChild(ta)
	return result
}
