<template>
  <div class="outbound-picker">
    <el-dialog
      :visible.sync="visible"
      title="选择商品"
      width="90%">
      <Products
        v-if="visible"
        ref="products"
        :items="items"
        :outbound="outbound"/>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="close">{{ $t('cancel') }}</el-button>
        <el-button
          type="primary"
          @click="handleDone">{{ $t('ok') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Products from './Products.vue'
export default {
  components: {
    Products
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    outbound: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    mergedItems () {
      return this.items.map(item => {
        const eq = this.outbound.find(ob => {
          return this.eq(item, ob)
        })
        if (eq) {
          item.movementQty = eq.movementQty
        }
        return item
      })
    }
  },
  methods: {
    handleDone () {
      const products = this.$refs.products.getProducts()
      this.close()
      this.$emit('select', products)
    },
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
