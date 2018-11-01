<script>
const DEFAULT_PROPS = {
  controls: false,
  max: 999999,
  min: 0
}
// types
const TYPES = {
  number: {
    precision: 0
  },
  amount: {
    precision: 2
  }
}

export default {
  name: 'InputNumber',
  props: {
    type: {
      type: String,
      default: 'number',
      validtor (value) {
        return ['number', 'amount'].includes(value)
      }
    },
    value: {
      type: Number,
      default: null
    }
  },
  computed: {
    props () {
      return Object.assign({}, DEFAULT_PROPS, TYPES[this.type], this.$attrs)
    }
  },
  methods: {
    focus () {
      this.$refs.inputNumber.focus()
    },
    inputHandler (value) {
      this.$emit('input', value)
    }
  },
  render (h) {
    const self = this
    return h('el-input-number', {
      ref: 'inputNumber',
      class: {
        'custom-input-number': true
      },
      props: this.props,
      domProps: {
        value: self.value
      },
      on: {
        input: self.inputHandler,
        ...self.$listeners
      }
    })
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
