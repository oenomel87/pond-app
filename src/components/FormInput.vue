<template>
  <div class="field">
    <label class="label" v-if="label !== ''">{{ label }}</label>
    <div class="control">
      <input
        type="text"
        class="input"
        :name="name"
        v-model="value"
        maxlength="20"
        :placeholder="placeholder">
    </div>
    <p class="help">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',

  props: {
    message: {
      type: String,
      required: false,
      default: ''
    },

    value: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    name: String,
    
    label: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>