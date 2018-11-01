<template>
  <div class="form">
    <Info ref="info"/>
    <Table ref="table"/>
  </div>
</template>
<script>
import Info from './Info'
import Table from './Table'

import Axios from 'axios'

export default {
  components: {
    Info,
    Table
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {}
    }
  },
  computed: {
    disabled () {
      return !this.editable
    }
  },
  methods: {
    getForm () {
      return this.form
    },
    setForm (form) {
      this.form = form
    },
    validate () {
      const tasks = [
        this.$refs.info.validate()
        // this.$refs.table.validate
      ]
      return Axios.all(tasks)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
