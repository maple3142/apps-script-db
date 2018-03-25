const ADB = require('./')
const should = require('should')
const fetch = require('node-fetch')

if (!process.env.ADB_URL) throw new Error('Please set process.env.ADB_URL a db url')

const db = new ADB(process.env.ADB_URL, fetch)
describe('test', function() {
	it('set', async function() {
		await db.set('test', JSON.stringify({ a: 5 }))
	})
	it('get', async function() {
		JSON.parse(await db.get('test')).should.deepEqual({ a: 5 })
	})
	it('del', async function() {
		this.timeout(20000)
		await db.del('*')
		JSON.parse(await db.get()).should.deepEqual({})
	})
})
