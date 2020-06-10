<template>
  <section class="section">
    <div class="container">
      <div class="logout-wrapper">
        <button id="logout" class="button" @click="logout">Logout</button>
      </div>
      <section class="section">
        <p class="primary-color total-amount-label">현재 금액</p>
        <p class="total-amount">{{formattedAmount}} 원</p>
      </section>
    </div>
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

import { API_ENDPOINT, TOKEN_NAME } from '../env';
import Modal from '../components/Modal';

export default {
  name: 'Main',

  components: { Modal },

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

  computed: {
    formattedAmount: function() {
      if(this.totalAmount < 1000) {
        return this.totalAmount;
      }

      const str = this.totalAmount + '';
      let fmt = '';
      for(let i = str.length - 1, j = 1; i >= 0; i--, j++) {
        fmt = str[i] + fmt;
        if(j !== 0 && j % 3 === 0) {
          fmt = ',' + fmt;
        }
      }

      if(fmt.indexOf(',') === 0) {
        fmt = fmt.substring(1);
      }

      return fmt;
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

</style>