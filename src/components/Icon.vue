<template>
  <i class="icon material-icons">
    {{ name }}
  </i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: 'android'
    },
    size: {
      type: Number,
      default: 24 // 18/24/36/48
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

</style>
