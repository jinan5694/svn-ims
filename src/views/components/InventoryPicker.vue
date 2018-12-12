<template>
  <div class="inventory-picker">
    <ElDialog
      :visible.sync="visible"
      title="选择库存"
      width="90%"
    >
      <BaseTable
        :columns="columns"
        :data="renderData"
        :span-method="spanMethod"
        border
      >
        <!-- slot -->
        <template
          slot="movementQty"
          slot-scope="{row}"
        >
          <InputNumber
            slot="movementQty"
            v-model="row.movementQty"
            :min="0"
            :max="row.qty"
          />
        </template>
      </BaseTable>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <ElButton @click="close">
          {{ $t('cancel') }}
        </ElButton>
        <ElButton
          type="primary"
          @click="handleDone"
        >
          {{ $t('ok') }}
        </ElButton>
      </span>
    </ElDialog>
  </div>
</template>

<script>

export default {
  props: {
    saleOrderItems: {
      type: Array,
      default: () => []
    },
    outboundOrderItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      inventories: []
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
          label: '销售数量',
          prop: 'orderQty'
        },
        {
          label: '批次',
          prop: 'prodBatch.batchCode'
        },
        {
          label: '仓库',
          prop: 'warehouse.warehouseName'
        },
        {
          label: '库区',
          prop: 'zone.zoneName'
        },
        {
          label: '库位',
          prop: 'bin.binName'
        },
        {
          label: '库存数量',
          prop: 'qty'
        },
        {
          label: '出库数量',
          slotName: 'movementQty'
        }
      ]
      return columns
    },
    renderData () {
      const inventories = this.getSpanData(this.inventories)
      return inventories.map(invItem => {
        // 注入销售单的销售数量为计划出库数量
        const equalSaleItem = this.saleOrderItems.find(saleOrderItem => {
          return invItem.product.id === saleOrderItem.product.id
        })
        if (equalSaleItem) {
          invItem.movementQty = equalSaleItem.orderQty
        }

        // 回写计划出库数量
        const equalItem = this.outboundOrderItems.find(obOrderItem => {
          return this.eq(invItem, obOrderItem)
        })
        if (equalItem) {
          invItem.movementQty = equalItem.movementQty
        }

        return invItem
      })
    },
    saleOrderProductIds () {
      return this.saleOrderItems.map(item => {
        return item.product.id
      })
    },
    params () {
      const query = {
        where: {
          and: [
            { 'product.id': { in: this.saleOrderProductIds } },
            { 'invMtrlStatus': 'Inventory_MtrlInvMtrlStatus_MIMS001' }, // 库存物料状态
            { 'invBizStatus': 'Inventory_MtrlInvBizStatus_MIBS001' }, // 库存业务状态
            { 'invCheckStatus': 'Inventory_MtrlInvCheckStatus_MICS001' } // 库存盘点状态
          ]
        },
        order: {
          'product.id': 1,
          'prodBatch.id': 1
        }
      }
      const path = []
      return [query, path]
    },
    // 有效的行
    validRow () {
      return this.renderData.filter(item => {
        return item.movementQty > 0
      })
    }
  },
  methods: {
    close () {
      this.visible = false
    },
    eq (inventory, obItem) {
      return inventory.product.id === obItem.product.id &&
        inventory.prodBatch.id === obItem.prodBatch.id &&
        inventory.warehouse.id === obItem.sourceLoc.id &&
        inventory.zone.id === obItem.sourceZone.id &&
        inventory.bin.id === obItem.sourceBin.id
    },
    fetch () {
      const url = '/MetirialInventoryService/query'
      this.$axios.get(url, { params: this.params }).then(resp => {
        this.inventories = resp.data
      })
    },
    getSpanData (sourceData) {
      const data = this.$_.cloneDeep(sourceData)
      let firstId = null
      let firstIndex = 0
      data.forEach((item, index) => {
        if (item.product.id !== firstId) {
          firstId = item.product.id
          item.rowspan = 1
          firstIndex = index
        } else {
          item.rowspan = 0
          data[firstIndex].rowspan += 1
        }
      })
      return data
    },
    handleDone () {
      this.$emit('inventory-change', this.validRow)
      this.close()
    },
    open () {
      this.visible = true
    },
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        return {
          rowspan: row.rowspan,
          colspan: 1
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
