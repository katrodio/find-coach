<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <a class="logo" href="/">
          <img class="logo__img" src="../assets/images/logo.png" alt="logo" />
        </a>

        <nav class="menu">
					<label for="hamburger" class="hamburger-label">&#9776;</label>
					<input type="checkbox" id="hamburger" class="hamburger-input"/>
          <ul class="menu__list user-nav">
            <li class="menu__list-item" v-if="$store.state.auth.currentUserId">
              <p class="user-nav__name">Привет{{ getAuthCoachFullName }}!</p>
            </li>
            <router-link
              to="/auth"
              custom
              v-slot="{ href, isActive }"
              v-if="!$store.state.auth.idToken"
            >
              <li
                class="menu__list-item logout"
                :class="[isActive && 'active-user-nav']"
              >
                <a :href="href" class="user-nav__logout">Войти</a>
              </li>
            </router-link>
            <router-link to="/" custom v-slot="{ href, isActive }" v-else>
              <li
                class="menu__list-item logout"
                :class="[isActive && 'active-user-nav']"
                @click="$store.commit('logoutUser')"
              >
                <svg
                  class="menu__list-img-logout"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z"
                  />
                </svg>
                <a :href="href" class="user-nav__logout">Выйти</a>
              </li>
            </router-link>
            <router-link
              to="/coaches"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <li class="menu__list-item" :class="[isActive && 'active']">
                <svg
                  class="menu__list-img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M1 10H7C7.55 10 8 9.55 8 9V1C8 0.45 7.55 0 7 0H1C0.45 0 0 0.45 0 1V9C0 9.55 0.45 10 1 10ZM1 18H7C7.55 18 8 17.55 8 17V13C8 12.45 7.55 12 7 12H1C0.45 12 0 12.45 0 13V17C0 17.55 0.45 18 1 18ZM11 18H17C17.55 18 18 17.55 18 17V9C18 8.45 17.55 8 17 8H11C10.45 8 10 8.45 10 9V17C10 17.55 10.45 18 11 18ZM10 1V5C10 5.55 10.45 6 11 6H17C17.55 6 18 5.55 18 5V1C18 0.45 17.55 0 17 0H11C10.45 0 10 0.45 10 1Z"
                  />
                </svg>
                <a :href="href" @click="navigate" class="menu__list-link"
                  >Все тренеры</a
                >
              </li>
            </router-link>
            <router-link
              to="/requests"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <li
                class="menu__list-item"
                :class="[isActive && 'active']"
                v-if="
                  $store.state.auth.idToken &&
                  $store.getters['coaches/isCoachCurrentUser']
                "
              >
                <svg
                  class="menu__list-img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 9C14.21 9 16 7.21 16 5C16 2.79 14.21 1 12 1C9.79 1 8 2.79 8 5C8 7.21 9.79 9 12 9ZM12 3C13.1 3 14 3.9 14 5C14 6.1 13.1 7 12 7C10.9 7 10 6.1 10 5C10 3.9 10.9 3 12 3ZM12 11.55C9.64 9.35 6.48 8 3 8V19C6.48 19 9.64 20.35 12 22.55C14.36 20.36 17.52 19 21 19V8C17.52 8 14.36 9.35 12 11.55ZM19 17.13C16.47 17.47 14.07 18.43 12 19.95C9.94 18.43 7.53 17.46 5 17.12V10.17C7.1 10.55 9.05 11.52 10.64 13L12 14.28L13.36 13.01C14.95 11.53 16.9 10.56 19 10.18V17.13V17.13Z"
                  />
                </svg>
                <a :href="href" @click="navigate" class="menu__list-link"
                  >Заявки</a
                >
              </li>
            </router-link>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    getAuthCoachFullName() {
      const currentUserId = this.$store.state.auth.currentUserId;
      const coachGetter = this.$store.getters['coaches/getCoachById'];
      const coachObj = coachGetter(currentUserId);

      if (coachObj) {
        return ', ' + coachObj.name + ' ' + coachObj.lastName;
      }
      return null;
    },
  },
};
</script>

<style scoped>
header {
  background-color: #ffffff;
}

.container {
  max-width: 1224px;
  margin: 0 auto;
  padding: 0 20px;
}

.header__inner,
.menu,
.menu__list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__inner {
  padding: 30px 0;
}

.menu__list-item {
  display: flex;
  align-items: center;
  margin-left: 24px;
}

.menu__list-img {
  margin: 8px 12px;
}

.menu__list-img-logout {
  margin: 8px 6px;
}

.menu__list-link {
  color: #2b3674;
  font-size: 16px;
  line-height: 32px;
  text-decoration: none;
  font-weight: 600;
  margin: 8px 12px 8px 0;
}

.active {
  background-color: #4318ff;
  border-radius: 5px;
}
.active svg,
.active a {
  color: #ffffff;
  fill: #ffffff;
}

.user-nav__name {
  max-width: 210px;
  color: #707eae;
}

.user-nav__logout {
  color: #707eae;
  font-size: 16px;
  line-height: 32px;
  text-decoration: none;
}

.logout {
  color: #707eae;
  fill: #707eae;
  margin-left: 5px;
}

.hamburger-label, .hamburger-input {
	display: none;
}

@media screen and (max-width: 951px) {
	.menu__list {
		position: absolute;
    box-shadow: 2px 4px 12px #e1e1e1;
    top: 80px;
    right: 20px;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
	}

	.menu__list li {
		margin: 10px 0;
	}

	.hamburger-label { 
		display: inline-block; 
		color: white;
		background: #4318ff;
		border-radius: 5px;	
		font-style: normal;
		font-size: 1.2em;
		padding: 10px;
	}

	.menu__list { display: none; }
	.hamburger-input:checked ~ .menu__list { display: block; }
}
</style>