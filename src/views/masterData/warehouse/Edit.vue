<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Button
        button-type="save"
        @click="handleUpdate"/>
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
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleUpdate () {
      this.$refs.form.validate().then(() => {
        return this.update()
      }).then((resp) => {
        this.$message({
          message: this.$t('message.success'),
          type: 'success'
        })
        this.$router.push('/masterData/warehouse/list')
      }).catch(err => {
        console.warn('validate faild', err)
      })
    },
    update () {
      const url = '/WarehouseService/update'
      const param = this.$refs.form.getForm()
      this.loading = true
      return this.$axios.post(url, [param]).then(resp => {
        return resp
      }).finally(() => {
        this.loading = false
      })
    },
    getData () {
      if (this.id) {
        this.loading = true
        const url = '/WarehouseService/get'
        this.$axios.get(url, { params: [this.id] }).then(resp => {
          this.$refs.form.setForm(resp.data)
          this.flag = true
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
