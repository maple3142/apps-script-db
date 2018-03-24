<template>
	<div class="input-group">
		<div class="input-group-prepend">
			<slot name="prepend"/>
		</div>
		<input class="form-control" v-model="text" type="text" @keyup.enter="$emit('enter')">
		<div class="input-group-append">
			<slot name="append"/>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		value: {
			type: String,
			required: true
		}
	},
	data(){
		return {
			text: this.value
		}
	},
	watch: {
		text(v) {
			this.$emit('input', v)
		}
	}
}
</script>
