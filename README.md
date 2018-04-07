# Apps Script DB

> A module to provide a simple key-value based database by [Google Apps Script](https://developers.google.com/apps-script/)

## Get Database URL

1. Go to [https://script.google.com/home](https://script.google.com/home)
2. Create a script with content of [db.js](https://github.com/maple3142/apps-script-db/blob/master/db.js) file and save with any project name you want
3. Click "Publish" -> "Deploy as web app..."
4. Set "Who has access to the app:" to "Anyone, even anonymous"
5. Click "Deploy" and copy the URL

## Usage

### Node

> `npm i --save apps-script-db`

```js
const ADB = require('apps-script-db')
const fetch = require('node-fetch')
const db = new ADB(YOUR_DATABASE_URL, fetch)

(async ()=>{
  await db.set('key', {a: 5})
  await db.get('key') //{a: 5}
})()
```

### Browser

```html
<script src="https://unpkg.com/apps-script-db"></script>
<script>
const db = new ADB(YOUR_DATABASE_URL)
</script>
```

## UI Database Editor

URL: [https://maple3142.github.io/apps-script-db/](https://maple3142.github.io/apps-script-db/)

The web app is on branch [`webui`](https://github.com/maple3142/apps-script-db/tree/webui), based on [Vue](https://github.com/vuejs/vue).

## API

### `db.set(key: string, value: string)`

Set the value of `key` to `value`

### `db.get(key: string)`

Get the value of `key`

> if `key === '*'`, it will return an object with all values

### `db.del(key: string)`

Delete the value of `key`

> if `key === '*'`, it will **delete everything**
