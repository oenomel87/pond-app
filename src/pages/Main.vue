<template>
  <div class="main-container">
    <div class="icon-wrapper">
      <i class="icon">menu</i>
    </div>
    <div class="container pond-card-container">
      <pond-card :amount="totalAmount" card-name="현재잔고" />
    </div>
    <Modal
      :show="showError"
      :content="errorMessage"
      v-on:modal-close="closeModal"
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import axios from 'axios';

import { API_ENDPOINT, TOKEN_NAME } from '../env.js';

import PondCard from '../components/PondCard.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Main',

  components: { Modal, PondCard },

  created: function() {
    this.fetchTotalAmount();
  },

  data: function() {
    return {
      totalAmount: 0,
      showError: false,
      errorMessage: '',
    }
  },

  methods: {
    fetchTotalAmount: async function() {
      const res = await axios({
        method: 'GET',
        url: `${API_ENDPOINT}/event/total`,
        headers: JSON.parse(`{ "Authorization": "Bearer ${Cookies.get(TOKEN_NAME)}" }`)
      });
      if(res.status !== 200) {
        this.handleErrorAlert('현재 총 금액을 알 수 없습니다.');
        return;
      }
      this.totalAmount = res.data?.data;
    },

    handleErrorAlert: function(errorMessage) {
      this.errorMessage = errorMessage;
      this.showError = true;
    },

    closeModal: function() {
      this.showError = false;
      this.errorMessage = '';
    },

    logout: function() {
      Cookies.remove(TOKEN_NAME);
      location.reload();
    }
  }
}
</script>

<style scoped>
.main-container {
  padding: 1.5rem;
}

.icon-wrapper {
  padding-bottom: 1rem;
}

.icon-wrapper i {
  cursor: pointer;
}

.primary-color {
  color: #2196F3;
}

.total-amount-label {
  font-weight: bold;
}

.total-amount {
  font-size: 2rem;
}

.logout-wrapper {
  display: flex;
  justify-content: flex-end;
}

#logout {
  background: white;
  border-color: transparent;
  color: #2196F3;
}

#logout:hover {
  background: #E3F2FD;
}

.pond-card-container {
  max-width: 400px;
  min-width: 350px;
  margin: 0 auto;
}
</style>