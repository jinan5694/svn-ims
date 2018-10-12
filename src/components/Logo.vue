<template>
  <div
    :style="style"
    class="logo">IMS</div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    size: {
      type: Number,
      default: 40
    }
  },
  computed: {
    style () {
      return {
        height: `${this.size}px`,
        lineHeight: `${this.size}px`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.logo {
  display: inline-block;
  color: #666;
  font-size: 18px;
  font-weight: 700;
}
</style>
