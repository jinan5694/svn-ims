<template>
  <div class="form">
    <Toolbar title="基本信息"/>
    <Info
      ref="info"
      :editable="editable"
      @order-change="handleOrderChange"/>
    <Toolbar title="商品信息"/>
    <Table
      ref="table"
      :editable="editable"/>
  </div>
</template>
<script>
import _ from 'lodash'
import Info from './Info'
import Table from './Table'

export default {
  components: {
    Info,
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
      form: {}
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
      const items = order.productItems.map(item => {
        return _.assign({}, _.cloneDeep(this.defaultItem), {
          product: item.product,
          // 计划入库数量 = 采购数量 - 已入库数量
          movementQty: item.qty - item.inQty,
          price: item.price
        })
      })
      this.$refs.table.setItems(items)
    },
    getForm () {
      return {
        ...this.$refs.info.getForm(),
        items: this.$refs.table.getItems()
      }
    },
    setForm (form) {
      this.$refs.info.setForm(form)
      this.$refs.table.setItems(form.items)
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
