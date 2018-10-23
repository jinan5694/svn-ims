<template>
  <Page
    v-loading="loading"
    element-loading-text="拼命加载中">
    <template slot="toolbar">
      <Button
        button-type="save"
        @click="handleSave"/>
      <BackButton/>
    </template>
    <Form ref="form"/>
  </Page>
</template>
<script>
import Form from './components/Form.vue'

export default {
  components: {
    Form
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleSave () {
      this.$refs.form.validate().then(() => {
        return this.save()
      }).then(() => {
        this.$message({
          message: this.$t('message.success'),
          type: 'success'
        })
        this.$router.push('/masterData/warehouse/list')
      }).catch(err => {
        console.warn('validate faild', err)
      })
    },
    save () {
      const url = '/WarehouseService/save'
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
