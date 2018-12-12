<template>
  <div
    v-loading="loading"
    class="ready"
    element-loading-text="系统准备中"
  >
    <ElAlert
      v-show="readyFailed"
      class="alert"
      close-text="重试"
      title="系统准备失败"
      type="error"
      show-icon
      @close="handleClose"
    />
  </div>
</template>

<script>
import { init } from '@/common/ready'

export default {
  name: 'Ready',
  data () {
    return {
      loading: true,
      readyFailed: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    handleClose () {
      this.loading = true
      this.readyFailed = false
      this.init()
    },
    init () {
      init(this).then(resp => {
        this.$store.commit('readyComplete')
      }).catch(err => {
        if (err) {
          this.readyFailed = true
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.ready {
  height: 100%;
  .alert {
    width: 250px;
    margin: 50px auto;
  }
}
</style>
