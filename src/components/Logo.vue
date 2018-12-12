<template>
  <div
    :style="style"
    class="logo"
  >
    PSI
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: Number,
      default: 40
    }
  },
  computed: {
    style () {
      return {
        height: `${this.size}px`,
        lineHeight: `${this.size}px`,
        color: `${this.color}`
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.logo {
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
}
</style>
