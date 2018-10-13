<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar/>
      </el-aside>
      <el-main>
        <router-view/>
        <i class="material-icons">face</i>
        <Icon/>
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

</style>
