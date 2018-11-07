<template>
  <div class="products">
    <div class="toolbar">
      <Search/>
    </div>
    <BaseTable
      :columns="columns"
      :data="renderData"
      :span-method="spanMethod"
      border>
      <!-- slot -->
      <template
        slot="movementQty"
        slot-scope="{row}">
        <InputNumber
          slot="movementQty"
          v-model="row.movementQty"
          :min="0"
          :max="row.qty"/>
      </template>
    </BaseTable>
  </div>
</template>

<script>
export default {
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
      sourceData: []
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
    mergeItems () {
      return this.items.map(item => {
        const eq = this.outbound.find(ob => {
          return this.eq(item, ob)
        })
        if (eq) {
          item.movementQty = eq.movementQty
        }
        return item
      })
    },
    renderData () {
      const spanData = this.getSpanData(this.sourceData)
      return spanData.map(item => {
        // 注入销售数量
        const eq = this.outbound.find(ob => {
          return this.eq(item, ob)
        })
        item.movementQty = eq ? eq.movementQty : 0

        item.orderQty = this.qtyMap[item.product.id]
        return item
      })
    },
    ids () {
      return this.items.map(item => {
        return item.id
      })
    },
    params () {
      const query = {
        where: {
          and: [
            { purposeId: { isNull: null } }, // 预留状态
            { 'product.id': { in: this.ids } }
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
    qtyMap () {
      const map = {}
      this.items.forEach(item => {
        map[item.id] = item.qty
      })
      return map
    }
  },
  created () {
    console.log('created')
    this.fetch()
  },
  methods: {
    eq (a, b) {
      return a.product.id === b.product.id &&
        a.prodBatch.id === b.prodBatch.id &&
        a.warehouse.id === b.sourceLoc.id &&
        a.zone.id === b.sourceZone.id &&
        a.bin.id === b.sourceBin.id
    },
    fetch () {
      const url = '/MetirialInventoryService/query'
      this.$axios.get(url, { params: this.params }).then(resp => {
        this.sourceData = resp.data
      })
    },
    // 外部调用
    getProducts () {
      return this.renderData.filter(item => {
        return item.movementQty > 0
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
@import '@/css/vars.scss';

.toolbar {
  text-align: right;
  margin-bottom: $size-small;
}
</style>
