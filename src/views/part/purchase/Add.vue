<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Button
        button-type="save"
        @click="handleSaveOrUpdate"/>
      <BackButton/>
    </template>
    <Form ref="form"/>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'
import Form from './components/Form.vue'

export default {
  name: 'PurchaseAdd',
  mixins: [ CrudMixin, configMixin ],
  components: {
    Form
  }
}
</script>
<style lang="scss" scoped>
</style>
