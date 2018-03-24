import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue/dist/vue.runtime.esm.js'

import App from '@/components/App'
import store from '@/store'
import { i18n, loadLanguage } from '@/i18n'

const app = new Vue({
	el: '#app',
	render: h => h(App),
	store,
	i18n
})
loadLanguage(navigator.language).then(x=>console.log(`Language loaded: ${x}`))
