<template>
  <div class="pond-card">
    <div class="box">
      <div class="media-content">
        <div class="card-name">
          <p>{{ cardName }}</p>
        </div>
        <div class="amount-container">
          <span class="amount">{{ formattedAmount }}</span>
          <span class="currency">원</span>
        </div>
        <div class="add-button">
          <button class="button is-fullwidth">추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from '../utils/formatter.js';

export default {

  name: 'PondCard',

  props: {
    amount: Number,

    cardName: String,
  },

  computed: {
    formattedAmount() {
      return currencyFormat(this.amount);
    }
  }
}
</script>

<style scoped>
.pond-card {
  position: relative;
  width: 100%;
}

.pond-card .box {
  padding-top: 58%;
}

.pond-card .media-content {
  position: absolute;
  left: 0;
  top: 0;
  padding: 1.3rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pond-card .amount-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.pond-card .currency {
  padding-left: .3rem;
}

.pond-card .card-name {
  font-size: .8rem;
  color: #636363;
}

.pond-card .add-button .button {
  background: #2196F3;
  border-color: #2196F3;
  color: #ffffff;
}
</style>