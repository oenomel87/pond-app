<template>
  <div class="modal" :class="showModal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <section>
          <article>
            <h4 v-if="isNotEmpty(title)">{{title}}</h4>
            <p class="content">{{content}}</p>
          </article>
        </section>
        <section class="button-section">
          <button
            v-if="cancelButtonText != null && cancelButtonText !== ''"
            class="button"
          >{{ cancelButtonText }}</button>
          <button class="button" @click="closeModal">{{ okButtonText }}</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    title: {
      type: String,
      required: false,
    },

    content: String,

    okButtonText: {
      type: String,
      required: false,
      default: 'OK'
    },

    cancelButtonText: {
      type: String,
      required: false
    },

    callback: {
      type: Function,
      required: false,
      default: () => console.error('callback function is undefined')
    },

    show: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showModal() {
      return { 'is-active': this.show }
    }
  },

  methods: {
    closeModal() {
      this.$emit('modal-close');
    },

    isNotEmpty(str) {
      return str != null && str.length > 0;
    }
  }
}
</script>

<style scoped>
.modal {
  display: none;
  justify-content: center;
  align-items: center;
}

.modal section {
  padding: 0.3rem 0;
}

.modal .box {
  background: #fff;
  word-break: keep-all;
}

.modal .button-section {
  display: flex;
  justify-content: flex-end;
}

.modal .button-section button {
  background: white;
  border-color: transparent;
  color: #2196F3;
}

.modal .button-section button:hover {
  background: #E3F2FD;
}
</style>