<template>
  <el-input
    ref="input"
    v-bind="$attrs"
    :value="currentValue"
    class="rb-number-input"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="debounceHandleInput"
    @change="handleChange"
  >
    <template
      v-if="$slots.prepend"
      slot="prepend"
    >
      <slot name="prepend"/>
    </template>
    <template
      v-if="$slots.append"
      slot="append"
    >
      <slot name="append"/>
    </template>
  </el-input>
</template>

<script>
import debounce from 'throttle-debounce/debounce'

export default {
  name: 'NumberInput',
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    decimal: {
      type: Number,
      default: 4
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    }
  },
  data () {
    return {
      currentValue: 0
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        let newVal = Number(value)
        if (isNaN(newVal) || !this.isDecimal(newVal)) {
          this.$emit('input', this.value.toFixed(this.decimal)) // 超过位数格式化
          return
        }

        if (newVal >= this.max) newVal = this.max
        if (newVal <= this.min) newVal = this.min

        this.currentValue = newVal
        this.$emit('input', newVal)
      }
    }
  },
  created () {
    this.debounceHandleInput = debounce(300, value => {
      this.handleInput(value)
    })
  },
  methods: {
    handleChange (value) {
      this.setCurrentValue(value)
      this.$emit('change', +value)
    },
    handleBlur (event) {
      this.$emit('blur', event)
      // this.$refs.input.setCurrentValue(this.currentValue)
    },
    handleFocus (event) {
      this.$emit('focus', event)
    },
    setCurrentValue (newVal) {
      if (isNaN(newVal)) {
        this.$refs.input.setCurrentValue(this.currentValue)
        return
      }

      const oldVal = this.currentValue

      if (newVal >= this.max) newVal = this.max
      if (newVal <= this.min) newVal = this.min

      if (oldVal === newVal) {
        this.$refs.input.setCurrentValue(this.currentValue)
        return
      }

      this.$emit('input', +newVal)
      this.currentValue = +newVal
    },
    handleInput (value) {
      if (value === '') {
        return
      }

      if (value.indexOf('.') === (value.length - 1)) {
        return
      }
      // 如果最小值大于0，不允许输入负号
      if (value.indexOf('-') === (value.length - 1) && this.min > 0) {
        return
      }

      const newVal = Number(value)
      if (!isNaN(newVal) && this.isDecimal(newVal)) {
        this.setCurrentValue(newVal)
      } else {
        this.$refs.input.setCurrentValue(this.currentValue)
      }
    },
    focus () {
      this.$refs.input.focus()
    },
    isDecimal (val) {
      val = val + ''
      if (val.indexOf('.') < 0) return true
      const i = val.length - val.indexOf('.') - 1
      if (i > this.decimal) {
        return false
      }
      return true
    }
  }
}

</script>

<style lang="scss" scoped>
  .rb-number-input {
    .el-input-group__append,
    .el-input-group__prepend {
      line-height: 24px
    }
  }
</style>
