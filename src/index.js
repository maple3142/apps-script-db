import 'bootstrap/dist/css/bootstrap.css'

import  Vue from 'vue'

import App from '@/components/App'
import store from '@/store'

new Vue({
	el: '#app',
	render: h => h(App),
	store
})
