<template>
	<main>
		<div class="container">
			<slot></slot>
		</div>
	</main>
</template>

<script>
export default {

}
</script>

<style scoped>
	.container {
		max-width: 1224px;
		margin: 0 auto;
		padding: 0 20px;
	}
</style>