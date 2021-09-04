<template>
	<the-header></the-header>
	<base-container>
		<the-quote></the-quote>
		<router-view v-slot="props">
			<transition name="page" mode="out-in">
				<component :is="props.Component"></component>
			</transition>
		</router-view>
	</base-container>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheQuote from './components/TheQuote.vue';

import BaseContainer from './components/BaseContainer.vue';

export default {
	components: {
		TheHeader,
		TheQuote,
		BaseContainer,
	},
	data() {
		return {

		}
	},
	created() {
		this.$store.dispatch('autoAuth');
	}
}
</script>

<style>
	@import 'assets/css/reset.css';
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

	* {
		box-sizing: border-box;
	}

	.visually-hidden {
		position: absolute;
		clip: rect(0 0 0 0);
		width: 1px;
		height: 1px;
		margin: -1px;
	}

	body, input, textarea, button {
		background-color: #F4F7FE;
		font-family: 'Montserrat', sans-serif;
		font-weight: 400;
	}

	a {
		text-decoration: none;
	}

	.page-enter-active,
	.page-leave-active {
		transition: all .5s ease;
	}

	.page-enter-to, 
	.page-leave-from {
		opacity: 1;
	}

	.page-enter-from, 
	.page-leave-to {
		opacity: 0;
	}
</style>