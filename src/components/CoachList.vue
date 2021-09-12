<template>
	<section class="coach-list">
		<h2 class="visually-hidden">Список тренеров</h2>
		<coach-item v-for="coach in filteredCoaches" :key="coach.id" v-bind="coach"></coach-item>
	</section>
</template>

<script>
import CoachItem from './CoachItem.vue';

export default {
	components: { 
		CoachItem,
	},
	computed: {
		filteredCoaches() {
			return this.$store.state.coaches.coachesData.filter(coachObj => {
				return coachObj.specializations.some(specId => this.isActiveSpecById(specId)) 
			})
		}
	},
	methods: {
		isActiveSpecById(specId) {
			return this.$store.state.specializations.some(
				specObj => (specObj.id === specId) && specObj.active
			);
		},
	}
}
</script>

<style scoped>	

</style>