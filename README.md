# Apps Script DB

> A module to prodive a simple key-value based database by [Google Apps Script](https://developers.google.com/apps-script/)

## Get Database Url

1. Go to [https://script.google.com/home](https://script.google.com/home)
2. Create a script with content of [db.js](https://github.com/maple3142/apps-script-db/blob/master/db.js) file and save with any project name you wants
3. Click "Publish" -> "Deploy as web app..."
4. Set "Who has access to the app:" to "Anyone, even anonymous"
5. Click "Deploy" and get the url

## Usage

> `npm i --save apps-script-db`

```javascript
const ADB = require('apps-script-db')
const db = new ADB(YOUR_DATABASE_URL)

(async ()=>{
  await db.set('key',{a: 5})
  await db.get('key') //{a: 5}
})()
```

## UI Database Editor

Url: [https://maple3142.github.io/apps-script-db/](https://maple3142.github.io/apps-script-db/)

The web app is on branch [`webui`](https://github.com/maple3142/apps-script-db/tree/webui), based on Vue.

## API

### `db.set(key: string,value: any)`

Set the value of `key` to `value`

### `db.get(key: string)`

Get the value of `key`

> if `key==='*'`, it will return an object of all values

### `db.del(key: string)`

Delete the value of `key`

> if `key==='*'`, it will **delete every things**
