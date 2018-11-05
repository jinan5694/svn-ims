<template>
  <el-button
    v-bind="$attrs"
    :type="buttonTypes[buttonType].type"
    size="mini"
    v-on="$listeners">
    {{ buttonTypes[buttonType].label }}
  </el-button>
</template>
<script>

export default {
  name: 'Button',
  props: {
    buttonType: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    buttonTypes () {
      return {
        add: {
          type: 'primary',
          label: this.$t('add')
        },
        edit: {
          type: 'text',
          label: this.$t('edit')
        },
        stop: {
          type: 'text',
          label: this.$t('stop')
        },
        view: {
          type: 'text',
          label: this.$t('view')
        },
        save: {
          type: 'primary',
          label: this.$t('save')
        },
        search: {
          type: 'primary',
          label: this.$t('search')
        },
        print: {
          type: 'text',
          label: this.$t('print')
        },
        delete: {
          type: 'text',
          label: this.$t('delete')
        },
        batchAdd: {
          type: 'primary',
          label: this.$t('batch_add')
        },
        cancel: {
          type: '',
          label: this.$t('cancel')
        },
        ok: {
          type: 'primary',
          label: this.$t('ok')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
