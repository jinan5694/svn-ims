<template>
  <Page
    v-loading="loading"
    element-loading-text="拼命加载中">
    <template slot="toolbar">
      <SaveButton @click="save"/>
      <el-button>取 消</el-button>
    </template>
    <Form ref="form"/>
  </Page>
</template>
<script>
import Form from './components/Form.vue'

export default {
  name: 'ZoneAdd',
  components: {
    Form
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    save () {
      console.log('save')
      this.validate().then(() => {
        return this.saveProduct()
      }).then((resp) => {
        this.$message({ message: this.$t('message.success'), type: 'success' })
        setTimeout(() => {
        //  this.toView(resp)
        }, 1000)
      })
    },
    saveProduct () {
      const url = '/Service/save'
      const param = this.$refs.form.getForm()
      this.loading = true
      return this.$axios.post(url, [param]).then((resp) => {
        return resp
      }).finally(() => {
        this.loading = false
      })
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
