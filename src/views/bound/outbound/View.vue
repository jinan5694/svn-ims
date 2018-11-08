<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <ConfirmButton
        :loading="outboundBtnLoading"
        type="primary"
        text="出库"
        msg="确定出库？"
        @click="handleOutbound"/>
      <BackButton/>
    </template>
    <Form
      ref="form"
      :editable="false"/>
  </Page>
</template>
<script>
// mixins
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'
// components
import Form from './components/Form.vue'

export default {
  components: {
    Form
  },
  mixins: [ CrudMixin, configMixin ],
  data () {
    return {
      outboundBtnLoading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getForm () {
      const form = this.$refs.form.getForm()
      return {
        id: form.id,
        items: form.items.map(item => {
          return {
            id: item.id,
            qty: item.movementQty
          }
        })
      }
    },
    handleOutbound () {
      const url = `/${this.serviceName}/out`
      const data = this.getForm()
      this.outboundBtnLoading = true
      this.$axios.post(url, [data]).then(resp => {
        this.$message({ type: 'success', message: this.$t('message.success') })
        this.toList()
      }).catch(errorMsg => {
        if (errorMsg) {
          this.$message({ type: 'error', message: errorMsg })
        }
      }).finally(() => {
        this.outboundBtnLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
