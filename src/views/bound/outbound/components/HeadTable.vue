<template>
  <DataTable
    ref="table"
    :url="urlQuery"
    :params="params"
    :columns="columns"
    :table-config="tableConfig">
    <template
      slot="orderStatus"
      slot-scope="{row, index}">
      {{
        $translate({
          key: 'AfterSales_OrderStatus_POStatus',
          value: $_.get(row, 'purchaseOrder.orderStatus')
        })
      }}
    </template>
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
        v-show="orderEditable(row)"
        button-type="edit"
        @click="toEdit(row.id)"/>
      <!-- <el-button type="text">入库</el-button> -->
      <ConfirmButton
        v-show="orderEditable(row)"
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
          label: '出库单号',
          prop: 'id'
        },
        {
          label: '订单编号',
          prop: 'saleOrder.orderNo'
        },
        {
          label: '订单状态',
          prop: 'saleOrder.orderStatus',
          slotName: 'orderStatus'
        },
        {
          label: '创建日期',
          formatter: row => timeToDate(row.createdTime)
        },
        {
          label: '出库日期',
          formatter: row => timeToDate(row.postingDate)
        },
        {
          label: '客户名称',
          prop: 'destOrg.customerName'
        },
        {
          label: '客户类别',
          prop: 'destOrg.customerType'
        },
        {
          label: '销售日期',
          formatter: row => timeToDate(row.saleOrder.postingDate)
        },
        {
          label: '状态',
          prop: 'docStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_DOCStatus_OutStorageDOCStatus',
              value: row.docStatus
            })
          }
        },
        {
          label: '冲销状态',
          prop: 'woStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_OrderWithdrawStatus',
              value: row.woStatus
            })
          }
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
      const path = ['saleOrder', 'items']
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
    },
    vendors () {
      return this.$store.state.Business.vendors
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
