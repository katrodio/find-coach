<template>
	<div>
		<coach-filter></coach-filter>
		<section class="coach-panel">
			<button class="refresh-button" @click="updateData(true)">Обновить</button>
			<router-link
				class="register-button"
				v-if="
					$store.state.auth.idToken &&
					!$store.getters['coaches/isCoachCurrentUser']
				"
				to="/registration"
			>
				Зарегистрировать тренера
			</router-link>
			<router-link
				class="login-button"
				v-if="!$store.state.auth.idToken"
				to="/auth?redirect=registration"
			>
				Войти, чтобы зарегистрировать тренера
			</router-link>
		</section>

		<base-spinner v-if="$store.state.coaches.showSpinner"></base-spinner>

		<coach-list></coach-list>

		<teleport to="#app">
			<transition name="modal">
				<base-modal
					v-if="$store.state.coaches.showModal"
					@closeModal="closeModal"
				>
					<p>Тренеры не найдены!</p>
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
		return {};
	},
	methods: {
		async updateData(refresh = false) {
			if (!refresh && !this.$store.getters['coaches/shouldUpdate']) {
				return;
			}

			this.$store.commit('coaches/toggleSpinner', true);

			const response = await this.$store.dispatch('coaches/loadData');

			if (!response) {
				this.$store.commit('coaches/toggleModal', true);
				this.$store.commit('coaches/toggleSpinner', false);
				return;
			}

			this.$store.commit('coaches/toggleSpinner', false);

			this.$store.commit('coaches/updateTimeStamp');
		},
		closeModal() {
			this.$store.commit('coaches/toggleModal', false);
		},
	},
};
</script>

<style>
.coach-panel {
	max-width: 700px;
	margin: 20px auto 0;
	display: flex;
	justify-content: space-between;
}
.register-button,
.login-button,
.refresh-button {
	display: inline-block;
	background: #4318ff;
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	line-height: 22px;
	padding: 13px 18px;
	cursor: pointer;
	text-align: center;
}
@media screen and (max-width: 561px) {
	.coach-panel {
		flex-direction: column-reverse;
	}
	.register-button,
	.login-button {
		margin-bottom: 10px;
	}
}
</style>