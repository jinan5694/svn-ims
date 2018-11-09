<template>
  <div class="form">
    <Toolbar title="基本信息"/>
    <InboundDocHeader
      ref="inboundDocHeader"
      :editable="editable"
      @order-change="handleOrderChange"/>
    <Toolbar title="商品"/>
    <Table
      ref="table"
      :editable="editable"
      :items="items"/>
  </div>
</template>
<script>

import InboundDocHeader from './InboundDocHeader'
import Table from './Table'

export default {
  components: {
    InboundDocHeader,
    Table
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
    },
    defaultItem () {
      return {
        product: {
          id: null,
          prodName: null,
          prodCode: null,
          unit: null,
          specmodel: null,
          brand: null
        },
        prodBatch: { // 批次
          batchCode: null
        },
        warehouse: {
          warehouse: null,
          zone: null,
          bin: null
        }, // inner
        destLoc: { // 仓库
          id: null
        },
        destZone: { // 库区
          id: null
        },
        destBin: { // 库位
          id: null
        },
        movementQty: 0, // 入库数量
        price: 0, // 商品中带出的，可以修改
        amount: 0 // 根据数量和金额计算
      }
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
        items: this.$refs.table.getItems()
      }
    },
    setForm (form) {
      this.$refs.inboundDocHeader.setForm(form)
      this.$refs.table.setItems(form.items)
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
