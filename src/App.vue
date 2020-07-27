<template>
  <section id="app">
    <div class="container">
      <Main v-if="this.currentPage === 'Main'" />
      <Login v-else-if="this.currentPage === 'Login'" @move-page="changeCurrentPage"/>
      <Signup v-else-if="this.currentPage === 'Signup'" @move-page="changeCurrentPage"/>
      <Error v-else />
    </div>
  </section>
</template>

<script>

import Cookies from 'js-cookie';
import axios from 'axios';

import { API_ENDPOINT, TOKEN_NAME } from './env.js';

import Main from './pages/Main.vue';
import Error from './pages/Error.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';

export default {
  name: 'App',

  components: {
    Main, Login, Error, Signup
  },

  data() {
    return {
      currentPage: 'Main'
    }
  },

  created: async function() {
    try {
      const token = Cookies.get(TOKEN_NAME);

      if(token == null) {
        this.changeCurrentPage('Login');
        return;
      }

      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/`,
        headers: {
          Authorization: 'Bearer ' + token,
        }
      });

      if(res.status !== 200) {
        this.changeCurrentPage('Login');
        return;
      }
      this.changeCurrentPage('Main');
    } catch(err) {
      console.dir(err);
      this.changeCurrentPage('Error');
      return;
    }
  },

  methods: {
    changeCurrentPage(page) {
      this.currentPage = page;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}

.icon {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
</style>
