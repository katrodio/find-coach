<template>
	<section class="filter">
		<h2 class="filter__header">Фильтр</h2>
		<template v-for="spec in $store.state.specializations" :key="spec.id">
			<label class="check" :for="spec.id">
				<input 
					class="check__input" 
					type="checkbox" 
					:name="spec.id" 
					:id="spec.id"  
					:checked="spec.active"
					@click="toggleSpec" 
				>
				<span class="check__box"></span>
				{{ spec.name }}
			</label>
		</template>
	</section>
</template>

<script>
export default {
	methods: {
		toggleSpec(e) {
			this.$store.commit('specializations/toggleSpecializationStatus', e.target.id);
		}
	}
}
</script>

<style scoped>
	.filter {
		background-color: #ffffff;
		padding: 20px;
		border-radius: 5px;
		max-width: 700px;
		margin: 0 auto;
	}
	.filter__header {
		font-size: 18px;
		line-height: 32px;
		margin-bottom: 10px;
		color: #707EAE;
	}

	.check {
		display: inline-block;
		font-size: 20px;
		padding-left: 1.2em;
		margin-right: 0.8em;
		margin-bottom: 0.8em;
		cursor: pointer;
	}
	.check__input {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
	.check__box {
		position: absolute;
		margin-left: -1.2em;
		width: 1em;
		height: 1em;
		background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="20" height="20" rx="5" fill="%23E9EDF7"/%3E%3C/svg%3E%0A');
		background-repeat: no-repeat;
		background-size: contain;
	}
	.check__input:checked + .check__box {
		background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="20" height="20" rx="5" fill="%23E9EDF7"/%3E%3Cpath d="M4 10.5L8.5 15L16 4.5" stroke="%234318FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E%0A');
	}
	.check__input:focus + .check__box {
		background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Crect x="0.5" y="0.5" width="19" height="19" rx="4.5" fill="%23E9EDF7" stroke="%234318FF"/%3E%3C/svg%3E ');
	}
	.check__input:checked:focus + .check__box {
		background-image: url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Crect x="0.5" y="0.5" width="19" height="19" rx="4.5" fill="%23E9EDF7" stroke="%234318FF"/%3E%3Cpath d="M4 10.5L8.5 15L16 4.5" stroke="%234318FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E%0A');
	}
</style>