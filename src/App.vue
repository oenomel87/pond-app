<template>
  <div id="app">
    <div v-if="this.currentPage === 'Main'">
      <Main/>
    </div>
    <div v-else-if="this.currentPage === 'Login'">
      <Login/>
    </div>
    <div v-else>
      <Error/>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

import { API_ENDPOINT, TOKEN_NAME } from './env';

import Main from './components/Main';
import Error from './components/Error';
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    Main, Login, Error,
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
          Authorization: token,
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
    changeCurrentPage: function(page) {
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
</style>
