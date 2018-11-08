<template>
  <BaseTable
    :columns="columns"
    :data="items">
    <!-- slot -->
    <template
      slot="operator"
      slot-scope="{row, index}">
      <el-button
        type="text"
        @click="handleRemove(index)">删除</el-button>
    </template>
  </BaseTable>
</template>

<script>
import { toNumber } from '@/common/utils'

export default {
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
    columns () {
      const columns = [
        {
          label: '商品名称',
          prop: 'product.prodName'
        },
        {
          label: '商品编码',
          prop: 'product.prodCode'
        },
        {
          label: '单位',
          prop: 'product.unit',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_Unit',
              value: this.$_.get(row, 'product.unit')
            })
          }
        },
        {
          label: '规格型号',
          prop: 'product.specmodel'
        },
        {
          label: '品牌',
          prop: 'product.brand'
        },
        {
          label: '批次',
          prop: 'prodBatch.batchCode'
        },
        {
          label: '仓库',
          prop: 'sourceLoc.warehouseName'
        },
        {
          label: '仓库',
          prop: 'sourceZone.zoneName'
        },
        {
          label: '仓库',
          prop: 'sourceBin.binName'
        },
        {
          label: '出库数量',
          prop: 'movementQty'
        },
        {
          label: '单价',
          prop: 'price'
        },
        {
          label: '金额',
          prop: 'amount'
        }
      ]
      if (this.editable) {
        columns.push({
          label: '操作',
          slotName: 'operator'
        })
      } else {
        columns.push({
          label: '状态',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_DOCStatus_OutStorageDOCStatus',
              value: row.docItemStatus
            })
          }
        })
      }
      return columns
    }
  },
  watch: {
    items: {
      handler (items) {
        items.forEach(item => {
          // 金额 = 入库数量 * 单价
          item.amount = toNumber(item.movementQty) * toNumber(item.price)
        })
      },
      deep: true
    }
  },
  methods: {
    getItems () {
      return this.items
    },
    handleRemove (index) {
      this.items.splice(index, 1)
    },
    setItems (items) {
      debugger
      this.items = items
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
