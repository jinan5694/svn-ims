<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
  >
    <template slot="toolbar">
      <ConfirmButton
        :loading="inboundBtnLoading"
        type="primary"
        text="入库"
        msg="确定入库？"
        @click="handleInbound"
      />
      <BackButton />
    </template>
    <Form
      ref="form"
      :editable="false"
    />
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
      inboundBtnLoading: false
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
    handleInbound () {
      const url = `/${this.serviceName}/in`
      const data = this.getForm()
      this.inboundBtnLoading = true
      this.$axios.post(url, [data]).then(resp => {
        this.$message({ type: 'success', message: this.$t('message.success') })
        this.toList()
      }).catch(errorMsg => {
        if (errorMsg) {
          this.$message({ type: 'error', message: errorMsg })
        }
      }).finally(() => {
        this.inboundBtnLoading = false
      })
    },
    getInboundData () {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
