<template>
  <el-input
    v-bind="[$props, $attrs]"
    v-on="$listeners"/>
</template>
<script>
/**
 * $props 中的属性，对应本组件定义的属性。
 * 所以，为满足组件新增属性的扩展性，bind props
 */
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  }
}
</script>
