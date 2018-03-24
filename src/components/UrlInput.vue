<template>
	<div>
		<x-input v-model="url">
			<span slot="prepend" class="input-group-text">Database url</span>
			<button class="btn btn-primary" @click="update(url)" slot="append">Fetch</button>
		</x-input>
	</div>
</template>
<script>
import XInput from '@/components/XInput'
import { setTimeout } from 'timers'

export default {
	data() {
		return {
			url: this.$store.state.url
		}
	},
	methods: {
		update(url) {
			this.$store.commit('UPDATE_URL', { url })
			this.$store.dispatch('GET_DB')
			this.$store.dispatch('GET_DATA').catch(() => {
				this.$store.commit('UPDATE_DATA', { data: [] })
				this.$nextTick(() => setTimeout(() => alert('Not a database url!'), 50))
			})
		}
	},
	components: {
		XInput
	}
}
</script>
