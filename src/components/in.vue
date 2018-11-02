<script>
import _ from 'lodash'
export default {
  functional: true,
  props: {
    type: {
      type: String,
      default: 'number',
      validtor (value) {
        return ['number', 'amount'].includes(value)
      }
    }
  },
  render (h, ctx) {
    const data = ctx.data
    // custom
    _.set(ctx.data, 'props.controls', false)
    _.set(ctx.data, 'props.precision', ctx.props.type === 'amount' ? 2 : 0)
    _.set(ctx.data, 'class.custom-input-number', true)

    return h('el-input-number', data, ctx.children)
  }
}
</script>
<style lang="scss">
.custom-input-number {
  width: 100%;
  .el-input__inner {
    text-align: left;
  }
}
</style>
