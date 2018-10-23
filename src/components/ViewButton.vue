<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    type="text">
    {{ $t('view') }}
  </el-button>
</template>
<script>
export default {
  name: 'ViewButton',
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
