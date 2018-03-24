<template>
	<div>
		<x-input v-model="url" @enter="update(url)">
			<span slot="prepend" class="input-group-text" @click="copy(url)">{{$t('dburl')}}</span>
			<button slot="append" class="btn btn-primary" @click="update(url)">{{$t('load')}}</button>
		</x-input>
	</div>
</template>
<script>
import XInput from '@/components/XInput'
import { copy } from '@/utils'
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
			this.$store.dispatch('GET_DATA').catch(() => {
				this.$store.commit('STOP_LOADING')
				this.$store.commit('UPDATE_DATA', { data: [] })
				alert('Not a database url!')
			})
		},
		copy(url) {
			const { protocol, hostname, port, pathname } = location
			let ar = [protocol, '//', hostname]
			if (port !== 80) ar = ar.concat([':', port])
			ar = ar.concat([pathname], '?url=', encodeURIComponent(url))
			const str = ar.join('')
			const r = copy(str)
			if (!r) prompt(this.$t('copy.failed'), str)
			else alert(this.$t('copy.success'))
		}
	},
	components: {
		XInput
	}
}
</script>
