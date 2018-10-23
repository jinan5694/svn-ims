<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Button
        button-type="save"
        @click="save"/>
      <BackButton/>
    </template>
    <Form
      v-if="flag"
      ref="form"
      :data="data"
      :edit-flag="flag"/>
  </Page>
</template>
<script>
import Form from './components/Form.vue'

export default {
  name: 'ProductEdit',
  components: {
    Form
  },
  data () {
    return {
      loading: false,
      flag: false,
      data: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    save () {
      this.validate().then(() => {
        return this.saveData()
      }).then((resp) => {
        this.$message({ message: this.$t('message.success'), type: 'success' })
        this.$router.push('/masterData/product/list')
      })
    },
    saveData () {
      const url = '/ProductService/update'
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
    },
    getData () {
      const id = this.$route.params.id
      if (id) {
        this.loading = true
        this.$axios.get('/ProductService/get', { params: [id] })
          .then(resp => {
            this.data = resp.data
            this.flag = true
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
