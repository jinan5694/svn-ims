<script>
import _ from 'lodash'

export default {
  name: 'Number',
  props: {
    value: {
      type: [Number, String],
      default: undefined
    },
    amount: {
      type: Boolean,
      default: false
    }
  },
  render () {
    let display = ''
    const number = _.toNumber(this.value)
    if (!_.isNaN(number)) {
      if (this.amount) {
        display = number === 0 ? '0' : Math.round(number * 100) / 100
      } else {
        display = number
      }
    }
    return <span class="number">{ display }</span>
  }
}
</script>
