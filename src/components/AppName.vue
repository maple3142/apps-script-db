<template>
	<div class="block">
		<h1 class="pr-2 block-item"><a href="https://github.com/maple3142/apps-script-db" target="_blank">{{$t('appname')}}</a> {{$t('editor')}}</h1>
		<div class="block-item"><loading :loading="$store.state.loading"/></div>
	</div>
</template>
<script>
import Loading from '@/components/Loading'

export default {
	components: { Loading }
}
</script>

<style scoped>
.block:before {
	content: '';
	display: inline-block;
	vertical-align: middle;
	height: 100%;
}
.block-item {
	display: inline-block;
	vertical-align: middle;
}
</style>
