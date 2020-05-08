<template>
  <v-container id="login-container">
    <v-row align="center" justify="center">
      <v-col>
        <h1>Pond</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="label" label="아이디"></v-text-field>
        <v-text-field v-model="label" label="비밀번호" type="password"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block large id="login-btn">로그인</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
#login-container {
  max-width: 300px;
}

#login-container h1 {
  font-size: 3rem;
  text-align: center;
  color: #2196F3;
}

#login-btn {
  background: #2196F3;
  border-color: #2196F3;
  color: #ffffff;
}
</style>
