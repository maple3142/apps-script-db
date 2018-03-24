<template>
	<div class="container">
		<div class="row pt-2">
			<div class="col-12">
				<app-name/>
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
import AppName from '@/components/AppName'

export default {
	components: {
		UrlInput,
		DataList,
		AppName
	}
}
</script>
