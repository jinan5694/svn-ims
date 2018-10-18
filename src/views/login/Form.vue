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
          v-show="showCaptcha"
          prop="captcha">
          <el-input
            v-model="loginForm.captcha"
            :maxlength="4"
            class="captcha-input"
            size="large"
            placeholder="验证码"/>
          <img
            :src="captchaSrc"
            class="captcha-img"
            @click="reloadCaptchaImage">
        </el-form-item>
        <div class="toolbar">
          <el-checkbox
            v-model="rememberPassword"
            @change="handleChange">记住密码</el-checkbox>
        </div>
        <el-button
          :loading="loading"
          class="submit"
          size="large"
          type="primary"
          @click="handleSubmit">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import Axios from 'axios'
import { baseURL } from '@/common/config'
import { login } from '@/common/login'
import Logo from '@/components/Logo'

export default {
  components: {
    Logo
  },
  data () {
    return {
      captchaSrc: '',
      loading: false,
      loginForm: {
        account: '18804004850',
        password: '123456',
        captcha: ''
      },
      rememberPassword: true,
      sessionId: '',
      showCaptcha: false
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
          { required: this.showCaptcha, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // todo
    this.reloadCaptchaImage()
  },
  methods: {
    handleAccountBlur () {
      this.pwdErrorCount(this.loginForm.account)
    },
    handleChange (value) {
      // todo
    },
    handleSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.submit()
        }
      })
    },
    // 查询当前账号密码输出错误次数
    pwdErrorCount (account) {
      if (!account) return
      const url = '/SSOService/pwdErrorCount'
      const param = [account]
      this.$axios.get(url, { params: param }).then(resp => {
        this.toggleCaptcha(resp)
      })
    },
    reloadCaptchaImage () {
      const url = '/CaptchaService/getCaptchaImage'
      Axios.get(url, {
        baseURL: baseURL,
        responseType: 'blob'
      }).then(resp => {
        this.sessionId = resp.headers.sessionid
        this.captchaSrc = window.URL.createObjectURL(resp.data)
      })
    },
    submit () {
      const params = {
        account: this.loginForm.account,
        password: md5(this.loginForm.password),
        captcha: this.loginForm.captcha,
        sessionId: this.sessionId
      }
      this.loading = true
      login(this, params).then(resp => {
        if (resp.success) {
          this.$router.push('/')
          return
        }
        this.toggleCaptcha(resp)
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.exceptionMessage
        })
        this.reloadCaptchaImage()
      }).finally(() => {
        this.loading = false
      })
    },
    // 切换验证码显示状态
    toggleCaptcha (resp) {
      if (resp.data === null || resp.data > 2) {
        // 验证码错误
        this.showCaptcha = true
        this.loginForm.captcha = ''
        this.reloadCaptchaImage()
      } else {
        this.showCaptcha = false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login-form {
  .captcha-input {
    width: 200px;
  }
  .captcha-img {
    float: right;
    margin-left: 10px;
    width: 75px;
    height: 38px;
    border: 1px solid #ccc;
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 18px;
  }
  .submit {
    width: 100%;
  }
}
</style>
