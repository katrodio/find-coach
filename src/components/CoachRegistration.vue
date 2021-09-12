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
					
					<label>Пол</label>
					<label class="radio">
						<input 
							class="radio__input" 
							type="radio" 
							name="gender"
							value="male"
							v-model="gender">
						<span class="radio__box"></span>
						Мужской
					</label>
					<label class="radio">
						<input 
							class="radio__input" 
							type="radio" 
							name="gender"
							value="female"
							v-model="gender">
						<span class="radio__box"></span>
						Женский
					</label>
					<p class="registration-form__error" v-if="'gender' in errors">{{ errors.gender }}</p>

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
					
					<label for="description">О себе</label>
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
				gender: '',
				price: '',
				description: '',
				specializations: [],
				errors: {},
			};
		},
		methods: {
			async sendForm() {
				if (this.validateForm()) {
					const data = {
						...this.$data,
						specializations: { ...this.specializations },
					};
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
					this.errors.name =
						'Поле "Имя" не должно быть пустым или содержать менее 2 букв';
				}
				if (!this.lastName || this.lastName.length <= 1) {
					this.errors.lastName =
						'Поле "Фамилия" не должно быть пустым или содержать менее 2 букв';
				}
				if (!this.gender) {
					this.errors.gender =
					'Вам необходимо выбрать пол';
				}
				if (!this.price || this.price.length < 0) {
					this.errors.price =
						'Поле "Стоимость" не должно быть пустым или содержать значение меньше нуля';
				}
				if (!this.description) {
					this.errors.description = 'Поле "О себе" не должно быть пустым';
				}
				if (this.specializations.length === 0) {
					this.errors.specializations =
						'Вам необходимо выбрать как минимум одну специализацию';
				}

				return !Object.keys(this.errors).length;
			},
			redirectTo(address) {
				this.$router.replace(address);
			},
			closeModal() {
				delete this.errors.message;
			},
		},
	};
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
		color: #2b3674;
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
		color: #707eae;
	}

	.registration-form__input {
		border: 1px solid #c7cee0;
		border-radius: 5px;
		font-size: 18px;
		line-height: 22px;
		padding: 13px 18px;
		color: #2b3674;
	}

	.registration-form__input::-webkit-input-placeholder {
		color: #707eae;
		opacity: 0.6;
	}

	.registration-form__input:focus {
		outline: none;
		border: 1px solid #4318ff;
	}

	.input_error {
		border: 1px solid #e31a1a !important;
	}

	.input_error::-webkit-input-placeholder {
		color: #e31a1a;
	}

	.registration-form__error {
		color: #e31a1a;
	}

	.registration-form__submit {
		background: #4318ff;
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
		width: .95em;
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

	.radio{
		font-size: 20px;
		padding-left: 1.2em;
		margin-right: 0.6em;
		cursor: pointer;
	}

	.radio__input {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}

	.radio__box {
		position: absolute;
		margin-left: -1.2em;
		width: .95em;
		height: 1em;
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="12" cy="12" r="12" fill="%23E9EDF7"/%3E%3C/svg%3E%0A');
		background-repeat: no-repeat;
		background-size: contain;
	}
	.radio__input:checked + .radio__box {
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="12" cy="12" r="10.5" fill="%23FFFEFB" stroke="%234227FD" stroke-width="3"/%3E%3Cg filter="url(%23filter0_d)"%3E%3Ccircle cx="12" cy="12" r="5" fill="%234227FD"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="filter0_d" x="4" y="4" width="16" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation="1.5"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0.258824 0 0 0 0 0.152941 0 0 0 0 0.992157 0 0 0 0.4 0"/%3E%3CfeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A');
	}
	.radio__input:focus + .radio__box {
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="12" cy="12" r="11" fill="%23E9EDF7" stroke="%234227FD" stroke-width="2"/%3E%3C/svg%3E');
	}
	.radio__input:checked:focus + .radio__box {
		background-image: url('data:image/svg+xml,%3Csvg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="12" cy="12" r="10.5" fill="%23FFFEFB" stroke="%234227FD" stroke-width="3"/%3E%3Ccircle cx="12" cy="12" r="11" stroke="%232B3674" stroke-width="2"/%3E%3Cg filter="url(%23filter0_d)"%3E%3Ccircle cx="12" cy="12" r="5" fill="%234227FD"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="filter0_d" x="4" y="4" width="16" height="16" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/%3E%3CfeOffset/%3E%3CfeGaussianBlur stdDeviation="1.5"/%3E%3CfeColorMatrix type="matrix" values="0 0 0 0 0.258824 0 0 0 0 0.152941 0 0 0 0 0.992157 0 0 0 0.4 0"/%3E%3CfeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A');
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