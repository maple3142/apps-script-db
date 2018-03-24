import Vue from 'vue'
import Vuex from 'vuex'
import vjss from 'vuejs-storage'
import ADB from 'apps-script-db'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		url: '',
		data: [],
		loading: false
	},
	mutations: {
		UPDATE_URL: (state, { url }) => {
			state.url = url
		},
		UPDATE_DATA: (state, { data }) => (state.data = data),
		START_LOADING: state => (state.loading = true),
		STOP_LOADING: state => (state.loading = false)
	},
	actions: {
		async GET_DATA({ commit, state }) {
			if (!state.url) return
			const db = new ADB(state.url)
			commit('START_LOADING')
			const data = JSON.parse(await db.get('*'))

			commit('UPDATE_DATA', {
				data: Object.keys(data).map(key => ({
					key,
					value: data[key]
				}))
			})
			commit('STOP_LOADING')
		},
		async SET_VALUE({ commit, dispatch, state }, { key, value }) {
			if (!state.url) return
			const db = new ADB(state.url)
			commit('START_LOADING')
			await db.set(key, value)
			commit('STOP_LOADING')
			dispatch('GET_DATA')
		},
		async DEL_VALUE({ commit, dispatch, state }, { key }) {
			if (!state.url) return
			const db = new ADB(state.url)
			commit('START_LOADING')
			await db.del(key)
			commit('STOP_LOADING')
			dispatch('GET_DATA')
		}
	},
	plugins: [
		vjss({
			namespace: 'store',
			keys: ['url']
		})
	]
})
export default store
