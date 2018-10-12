<template>
  <div class="login">
    <Form/>
  </div>
</template>

<script>
import Form from './Form'
export default {
  name: 'Login',
  components: {
    Form
  }
}
</script>

<style lang='scss' scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
