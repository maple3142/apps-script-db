<template>
	<div class="row">
		<div class="col-12">
			<key-value :class="{'pt-2':idx>0}" v-for="(d,idx) in data" :key="d.key" :data="d"/>
			<div class="row pt-2" v-if="data">
				<div class="col-12">
					<button class="btn btn-primary w-100" @click="add">{{$t('add')}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import KeyValue from '@/components/KeyValue'

export default {
	computed: {
		data() {
			return this.$store.state.data
		}
	},
	methods: {
		add() {
			const key = prompt(this.$t('key.add'))
			if (!key) return
			const hasDuplicate = this.$store.state.data.filter(d => d.key === key).length > 0
			if (hasDuplicate) alert(this.$t('key.duplicate', { key }))
			else this.$store.dispatch('SET_VALUE', { key, value: '' })
		}
	},
	components: {
		KeyValue
	}
}
</script>
