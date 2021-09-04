import { createRouter, createWebHistory } from "vue-router";
import CoachPage from './components/CoachPage.vue';
import UserAuth from './components/UserAuth.vue';
import CoachDetail from './components/CoachDetail.vue';
import CoachRegistration from './components/CoachRegistration.vue';
import RequestPage from './components/RequestPage.vue';
import NotFound from './components/NotFound.vue';
import store from './store';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/coaches' },
		{ path: '/coaches', component: CoachPage },
		{ path: '/auth', component: UserAuth, meta: { requireUnauth: true }},
		{ path: '/coaches/:id', component: CoachDetail },
		{ path: '/registration', component: CoachRegistration, meta: { requireAuth: true }},
		{ path: '/requests', component: RequestPage, meta: { requireAuth: true }},
		{ path: '/:notFound(.*)', component: NotFound }
	],
	linkActiveClass: 'active',
});

router.beforeEach((to, _, next) => {
	if (to.meta.requireAuth && !store.state.auth.idToken) {
		next('/auth');
	} else if (to.meta.requireUnauth && store.state.auth.idToken) {
		next('/coaches');
	} else {
		next();
	}
})

export default router;