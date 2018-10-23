<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <BackButton/>
    </template>
    <Form
      v-if="flag"
      ref="form"
      :data="data"
      :view-flag="flag"/>
  </Page>
</template>
<script>
import Form from './components/Form.vue'

export default {
  name: 'VendorView',
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
    getData () {
      const id = this.$route.params.id
      if (id) {
        this.loading = true
        this.$axios.get('/VendorService/get', { params: [id] })
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
