<template>
  <div class="sidebar">
    <el-menu
      :collapse="isCollapse"
      :default-active="defaultActive"
      :router="true">
      <el-submenu index="/">
        <template slot="title">
          <Icon name="settings"/>
          <span slot="title">库存</span>
        </template>
        <el-menu-item index="/home">商品采购</el-menu-item>
        <el-menu-item index="/about">商品入库</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <Icon name="favorite"/>
          <span slot="title">主数据</span>
        </template>
        <el-menu-item index="2-1">客户管理</el-menu-item>
        <el-menu-item index="2-2">供应商管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Siderbar',
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path
    }
  }
}
</script>

<style lang='scss' scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
}
</style>
