<template>
  <section id="login-container" class="section">
    <section class="section login-form-section">
      <div class="hero container">
        <div class="hero-body">
          <h1 class="title">Pond</h1>
        </div>
      </div>
      <div class="container">
        <div class="field">
          <label for="username" class="label">아이디</label>
          <div class="control">
            <input
              type="email"
              name="username"
              class="input"
              :class="isInvalidUsername"
              maxlength="20"
              placeholder="아이디를 입력해주세요"
              v-model="username">
          </div>
          <p class="help" :class="isInvalidUsername">{{usernameValidation}}</p>
        </div>
        <div class="field">
          <label for="password" class="label">비밀번호</label>
          <div class="control">
            <input
              type="password"
              name="password"
              class="input" 
              :class="isInvalidPassword"
              axlength="30"
              placeholder="비밀번호를 입력해주세요"
              @keyup="detectKeyUp"
              v-model="password">
          </div>
          <p class="help" :class="isInvalidPassword">{{passwordValidation}}</p>
        </div>
        <div class="login-btn-wrapper">
          <button id="login-btn" class="button is-fullwidth" @click="login()">로그인</button>
        </div>
        <div class="signup-wrapper columns is-mobile">
          <div class="column is-two-thirds find-link">
            <span>아이디/비밀번호를 잊으셨나요?</span>
          </div>
          <div class="column signup-link">
            <span @click="moveToSignupPage()">가입하기</span>
          </div>
        </div>
      </div>
    </section>
    <Modal
      :show="showError"
      :content="errorMessage"
      v-on:modal-close="closeModal"
    />
  </section>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

import { API_ENDPOINT, TOKEN_NAME } from '../env.js';
import Modal from '../components/Modal.vue';

export default {
  name: 'Login',

  components: { Modal },

  data: function() {
    return {
      username: '',
      password: '',
      usernameValidation: '',
      passwordValidation: '',
      showError: false,
      errorMessage: '',
    }
  },

  beforeMount: function() {
    Cookies.remove(TOKEN_NAME);
  },

  computed: {
    isInvalidUsername: function() {
      return { 'is-danger': this.usernameValidation !== '' };
    },

    isInvalidPassword: function() {
      return { 'is-danger': this.passwordValidation !== '' };
    }
  },

  methods: {
    login: async function() {
      this.validate();
      if(this.hasError()) {
        return;
      }

      try {
        const res = await axios({
          method: 'POST',
          url: `${API_ENDPOINT}/auth?username=${this.username}&password=${this.password}`
        });
        
        console.dir(res);

        if(res.status !== 200) {
          this.handleErrorAlert('잘못된 아이디/비밀번호 입니다.');
          return;
        }
        Cookies.set(TOKEN_NAME, res.data);
        location.reload();
      } catch (error) {
        this.handleErrorAlert('서비스에 문제가 생겼습니다.');
        console.error(error);
      }
    },

    validate() {
      if(this.username == null || this.username.length === 0) {
        this.usernameValidation = '아이디를 입력해주세요.';
      }

      if(this.password == null || this.password.length === 0) {
        this.passwordValidation = '비밀번호를 입력해주세요.';
      }
    },
    
    hasError() {
      return this.usernameValidation.length > 0 || this.passwordValidation.length > 0;
    },

    handleErrorAlert(errorMessage) {
      this.errorMessage = errorMessage;
      this.showError = true;
    },

    closeModal() {
      this.showError = false;
      this.errorMessage = '';
    },

    detectKeyUp(evt) {
      if(evt.keyCode === 13) {
        this.login();
      }
    },

    moveToSignupPage() {
      this.$emit('move-page', 'Signup');
    }
  }
}
</script>

<style scoped>
#login-container {
  max-width: 400px;
  margin: 0 auto;
}

#login-container h1 {
  font-size: 3rem;
  text-align: center;
  color: #2196F3;
}

#login-container label {
  color: #2196F3;
}

.login-btn-wrapper {
  padding-top: 1rem;
}

#login-btn {
  background: #2196F3;
  border-color: #2196F3;
  color: #ffffff;
}

.signup-wrapper {
  padding-top: 1.5rem;
  font-size: 0.8rem;
  color: #2196F3;
}

.signup-wrapper span {
  cursor: pointer;
}

.signup-wrapper span:hover {
  text-decoration: underline;
}

.signup-link {
  text-align: end;
}
</style>
