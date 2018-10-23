<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <BackButton/>
    </template>
    <Form
      ref="form"
      :editable="false"/>
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
