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
        inWarehouse: {
          type: 'text',
          label: this.$t('in_warehouse')
        },
        print: {
          type: 'text',
          label: this.$t('print')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
