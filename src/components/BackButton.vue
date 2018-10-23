<template>
  <el-button @click="goback">{{ $t('back') }}</el-button>
</template>
<script>
export default {
  name: 'BackButton',
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
