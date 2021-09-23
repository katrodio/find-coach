<template>
	<section class="registration-form">
		<form
			id="registration-form"
			action="#"
			method="POST"
			@submit.prevent="sendForm"
		>
			<label for="email">Ваша почта</label>
			<input
				class="registration-form__input"
				:class="{ input_error: 'email' in errors }"
				type="email"
				name="email"
				v-model="userEmail"
			/>
			<p class="registration-form__error" v-if="'email' in errors">
				{{ errors.email }}
			</p>

			<label for="message">Сообщение тренеру</label>
			<input
				class="registration-form__input"
				:class="{ input_error: 'message' in errors }"
				name="message"
				type="text"
				v-model="userMessage"
			/>
			<p class="registration-form__error" v-if="'message' in errors">
				{{ errors.message }}
			</p>
			<input
				class="registration-form__submit"
				type="submit"
				value="Отправить заявку"
			/>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			userEmail: '',
			userMessage: '',
			errors: {},
		};
	},
	methods: {
		sendForm() {
			if (this.validateForm()) {
				const data = { ...this.$data, coachId: this.$route.params.id };
				delete data.errors;
				this.$store.dispatch('requests/contactCoach', data);

				this.redirectTo('/');
			}
		},
		validateForm() {
			this.errors = {};

			if (
				!this.userEmail ||
				!this.userEmail.includes('@') ||
				!this.userEmail.includes('.')
			) {
				this.errors.email =
					'Поле "Ваша почта" должно быть заполнено и содержать символы "@" and "."';
			}
			if (!this.userMessage) {
				this.errors.message = 'Поле "Сообщение тренеру" не должно быть пустым';
			}

			return !Object.keys(this.errors).length;
		},
		redirectTo(address) {
			this.$router.replace(address);
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
</style>