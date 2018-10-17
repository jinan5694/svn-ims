<template>
  <el-container
    v-if="hasReady"
    class="container">
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
  <Ready v-else/>
</template>

<script>
import Ready from '@/views/Ready'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Index',
  components: {
    Ready,
    Header,
    Sidebar
  },
  computed: {
    hasReady () {
      return this.$store.state.hasReady
    }
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
