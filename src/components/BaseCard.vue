<template>
	<article class="base-card">
		<slot></slot>
	</article>
</template>

<script>
export default {

}
</script>

<style scoped>
	.base-card {
		width: 80%;
		max-width: 700px;
		margin: 0 auto;
		margin-top: 20px;
		padding: 30px 20px;
		background-color: #ffffff;
		color: #2B3674;
		border-radius: 5px;
	}
</style>

