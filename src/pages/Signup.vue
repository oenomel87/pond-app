<template>
  <section class="section">
    <div class="container">
      <div class="signup-form">
        <h1 class="title">회원 가입</h1>
        <div class="field">
          <label class="label">이름</label>
          <div class="control">
            <input
              type="email"
              class="input"
              name="name"
              maxlength="20"
              placeholder="20자까지 입력 할 수 있습니다.">
          </div>
        </div>
        <div class="field">
          <label class="label">아이디</label>
          <div class="control">
            <input
              type="email"
              class="input"
              name="username"
              maxlength="20"
              placeholder="20자까지 입력 할 수 있습니다.">
          </div>
        </div>
        <div class="field">
          <label class="label">비밀번호</label>
          <div class="control">
            <input
              type="password"
              class="input"
              name="password"
              maxlength="30"
              placeholder="30자까지 입력 할 수 있습니다.">
          </div>
        </div>
        <div class="field">
          <label class="label">비밀번호 확인</label>
          <div class="control">
            <input
              type="password"
              class="input password-confirm"
              maxlength="30"
              placeholder="입력한 비밀번호를 다시 입력해주세요.">
          </div>
        </div>
        <div class="btn-group">
          <button class="button" @click="moveToLoginPage()">돌아가기</button>
          <button class="button">가입하기</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Signup',

  methods: {
    moveToLoginPage: function() {
      this.$emit('move-page', 'Login');
    }
  }
}
</script>

<style scoped>

.signup-form {
  max-width: 300px;
  margin: 0 auto;
}

.signup-form .label {
  color: #2196F3;
}

.btn-group {
  padding-top: 1.2rem;
  text-align: end;
}

.btn-group button {
  margin-left: 0.5rem;
  background: white;
  border-color: transparent;
  color: #2196F3;
}

.btn-group button:hover {
  background: #E3F2FD;
}

</style>