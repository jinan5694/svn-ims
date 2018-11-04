export default {
  methods: {
    // 返回带异常信息的promise
    validatePromise (refName) {
      return new Promise((resolve, reject) => {
        this.$refs[refName].validate((valid, errors) => {
          valid ? resolve(valid) : reject(errors)
        })
      })
    }
  }
}
