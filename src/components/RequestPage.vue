<template>
	<div>
		<base-modal v-if="showModal" @closeModal="closeModal"></base-modal>
		<base-spinner v-if="showSpinner"></base-spinner>
		<request-item v-for="request in $store.state.requests" :key="request.id" v-bind="request">
		</request-item>
		<p v-if="!$store.state.requests.length && !showSpinner">You haven't received any requests yet!</p>
	</div>
</template>

<script>
import RequestItem from './RequestItem.vue';
import BaseModal from './BaseModal.vue';
import BaseSpinner from './BaseSpinner.vue';

export default {
	components: { 
		RequestItem,
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
	methods: {
		closeModal() {
			this.showModal = false;
		}
	}
}
</script>

<style>

</style>