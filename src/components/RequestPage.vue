<template>
	<div>
		<base-modal v-if="showModal" @closeModal="closeModal">
			<p>Истек срок<br>аутентификации. <br>Войдите заново</p>
		</base-modal>
		<base-spinner v-if="showSpinner"></base-spinner>
		<request-item v-for="request in $store.state.requests" :key="request.id" v-bind="request">
		</request-item>
		<base-card 
			v-if="!$store.state.requests.length && !showSpinner">
			Вы еще не получили ни одного запроса
		</base-card>
	</div>
</template>

<script>
import RequestItem from './RequestItem.vue';
import BaseCard from './BaseCard.vue';
import BaseModal from './BaseModal.vue';
import BaseSpinner from './BaseSpinner.vue';

export default {
	components: { 
		RequestItem,
		BaseCard,
		BaseModal,
		BaseSpinner,
	},
	data() {
		return {
			showModal: false,
			showSpinner: false,
		}
	},
	async created() {
		this.showSpinner = true;

		const response = await fetch(
			`https://findcoach-d3a2e-default-rtdb.firebaseio.com/requests/${this.$store.state.auth.currentUserId}.json?auth=${this.$store.state.auth.idToken}`,
			{
				method: 'GET',
			}
		)

		if (!response.ok) {
			this.showModal = true;
			this.showSpinner = false;
			return;
		}

		const requestData =	await response.json();

		this.showSpinner = false;

		this.$store.commit('requests/addRequestData', requestData);
	},
	watch: {
		showModal() {
			if (!this.showModal) {
				this.$store.commit('logoutUser');
				this.$router.push('/auth');
			}
		}
	},
	methods: {
		closeModal() {
			this.showModal = false;
		}
	}
}
</script>

<style>

</style>