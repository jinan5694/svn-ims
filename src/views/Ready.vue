<template>
  <div
    v-loading="loading"
    class="ready"
    element-loading-text="系统准备中">
    <el-alert
      v-show="readyFailed"
      title="系统准备失败"
      type="error"/>
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
</script>

<style lang='scss' scoped>
.ready {
  height: 100%;
}
</style>
