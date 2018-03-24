<template>
	<div class="container">
		<div class="row pt-2">
			<div class="col-12">
				<h1 class="pr-2"><a href="https://github.com/maple3142/apps-script-db" target="_blank">{{$t('appname')}}</a> {{$t('editor')}}</h1>
				<loading :loading="loading"/>
			</div>
		</div>
		<div class="row pt-2">
			<div class="col-12">
				<url-input/>
			</div>
		</div>
		<div class="row pt-2">
			<div class="col-12">
				<data-list/>
			</div>
		</div>
	</div>
</template>
<script>
import UrlInput from '@/components/UrlInput'
import DataList from '@/components/DataList'
import Loading from '@/components/Loading'

export default {
	components: {
		UrlInput,
		DataList,
		Loading
	},
	computed: {
		loading() {
			return this.$store.state.loading
		}
	}
}
</script>
<style scoped>
h1{
	float: left;
}
</style>
