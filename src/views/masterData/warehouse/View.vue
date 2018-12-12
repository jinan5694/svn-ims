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
  created () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
</style>
