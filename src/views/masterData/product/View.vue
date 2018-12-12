<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
  >
    <template slot="toolbar">
      <BackButton />
    </template>
    <Form
      ref="form"
      :editable="false"
    />
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'
import Form from './components/Form.vue'

export default {
  name: 'ProductView',
  components: {
    Form
  },
  mixins: [ CrudMixin, configMixin ],
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
</style>
