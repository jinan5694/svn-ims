<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem
      v-for="item in matched"
      :key="item.path"
      :to="{ path: item.path === '' ? '/' : item.path }"
    >
      {{ item.meta && item.meta.title }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
<script>

export default {
  computed: {
    matched () {
      return this.$route.matched.filter(item => {
        // 过滤无效的路由
        return item.meta && item.meta.title
      })
    }
  }
}
</script>
