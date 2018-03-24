import Vue from 'vue'
import Vuex from 'vuex'
import vjss from 'vuejs-storage'
import ADB from 'apps-script-db'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		url: '',
		db: null,
		data: [],
		loading: false
	},
	mutations: {
		UPDATE_URL: (state, { url }) => (state.url = url),
		UPDATE_DB: (state, { db }) => (state.db = db),
		UPDATE_DATA: (state, { data }) => (state.data = data),
		START_LOADING: state => (state.loading = true),
		STOP_LOADING: state => (state.loading = false)
	},
	actions: {
		GET_DB({ commit, state }) {
			if (!state.url) return
			commit('UPDATE_DB', { db: new ADB(state.url) })
		},
		async GET_DATA({ commit, state }) {
			if (!state.db) return
			commit('START_LOADING')
			const data = JSON.parse(await state.db.get('*'))

			commit('UPDATE_DATA', {
				data: Object.keys(data).map(key => ({
					key,
					value: data[key]
				}))
			})
			commit('STOP_LOADING')
		},
		async SET_VALUE({ commit, dispatch, state }, { key, value }) {
			if (!state.db) return
			commit('START_LOADING')
			await state.db.set(key, value)
			commit('STOP_LOADING')
			dispatch('GET_DATA')
		},
		async DEL_VALUE({ commit, dispatch, state }, { key }) {
			if (!state.db) return
			commit('START_LOADING')
			await state.db.del(key)
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
store.dispatch('GET_DB')
store.dispatch('GET_DATA')
export default store
