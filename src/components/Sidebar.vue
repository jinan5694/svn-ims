<template>
  <div class="sidebar">
    <el-menu
      :collapse="isCollapse"
      :default-active="defaultActive"
      :router="true">
      <template v-for="(menu, index) in menus">
        <el-submenu
          v-if="menu.children"
          :key="index"
          :index="menu.path">
          <template slot="title">
            <Icon :name="menu.icon"/>
            <span slot="title">{{ menu.label }}</span>
          </template>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path">{{ item.label }}</el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :key="index"
          :index="menu.path">
          <Icon :name="menu.icon"/>
          <span slot="title">{{ menu.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import resource from '@/common/resource.js'
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
    },
    menus () {
      return resource
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
