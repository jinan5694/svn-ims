<template>
  <DataTable
    ref="table"
    :url="urlQuery"
    :params="params"
    :columns="columns"
    :table-config="tableConfig">
    <template
      slot="warehouseCategory"
      slot-scope="{row, index}">
      {{
        $translate({
          key: 'Inventory_Attributes',
          value: row.warehouseCategory
        })
      }}
    </template>
    <template
      slot="pricingMethod"
      slot-scope="{row, index}">
      {{
        $translate({
          key: 'Inventory_PricingMethod',
          value: row.pricingMethod
        })
      }}
    </template>
    <template
      slot="operator"
      slot-scope="{row, index}">
      <Button
        button-type="view"
        @click="toView(row.id)"/>
      <Button
        button-type="edit"
        @click="toEdit(row.id)"/>
      <ConfirmButton
        text="停用"
        msg="确定停用该仓库？"
        @click="remove(row)"/>
    </template>
  </DataTable>
</template>

<script>
import CrudMixin from '@/mixins/crud'
import configMixin from '../mixins/config'

import { timeToDate } from '@/common/utils'

export default {
  mixins: [ CrudMixin, configMixin ],
  props: {
    searchKey: {
      type: String,
      default: null
    }
  },
  data () {
    return {

    }
  },
  computed: {
    columns () {
      return [
        {
          label: '入库单号',
          prop: 'purchaseOrder.orderNo'
        },
        {
          label: '订单编号',
          prop: 'purchaseOrder.orderNo'
        },
        {
          label: '订单状态',
          prop: 'purchaseOrder.orderStatus'
        },
        {
          label: '创建日期',
          formatter: row => timeToDate(row.createdTime)
        },
        {
          label: '入库日期',
          formatter: row => timeToDate(row.postingDate)
        },
        {
          label: '供应商代码',
          prop: 'purchaseOrder.vendorCode'
        },
        {
          label: '供应商名称',
          prop: 'purchaseOrder.vendorName'
        },
        {
          label: '采购日期',
          formatter: row => timeToDate(row.purchaseOrder && row.purchaseOrder.purchaseDate)
        },
        {
          label: '状态',
          prop: 'docStatus'
        },
        {
          label: '冲销状态',
          prop: 'woStatus'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '操作',
          slotName: 'operator',
          align: 'center',
          width: 150
        }
      ]
    },
    params () {
      const params = {
        where: {
          and: [
            { enableFlag: 'System_EnableFlag_1' }
          ]
        }
      }
      if (this.searchKey !== '') {
        params.where.or = [
          { id: { like: this.searchKey } }
        ]
      }
      const path = ['zone']
      return [params, path]
    },
    tableConfig () {
      return {
        props: {
          'highlight-current-row': true
        },
        events: {
          'current-change': this.handleCurrentChange
        }
      }
    }
  },
  methods: {
    handleCurrentChange (row) {
      this.$emit('current-change', row)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
