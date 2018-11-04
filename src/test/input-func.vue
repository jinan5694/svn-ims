<script>
export default {
  functional: true,
  render (h, ctx) {
    return h('el-input', ctx.data, ctx.children)
  }
}
</script>
