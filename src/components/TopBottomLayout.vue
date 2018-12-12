<template>
  <div class="top-bottom-layout">
    <div class="top">
      <slot name="top">
        top slot here
      </slot>
    </div>
    <div class="bar" />
    <div class="bottom">
      <slot name="bottom">
        bottom slot here
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * 上下两行布局
 */
export default {
  name: 'TopBottomLayout',
  props: {
    draggable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDragging: false
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/vars.scss';
.top-bottom-layout {
  flex: 1;
}
.bar {
  height: $size-small;
  background-color: $color-background;
  margin: 0 (-$page-content-padding);
  // cursor: ns-resize;
}
.top {
  margin-bottom: $base-margin;
}
.bottom {
  margin-top: $base-margin;
}
</style>
