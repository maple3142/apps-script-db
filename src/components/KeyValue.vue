<template>
	<div class="row">
		<div class="col-12">
			<x-input v-model="v">
				<span slot="prepend" class="input-group-text">{{k}}</span>
				<div slot="append" class="input-group-append">
					<button class="btn btn-primary" @click="update">Update</button>
					<button class="btn btn-danger" @click="del">Delete</button>
				</div>
			</x-input>
		</div>
	</div>
</template>
<script>
import XInput from '@/components/XInput'

export default {
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			k: this.data.key,
			v: this.data.value
		}
	},
	methods: {
		update() {
			if (!this.k || !this.v) return
			this.$store.dispatch('SET_VALUE', { key: this.k, value: this.v })
		},
		del() {
			if (!this.k) return
			this.$store.dispatch('DEL_VALUE', { key: this.k })
		}
	},
	components: {
		XInput
	}
}
</script>
