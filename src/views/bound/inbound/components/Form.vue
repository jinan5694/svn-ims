<template>
  <div class="form">
    <Toolbar title="基本信息" />
    <InboundDocHeader
      ref="inboundDocHeader"
      :editable="editable"
      @order-change="handleOrderChange"
    />
    <Toolbar title="商品" />
    <InboundDocItemTable
      ref="table"
      :editable="editable"
      :items="items"
    />
  </div>
</template>
<script>

import InboundDocHeader from './InboundDocHeader'
import InboundDocItemTable from './InboundDocItemTable'

export default {
  components: {
    InboundDocHeader,
    InboundDocItemTable
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    disabled () {
      return !this.editable
    }
  },
  methods: {
    handleOrderChange (order) {
      this.items = order.productItems.map(item => {
        // 将采购单中的相关信息传入
        return {
          product: item.product,
          // 计划入库数量 = 采购数量 - 已入库数量
          movementQty: item.qty - item.inQty,
          price: item.price
        }
      })
    },
    getForm () {
      return {
        ...this.$refs.inboundDocHeader.getForm(),
        items: this.items
      }
    },
    setForm (form) {
      this.$refs.inboundDocHeader.setForm(form)
      this.items = form.items
    },
    validate () {
      const tasks = [
        this.$refs.inboundDocHeader.validate(),
        this.$refs.table.validate()
      ]
      return Promise.all(tasks)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
