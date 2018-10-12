<template>
  <div
    class="login-form"
    @keyup.enter="handleSubmit">
    <Logo/>
    <div class="form">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules">
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            :maxlength="20"
            autofocus="autofocus"
            size="large"
            auto-complete="off"
            placeholder="账号"
            @blur="handleAccountBlur"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :maxlength="20"
            size="large"
            type="password"
            auto-complete="off"
            placeholder="密码"/>
        </el-form-item>
        <el-form-item
          v-show="showPinCode"
          prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            :maxlength="4"
            class="lf-pin"
            size="large"
            placeholder="验证码"/>
          <img
            :src="codeSrc"
            class="lf-captch-image"
            @click="reloadCaptchaImage">
        </el-form-item>
        <div class="lf-toolbar">
          <el-checkbox
            v-model="rememberPassword"
            @change="handleChange">记住密码</el-checkbox>
        </div>
        <el-button
          :loading="loading"
          class="lf-submit"
          size="large"
          type="primary"
          @click="handleSubmit">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
// import md5 from 'md5'
// import { login, getCaptchaImage } from 'src/config/login.js'
// import {
//   init,
//   getAccount,
//   getPassword,
//   isRememberPassword,
//   setRememberPassword,
//   syncAccountAndPassword
// } from 'src/page/login/rememberPassword.js'
// import PwdFindContainer from 'src/components/pwdFindContainer.vue'

import Logo from '@/components/Logo'

export default {
  components: {
    Logo
  },
  data () {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
        captcha: ''
      },
      codeSrc: '',
      rememberPassword: true,
      sessionId: '',
      showPinCode: false,
      findPwdDialog: false
    }
  },
  computed: {
    rules () {
      return {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: this.showPinCode, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // todo
  },
  methods: {
    getErrorCount (account) {

    },
    handleAccountBlur () {

    },
    handleChange (value) {

    },
    handleSubmit () {

    },
    reloadCaptchaImage () {

    },
    submit () {

    },
    // 切换验证码显示状态
    toggleCaptcha (resp) {

    },
    // 忘记密码
    openFindPwdDialog () {
      this.findPwdDialog = true
    }
  }
}
</script>

<style lang='scss' scoped>
.login-form {

  .lf-icon {
    margin-top: 11px;
    color: #666;
  }
  .lf-pin {
    width: 200px;
  }
  .lf-captch-image {
    float: right;
    width: 72px;
    height: 40px;
    border: 1px solid #ccc;
  }
  .lf-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 18px;
    .lf-forget-pwd {
      cursor: pointer;
      color: #409EFF;
      text-decoration: none;
      font-size: 14px;
    }
  }
  .lf-submit {
    width: 100%;
  }
}
</style>
