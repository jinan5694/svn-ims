<template>
  <div class="form">
    <Toolbar title="基本信息"/>
    <Info
      ref="info"
      :editable="editable"
      @order-change="handleOrderChange"/>
    <Toolbar title="商品信息">
      <el-button
        :disabled="btnDisabled"
        type="primary"
        @click="showOutbound">添加</el-button>
    </Toolbar>
    <Table
      ref="table"
      :editable="editable"/>
    <OutboundPicker
      ref="outboundPicker"
      :items="productItems"
      :outbound="outboundItems"
      @select="handleOutbound"/>
  </div>
</template>
<script>
import Info from './Info'
import Table from './Table'
// outbound picker
import OutboundPicker from '@/views/components/outboundPicker/main.vue'

export default {
  components: {
    Info,
    Table,
    OutboundPicker
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
      productItems: [],
      outboundItems: []
    }
  },
  computed: {
    btnDisabled () {
      return this.productItems.length === 0
    },
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
        costPrice: 0, // 商品中带出的，可以修改
        amount: 0 // 根据数量和金额计算
      }
    }
  },
  methods: {
    handleOrderChange (order) {
      this.productItems = order.productItems.map(item => {
        return {
          id: item.product.id,
          qty: item.orderQty
        }
      })
    },
    handleOutbound (products) {
      const items = products.map(item => {
        return {
          product: item.product,
          prodBatch: item.prodBatch,
          sourceLoc: item.warehouse,
          sourceZone: item.zone,
          sourceBin: item.bin,
          movementQty: item.movementQty,
          price: item.costPrice,
          costPrice: item.costPrice
        }
      })
      this.$refs.table.setItems(items)
    },
    getForm () {
      return {
        ...this.$refs.info.getForm(),
        items: this.$refs.table.getItems()
      }
    },
    // 从商品信息表中读取计划出库数量
    getOutboundQty () {
      this.outboundItems = this.$refs.table.getItems()
    },
    setForm (form) {
      this.$refs.info.setForm(form)
      // this.$refs.table.setItems(form.items)
    },
    showOutbound () {
      // 读取已出库数量
      this.getOutboundQty()
      this.$refs.outboundPicker.open()
    },
    validate () {
      const tasks = [
        this.$refs.info.validate(),
        this.$refs.table.validate()
      ]
      return Promise.all(tasks)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
