<template>
  <el-container class="container">
    <el-header
      class="header"
      height="50px">
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="65px">
        <Sidebar/>
      </el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'Index',
  components: {
    Header,
    Sidebar
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/vars.scss';
.container {
  height: 100%;
  overflow: hidden;
}
.header {
  height: 50px;
  background-color: $color-primary;
}
.main {
  overflow-x: auto;
}
</style>
