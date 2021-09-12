<template>
	<base-card>
		<template v-if="coachDetails">
			<router-link to="/" class="back-page">Назад</router-link>
			<div class="coach-info">
				<div class="coach-info__avatar">
					<img :src="avatarPath" alt="avatar" />
				</div>
				<div class="coach-info__text">
					<p class="full-name">{{ coachDetails.fullName }}</p>
					<p class="price">{{ coachDetails.price }} руб/час</p>
				</div>
			</div>

			<ul class="specialization">
				<li
					class="specialization__item"
					v-for="spec in coachDetails.specializations"
					:key="spec"
				>
					{{ spec }}
				</li>
			</ul>
			<div class="description">
				<h2 class="description-header">О тренере</h2>
				<p class="description-text">{{ coachDetails.description }}</p>
			</div>

			<button class="contact-button" @click="toggleFormContact">
				Написать тренеру
			</button>

			<coach-contact v-show="isShowForm"></coach-contact>
		</template>
	</base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';
import CoachContact from './CoachContact.vue';

export default {
	components: {
		CoachContact,
		BaseCard,
	},
	data() {
		return {
			isShowForm: false,
		};
	},
	methods: {
		toggleFormContact() {
			this.isShowForm = !this.isShowForm;
		},
	},
	computed: {
		coachDetails() {
			if (!this.$store.state.coaches.isCoachesDataLoaded) {
				return;
			}

			const coachGetter = this.$store.getters['coaches/getCoachById'];

			const specGetter =
				this.$store.getters['specializations/stringSpecializations'];

			const coachObj = coachGetter(this.$route.params.id);

			const coachSpecializations = specGetter(coachObj.specializations);

			return {
				fullName: coachObj.name + ' ' + coachObj.lastName,
				price: coachObj.price,
				gender: coachObj.gender,
				specializations: coachSpecializations,
				description: coachObj.description,
			};
		},
		avatarPath() {
			if (!this.$store.state.coaches.isCoachesDataLoaded) {
				return;
			}

			if (!this.coachDetails.gender) {
				return;
			}
			return require(`../assets/images/${this.coachDetails.gender}.svg`);
		},
	},
};
</script>

<style scoped>
.full-name {
	font-size: 28px;
	font-weight: 600;
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

.name,
.last-name {
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
	margin-bottom: 5px;
	font-size: 18px;
	font-weight: 600;
	line-height: 32px;
	color: #ffffff;
	background: linear-gradient(135deg, #868cff 0%, #4318ff 100%);
	border-radius: 20px;
}

.description {
	margin-bottom: 20px;
}

.description-header {
	font-size: 18px;
	line-height: 32px;
	margin-bottom: 10px;
	color: #707eae;
}

.description-text {
	font-size: 20px;
	line-height: 30px;
}

.contact-button {
	display: inline-block;
	background: #4318ff;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	line-height: 22px;
	padding: 13px 18px;
	cursor: pointer;
	margin-bottom: 20px;
}

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
	right: 52px;
	position: absolute;
	display: inline-block;
	margin-bottom: 20px;
}
</style>