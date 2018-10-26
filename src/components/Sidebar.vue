<template>
  <div class="sidebar">
    <el-menu
      :collapse="isCollapse"
      :default-active="active"
      :router="true">
      <el-menu-item index="/">
        <div class="item">
          <Icon name="home"/>
          <div class="title">首页</div>
        </div>
      </el-menu-item>
      <el-submenu
        v-for="(menu, index) in menus"
        :key="index"
        :index="menu.path">
        <template slot="title">
          <div class="item">
            <Icon :name="menu.icon"/>
            <div class="title">{{ menu.label }}</div>
          </div>
        </template>
        <template v-for="(submenu, index) in menu.children">
          <el-menu-item
            :key="index"
            :index="submenu.path">{{ submenu.label }}</el-menu-item>
        </template>
      </el-submenu>
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
    active () {
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
  padding-top: 16px;
  // 图标 + 文字样式
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .title {
      line-height: 20px;
      font-size: 12px;
    }
  }
}
</style>
