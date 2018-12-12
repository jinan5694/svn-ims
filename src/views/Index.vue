<template>
  <ElContainer
    v-if="hasReady"
    direction="vertical"
    class="container"
  >
    <ElHeader
      class="header-box"
      height="50px"
    >
      <Header />
    </ElHeader>
    <ElContainer>
      <ElAside
        class="aside-box"
        width="65px"
      >
        <Sidebar />
      </ElAside>
      <ElMain class="main">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
  <Ready v-else />
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
.header-box {
  height: 50px;
  background-color: $color-primary;
  box-shadow: $box-shadow;
}
.aside-box {
  overflow: hidden;
  box-shadow: $box-shadow;
}
.main {
  padding: 0;
  background-color: $color-background;
}
</style>
