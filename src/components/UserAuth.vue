<template>
	<base-container>
		<base-spinner v-if="showSpinner"></base-spinner>
		<base-card>
				<section class="registration-form">
					<router-link class="back-page" to="/">Назад</router-link>

					<h3 v-if="signIn" class="registration-form__header">Авторизация</h3>
					<h3 v-else class="registration-form__header">Регистрация</h3>

					<form id="registration-form" action="#" method="POST" @submit.prevent="sendForm">
						<label for="email">Почта</label>
						<input 
							class="registration-form__input" 
							:class="{ input_error: 'email' in errors }" 
							type="email" 
							name="email" 
							v-model="userEmail"
						>
						<p 
							class="registration-form__error" v-if="'email' in errors"
						>{{ errors.email }}</p>

						<label for="password">Пароль</label>
						<input
							class="registration-form__input" 
							:class="{ input_error: 'password' in errors }"  
							name="password" 
							type="text" 
							v-model="userPassword"
						>
						<p 
							class="registration-form__error" v-if="'password' in errors"
						>{{ errors.password }}</p>

						<input 
						v-if="signIn"
						class="registration-form__submit" type="submit" value="Войти">
						<input
						v-else class="registration-form__submit" type="submit" value="Зарегистрироваться">

						<p>Перейти на страницу 
							<a href="#" v-if="signIn" @click.prevent="toggleSignIn">регистрации</a>
							<a href="#" v-else @click.prevent="toggleSignIn">авторизации</a>
						</p>
					</form>
					<transition name="modal">
						<base-modal v-if="errors.message" @closeModal="closeModal">
							<p>{{ errors.message }}</p>
						</base-modal>
					</transition>
				</section>
		</base-card>
	</base-container>
</template>

<script>
import BaseSpinner from './BaseSpinner.vue';
import BaseModal from './BaseModal.vue';
import BaseContainer from './BaseContainer.vue';
import BaseCard from './BaseCard.vue';

export default {
	components: {
		BaseSpinner,
		BaseModal,
		BaseContainer,
		BaseCard,
	},
	data() {
		return {
			signIn: true,
			userEmail: '',
			userPassword: '',
			errors: {},
			showSpinner: false,
		}
	},
	methods: {
		toggleSignIn() {
			this.signIn = !this.signIn 
		},
		async sendForm() {
			if (this.validateForm()) {
				const data = {...this.$data, coachId: this.$route.params.id };
				delete data.errors;

				this.showSpinner = true;
				
				try {
					if (this.signIn) {
						await this.$store.dispatch('authUser', data);
					} else {
						await this.$store.dispatch('registerUser', data);
					}
					const redirectUrl = '/' + (this.$route.query.redirect || 'coaches'); 
					this.redirectTo(redirectUrl);
				} catch (err) {
					this.errors.message = err.message;
				}
			
				this.showSpinner = false;
			}
		},
		validateForm() {
			this.errors = {};

			if (!this.userEmail || !this.userEmail.includes('@') && !this.userEmail.includes('.')) {
				this.errors.email = 'Поле "Почта" должно быть заполнено и содержать символы "@" and "."';
			}
			if (!this.userPassword || this.userPassword.length < 6) {
				this.errors.password = 'Поле "Пароль" не должно быть пустым или содержать менее 6 символов';
			}

			return !Object.keys(this.errors).length;
		},
		redirectTo(address) {
			this.$router.replace(address);
		},
		closeModal() {
			delete this.errors.message;
		}
	}
}
</script>

<style scoped>
	#registration-form {
		display: flex;
		flex-direction: column;
		max-width: 300px;
	}
	#registration-form p {
		line-height: 18px;
	}
	#registration-form label {
		color: #2B3674;
		font-size: 18px;
	}
	#registration-form label,
	#registration-form input,
	#registration-form p {
		margin-bottom: 15px;
	}
	.registration-form__header {
		font-size: 20px;
		line-height: 32px;
		margin-bottom: 15px;
		color: #707EAE;
	}

	.registration-form__input {
		border: 1px solid #c7cee0;
		border-radius: 5px;
		font-size: 18px;
		line-height: 22px;
		padding: 13px 18px;
		color: #2B3674;
	}

	.registration-form__input::-webkit-input-placeholder { 
		color: #707EAE;
		opacity: .6;
	}

	.registration-form__input:focus {
		outline: none;
		border: 1px solid #4318FF;
	}

	.input_error {
		border: 1px solid #E31A1A !important;
	}

	.input_error::-webkit-input-placeholder { 
		color: #E31A1A;
	}

	.registration-form__error {
		color: #E31A1A;
	}

	.registration-form__submit {
		background: #4318FF;
		color: white;
		border: none;
		border-radius: 5px;
		font-size: 18px;
		line-height: 22px;
		padding: 13px 18px;
		cursor: pointer;
	}

	.back-page {
		display: inline-block;
		position: relative;
		left: 22px;
		font-weight: 600;
		font-size: 16px;
		line-height: 32px;
		color: #4318FF;
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