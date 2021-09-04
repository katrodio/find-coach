<template>
	<base-card>
		<div class="coach-info">
			<div class="coach-info__avatar">
				<img src="../assets/images/male.svg" alt="avatar">
			</div>
			<div class="coach-info__text">
				<p class="full-name">
					<span class="name">{{ name }}</span>
					<span class="last-name">{{ lastName }}</span>
				</p>
				<p class="price">{{ price }} руб/час</p>
			</div>
		</div>
		<ul class="specialization">
			<li 
				class="specialization__item"
				v-for="spec in $store.getters['specializations/stringSpecializations'](specializations)" 
				:key="spec">
				{{ spec }}
			</li>
		</ul>
		<router-link class="details-page" :to="coachDetailURL" >Подробная информация</router-link>
	</base-card>
</template>

<script>
import BaseCard from './BaseCard.vue'
export default {
  components: { BaseCard },
	props: [
		"id",
		"name",
		"lastName",
		"price",
		"specializations",
		"description",
	],
	computed: {
		coachDetailURL() {
			return '/coaches/' + this.id;
		}
	},
}
</script>

<style scoped>
	.full-name {
		margin-bottom: 10px;
	}
	.coach-info,
	.specialization {
		margin-bottom: 20px;
	}
	.coach-info {
		display: flex;
		align-items: center;
	}
	.coach-info__text {
		margin-left: 10px;
	}
	.coach-info__avatar img {
		width: 100px;
	}

	.name, .last-name {
		font-size: 28px;
		font-weight: 600;
		margin-right: 5px;
	}

	.price {
		font-size: 16px;
	}

	.specialization__item {
		display: inline-block;
		padding: 8px 16px;
		margin-right: 5px;
		font-size: 18px;
		font-weight: 600;
		line-height: 32px;
		color: #FFFFFF;
		background: linear-gradient(135deg, #868CFF 0%, #4318FF 100%);
		border-radius: 20px;
	}

	.details-page {
		position: relative;
		font-weight: 600;
		font-size: 16px;
		line-height: 32px;
		color: #4318FF;
		text-decoration: none;
	}
	.details-page::after {
		content: '';
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M3 13L17.17 13L13.59 16.59L15 18L21 12L15 6L13.59 7.41L17.17 11L3 11L3 13Z" fill="%234318FF"/%3E%3C/svg%3E');
		width: 24px;
		height: 24px;
		top: -1px;
		right: -26px;
		position: absolute;
		display: inline-block;
	}

</style>