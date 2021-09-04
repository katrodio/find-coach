<template>
	<base-card>
		<h2 class="request-item-header">Кому</h2>
		<h4 class="full-name">{{ coachName }} {{ coachLastName}}</h4>

		<h2 class="request-item-header">Почта пользователя</h2>
		<h5 class="email">{{ userEmail }}</h5>

		<h2 class="request-item-header">Сообщение пользователя</h2>
		<p class="message">{{ userMessage }}</p>

		<h2 class="request-item-header">Дата запроса</h2>
		<p class="request-data">{{ convertData }}</p>
	</base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
	components: {
		BaseCard
	},
	props: [
		"id",
		"coachName",
		"coachLastName",
		"userEmail",
		"userMessage",
		"createdAt",
	],
	computed: {
		convertData() {
			const options = { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric',  
				hour: 'numeric', 
				minute: 'numeric',
				second: 'numeric', 
			}
			return new Date(this.createdAt).toLocaleString('ru-RU', options);
		}
	}
}
</script>

<style>
	.request-item-header {
		font-size: 18px;
		line-height: 32px;
		margin-bottom: 5px;
		color: #707EAE;
	}
	.full-name, .email, .message, .request-data {
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 20px;
	}

</style>