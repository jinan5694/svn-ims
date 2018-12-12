<template>
  <div class="toolbar">
    <div class="title">
      {{ title }}
    </div>
    <div class="actions">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/vars.scss';

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $size-large;
  border-bottom: 1px solid $color-primary-light5;
  margin-bottom: $size-small;

  .title {
    color: $color-primary;
    font-size: 14px;
    height: 100%;
    line-height: $size-large;
  }
  .actions {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      padding: 5px 15px;
    }
  }

}
</style>
