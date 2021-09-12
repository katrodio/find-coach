<template>
	<base-card>
		<router-link to="/" class="back-page">Вернуться на главную</router-link>
		<p>Страница не найдена</p>
	</base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
	components: {
		BaseCard,
	},
};
</script>

<style>
	.back-page {
		display: inline-block;
		position: relative;
		left: 22px;
		font-weight: 600;
		font-size: 16px;
		line-height: 32px;
		color: #4318ff;
		text-decoration: none;
		margin-bottom: 20px;
	}
	.back-page::before {
		content: '';
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M3 13L17.17 13L13.59 16.59L15 18L21 12L15 6L13.59 7.41L17.17 11L3 11L3 13Z" fill="%234318FF"/%3E%3C/svg%3E');
		transform: rotate(180deg);
		width: 24px;
		height: 24px;
		top: 4px;
		left: -30px;
		position: absolute;
		display: inline-block;
		margin-bottom: 20px;
	}
</style>