<template>
  <div class="page">
    <div class="header">
      <Breadcrumb/>
      <div class="toolbar">
        <slot name="toolbar"/>
      </div>
    </div>
    <div class="content">
      <slot/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'

export default {
  name: 'Page',
  components: {
    Breadcrumb,
    Footer
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/vars.scss';

.page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .header {
    padding: 16px 32px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    margin: 16px 24px;
    padding: 8px;
    background-color: #fff;
    flex: 1;
  }
}
</style>
