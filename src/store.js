import { createStore } from 'vuex';

const specializations = {
	namespaced: true,
	state() {
		return [
			{
				id: '1',
				name: 'Фронтенд',
				active: true
			},
			{
				id: '2',
				name: 'Бэкенд',
				active: true
			},
			{
				id: '3',
				name: 'Карьера',
				active: true
			}
		];
	},
	getters: {
		stringSpecializations: state => arrIds => {
			function mapSpecializationIdToString(specId) {
				return state.find(specObj => specObj.id === specId).name;
			}

			return arrIds.map(specId => mapSpecializationIdToString(specId));
		}
	},
	mutations: {
		toggleSpecializationStatus(state, specId) {
			const specObj = state.find(specObj => specObj.id === specId);
			specObj.active = !specObj.active;
		}
	}
};

const coaches = {
	namespaced: true,
	state() {
		return {
			timeStamp: 0,
			showSpinner: false,
			showModal: false,
			coachesData: [],
			isCoachesDataLoaded: false
		};
	},
	getters: {
		getCoachById: state => coachId => {
			return state.coachesData.find(coachObj => coachId === coachObj.id);
		},
		isCoachCurrentUser(state, _, rootState) {
			return state.coachesData.some(
				coach => coach.id === rootState.auth.currentUserId
			);
		},
		shouldUpdate(state) {
			const timeStamp = state.timeStamp;
			if (!timeStamp) {
				return true;
			}
			const currentTimeStamp = new Date().getTime();

			return (currentTimeStamp - timeStamp) / 1000 > 60;
		}
	},
	actions: {
		async loadData(context) {
			const response = await fetch(
				`https://findcoach-d3a2e-default-rtdb.firebaseio.com/coaches.json`,
				{
					method: 'GET'
				}
			);

			if (!response.ok) {
				return false;
			}

			const coachesData = await response.json();

			context.commit('addCoachesData', coachesData);

			return true;
		},
		async registerNewCoach(context, coachData) {
			const response = await fetch(
				`https://findcoach-d3a2e-default-rtdb.firebaseio.com/coaches/${context.rootState.auth.currentUserId}.json?auth=${context.rootState.auth.idToken}`,
				{
					method: 'PUT',
					body: JSON.stringify(coachData)
				}
			);

			if (!response.ok) {
				throw new Error('Не удалось связаться с сервером');
			}

			const responseData = await response.json();
			if (responseData.error) {
				throw responseData.error;
			}
		}
	},
	mutations: {
		addCoachesData(state, coachesData) {
			state.coachesData.length = 0;

			if (!coachesData) return;

			const coachesDataKeys = Object.keys(coachesData);
			for (let i = 0; i < coachesDataKeys.length; i++) {
				coachesData[coachesDataKeys[i]]['id'] = coachesDataKeys[i];
				state.coachesData.push(coachesData[coachesDataKeys[i]]);
			}

			state.isCoachesDataLoaded = true;
		},
		updateTimeStamp(state) {
			state.timeStamp = new Date().getTime();
		},
		toggleSpinner(state, isShowSpinner) {
			state.showSpinner = isShowSpinner;
		},
		toggleModal(state, isShowModal) {
			state.showModal = isShowModal;
		}
	}
};

const requests = {
	namespaced: true,
	state() {
		return [];
	},
	actions: {
		contactCoach(context, contactData) {
			const coachId = contactData.coachId;
			delete contactData.coachId;

			const coach = context.rootGetters['coaches/getCoachById'](coachId);

			contactData.coachName = coach.name;
			contactData.coachLastName = coach.lastName;
			contactData.createdAt = +new Date();

			fetch(
				`https://findcoach-d3a2e-default-rtdb.firebaseio.com/requests/${coachId}.json`,
				{
					method: 'POST',
					body: JSON.stringify(contactData)
				}
			);
		}
	},
	mutations: {
		addRequestData(state, requestData) {
			state.length = 0;

			if (!requestData) return;

			const requestDataKeys = Object.keys(requestData);
			for (let i = 0; i < requestDataKeys.length; i++) {
				requestData[requestDataKeys[i]]['id'] = requestDataKeys[i];
				state.push(requestData[requestDataKeys[i]]);
			}
		}
	}
};

const auth = {
	state() {
		return {
			error: null,
			idToken: null,
			expiresIn: null,
			currentUserId: null
		};
	},
	mutations: {
		saveAuthData(state, responseData) {
			state.idToken = responseData.idToken;
			state.expiresIn = responseData.expiresIn;
			state.currentUserId = responseData.localId;
		},
		logoutUser(state) {
			state.idToken = null;
			state.expiresIn = null;
			state.currentUserId = null;

			localStorage.clear();
		}
	},
	actions: {
		authUser(context, data) {
			return context.dispatch('auth', {
				...data,
				mode: 'authorization'
			});
		},
		registerUser(context, data) {
			return context.dispatch('auth', {
				...data,
				mode: 'registration'
			});
		},
		async auth(context, data) {
			const mode = data.mode;
			let url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJCxxL_72KNYKq4vuyGxgQy-YgQk_CvBU';

			if (mode === 'registration') {
				url =
					'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJCxxL_72KNYKq4vuyGxgQy-YgQk_CvBU';
			}

			const payload = {};
			payload.email = data.userEmail;
			payload.password = data.userPassword;
			payload.returnSecureToken = true;

			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('Ошибка! Введите другие данные');
				} else {
					throw new Error('Не удалось связаться с сервером');
				}
			}

			const responseData = await response.json();
			if (responseData.error) {
				throw responseData.error;
			}

			localStorage.setItem('token', responseData.idToken);
			localStorage.setItem('currentUserId', responseData.localId);

			context.commit('saveAuthData', responseData);
		},
		autoAuth(context) {
			const idToken = localStorage.getItem('token');
			const currentUserId = localStorage.getItem('currentUserId');

			if (idToken && currentUserId) {
				context.commit('saveAuthData', {
					idToken: idToken,
					localId: currentUserId,
					expiresIn: null
				});
			}
		}
	}
};

const store = createStore({
	modules: {
		specializations,
		coaches,
		requests,
		auth,
	}
});

export default store;