<template>
  <div class="form">
    <Info ref="info"/>
    <Table ref="table"/>
  </div>
</template>
<script>
import Info from './Info'
import Table from './Table'
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
      return new Promise()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
