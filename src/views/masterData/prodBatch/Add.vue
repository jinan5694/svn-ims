<template>
  <Page
    v-loading="loading"
    element-loading-text="拼命加载中">
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
// mixins
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'
// components
import Form from './components/Form.vue'

export default {
  mixins: [ CrudMixin, configMixin ],
  components: {
    Form
  }
}
</script>
<style lang="scss" scoped>
</style>
