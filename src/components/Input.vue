<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    inputHandler (event) {
      this.$emit('input', event.target.value)
    }
  },
  render () {
    const data = {
      domProps: {
        value: this.value
      },
      on: {
        input: this.inputHandler
      }
    }
    return <input type="text" { ...data }/>
  }
}
</script>
