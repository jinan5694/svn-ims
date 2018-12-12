<template>
  <ElButton @click="goback">
    {{ $t('back') }}
  </ElButton>
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
