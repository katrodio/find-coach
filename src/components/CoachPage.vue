<template>
	<div>
		<coach-filter></coach-filter>
		<section class="coach-panel">
			<button class="refresh-button" @click="loadData(true)">Обновить</button>
			<router-link 
				class="register-button"
				v-if="$store.state.auth.idToken && !$store.getters['coaches/isCoachCurrentUser']"
				to="/registration">
				Зарегистрировать тренера
			</router-link>
			<router-link 
				class="login-button"
				v-if="!$store.state.auth.idToken"
				to="/auth?redirect=registration">
				Войти, чтобы зарегистрировать тренера
			</router-link>
		</section>

		<base-spinner v-if="showSpinner"></base-spinner>

		<coach-list></coach-list>

		<teleport to="#app">
			<transition name="modal">
				<base-modal v-if="showModal" @closeModal="closeModal">
					<p>Coaches not found!</p>
				</base-modal>
			</transition>
		</teleport>
	</div>
</template>

<script>
import CoachFilter from './CoachFilter.vue';
import CoachList from './CoachList.vue';
import BaseModal from './BaseModal.vue';
import BaseSpinner from './BaseSpinner.vue';

export default {
  components: { 
		CoachFilter,
		CoachList,
		BaseModal, 
		BaseSpinner,
	},
	data() {
		return {
			showSpinner: false,
			showModal: false,
		}
	},
	created() {
		this.loadData()
	},
	methods: {
		async loadData(refresh = false) {
			if (!refresh && !this.$store.getters['coaches/shouldUpdate']) {
				return;
			}
		
			this.showSpinner = true;

			const response = await fetch(
				`https://findcoach-d3a2e-default-rtdb.firebaseio.com/coaches.json`, 
				{
					method: 'GET'
				}
			);

			if (!response.ok) {
				this.showModal = true;
				this.showSpinner = false;
				return;
			}
			const coachesData =	await response.json();

			this.showSpinner = false;

			this.$store.commit('coaches/addCoachesData', coachesData);

			this.$store.commit('coaches/updateTimeStamp');
		},
		closeModal() {
			this.showModal = false;
		},
	}
}
</script>

<style>
	.coach-panel {
		max-width: 700px;
    margin: 20px auto 0;
		display: flex;
		justify-content: space-between;
	}
	.register-button, .login-button, .refresh-button {
		display: inline-block;
		background: #4318FF;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		line-height: 22px;
		padding: 13px 18px;
		cursor: pointer;
	}
</style>