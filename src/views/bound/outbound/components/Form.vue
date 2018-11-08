<template>
  <div class="form">
    <Toolbar title="基本信息"/>
    <OutboundOrderHeader
      ref="obOrderHeader"
      :editable="editable"
      @sale-order-change="handleSaleOrderChange"/>
    <Toolbar title="商品信息">
      <el-button
        v-if="editable"
        type="primary"
        @click="showInventoryPicker">添加</el-button>
    </Toolbar>
    <OutboundOrderItemTable
      ref="obOrderItemTable"
      :editable="editable"/>
    <InventoryPicker
      ref="inventoryPicker"
      :sale-order-items="saleOrderItems"
      :outbound-order-items="outboundOrderItems"
      @inventory-change="handleInventoryChange"/>
  </div>
</template>
<script>
import OutboundOrderHeader from './OutboundOrderHeader'
import OutboundOrderItemTable from './OutboundOrderItemTable'
// inventory picker
import InventoryPicker from '@/views/components/InventoryPicker'

export default {
  components: {
    OutboundOrderHeader,
    OutboundOrderItemTable,
    InventoryPicker
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {},
      saleOrderItems: [],
      outboundOrderItems: []
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
        sourceLoc: { // 仓库
          id: null
        },
        sourceZone: { // 库区
          id: null
        },
        sourceBin: { // 库位
          id: null
        },
        movementQty: 0, // 入库数量
        price: 0, // 商品中带出的，可以修改
        amount: 0 // 根据数量和金额计算
      }
    }
  },
  methods: {
    handleSaleOrderChange (order) {
      this.saleOrderItems = order.productItems
      // this.$refs.obOrderItemTable.setItems([])
      this.$nextTick(() => {
        this.$refs.inventoryPicker.fetch()
      })
    },
    handleInventoryChange (inventories) {
      const items = inventories.map(item => {
        return {
          product: item.product,
          prodBatch: item.prodBatch,
          sourceLoc: item.warehouse,
          sourceZone: item.zone,
          sourceBin: item.bin,
          movementQty: item.movementQty,
          price: item.costPrice
        }
      })
      // this.outboundOrderItems = items
      this.$refs.obOrderItemTable.setItems(items)
    },
    getForm () {
      return {
        ...this.$refs.obOrderHeader.getForm(),
        items: this.$refs.obOrderItemTable.getItems()
      }
    },
    setForm (form) {
      this.$refs.obOrderHeader.setForm(form)
      this.$refs.obOrderItemTable.setItems(form.items)
    },
    getOutboundOrderItems () {
      this.outboundOrderItems = this.$refs.obOrderItemTable.getItems()
    },
    showInventoryPicker () {
      // 读取已出库数量
      this.getOutboundOrderItems()
      this.$refs.inventoryPicker.open()
    },
    validate () {
      const tasks = [
        this.$refs.obOrderHeader.validate()
      ]
      return Promise.all(tasks).then(() => {
        const orderItems = this.$refs.obOrderItemTable.getItems()
        if (orderItems.length === 0) {
          const errorMsg = '请添加出库商品'
          this.$message({
            message: errorMsg,
            type: 'warning'
          })
          return Promise.reject(new Error(errorMsg))
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
