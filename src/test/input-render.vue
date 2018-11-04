<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  render () {
    const data = {
      props: this.$props,
      attrs: this.$attrs,
      on: this.$listeners
    }
    return (
      <el-input {...data} />
    )
  }
}
</script>
