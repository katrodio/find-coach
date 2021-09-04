<template>
	<base-container>
		<base-card>
			<section class="registration-form">
				<router-link class="back-page" to="/">Назад</router-link>

				<h3 class="registration-form__header">Регистрация нового тренера</h3>

				<form id="registration-form" action="#" method="POST" @submit.prevent="sendForm">
					<label for="name">Имя</label>
					<input 
						class="registration-form__input" 
						:class="{ input_error: 'name' in errors }" 
						type="text" 
						name="name" 
						id="name" 
						v-model="name"
					>
					<p class="registration-form__error" v-if="'name' in errors">{{ errors.name }}</p>

					<label for="lastName">Фамилия</label>
					<input 
						class="registration-form__input" 
						:class="{ input_error: 'lastName' in errors }" 
						type="text" 
						name="lastName" 
						id="lastName" 
						v-model="lastName"
					>
					<p class="registration-form__error" v-if="'lastName' in errors">{{ errors.lastName }}</p>
					
					<label for="price">Стоимость</label>
					<input 
						class="registration-form__input"
						:class="{ input_error: 'price' in errors }" 
						type="number" 
						name="price" 
						id="price" 
						v-model="price"
					>
					<p class="registration-form__error" v-if="'price' in errors">{{ errors.price }}</p>
					
					<label for="description">Описание</label>
					<input 
						class="registration-form__input" 
						:class="{ input_error: 'description' in errors }" 
						type="textarea" 
						name="description" 
						id="description" 
						v-model="description"
					>
					<p class="registration-form__error" v-if="'description' in errors">{{ errors.description }}</p>

					<label>Специализация</label>
					<template v-for="spec in $store.state.specializations" :key="spec.id">
						<label class="check" :for="spec.id">
							<input 
								class="check__input" 
								type="checkbox" 
								:name="spec.id" 
								:id="spec.id"
								:value="spec.id"
								@click="toggleSpec"
								v-model="specializations" 
							>
							<span class="check__box"></span>
							{{ spec.name }}
						</label>
					</template>
					<p class="registration-form__error" v-if="'specializations' in errors">{{ errors.specializations }}</p>

					<input class="registration-form__submit" type="submit" value="Зарегистрироваться">
				</form>

				<base-modal v-if="errors.message" @closeModal="closeModal">
					<p>{{ errors.message }}</p>
				</base-modal>
			</section>
		</base-card>
	</base-container>
</template>

<script>
	import BaseModal from './BaseModal.vue';
	import BaseContainer from './BaseContainer.vue';
	import BaseCard from './BaseCard.vue';

	export default {
		components: {
			BaseModal,
			BaseContainer,
			BaseCard,
		},
		data() {
			return {
				name: '',
				lastName: '',
				price: '',
				description: '',
				specializations: [],
				errors: {},
			}
		},
		methods: {
			async sendForm() {
				if (this.validateForm()) {
					const data = {...this.$data, specializations: {...this.specializations}};
					delete data.errors;
					try {
						await this.$store.dispatch('coaches/registerNewCoach', data);
						this.redirectTo('/');
					} catch (err) {
						this.errors.message = err.message;
					}
				}
			},
			validateForm() {
				this.errors = {};

				if (!this.name || this.name.length <= 1) {
					this.errors.name = 'Поле "Имя" не должно быть пустым или содержать менее 2 букв'
				}
				if (!this.lastName || this.lastName.length <= 1) {
					this.errors.lastName = 'Поле "Фамилия" не должно быть пустым или содержать менее 2 букв'
				}
				if (!this.price || this.price.length < 0) {
					this.errors.price = 'Поле "Стоимость" не должно быть пустым или содержать значение меньше нуля'
				}
				if (!this.description) {
					this.errors.description = 'Поле "Описание" не должно быть пустым'
				}
				if (this.specializations.length === 0) {
					this.errors.specializations = 'Вы должны выбрать как минимум одну специализацию'
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

	.check {
		font-size: 20px;
		padding-left: 1.2em;
		margin-right: 0.6em;
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