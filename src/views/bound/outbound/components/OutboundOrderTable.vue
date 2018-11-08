<template>
  <DataTable
    ref="table"
    :url="urlQuery"
    :params="params"
    :columns="columns"
    :table-config="tableConfig">
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
  computed: {
    columns () {
      return [
        {
          label: '出库单号',
          prop: 'id'
        },
        {
          label: '销售单编号',
          prop: 'saleOrder.orderNo'
        },
        {
          label: '销售单状态',
          prop: 'saleOrder.orderStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_OrderStatus_SOStatus',
              value: this.$_.get(row, 'saleOrder.orderStatus')
            })
          }
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
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_CustomerCate',
              value: row.destOrg.customerCategory
            })
          }
        },
        {
          label: '销售日期',
          formatter: row => timeToDate(row.saleOrder.postingDate)
        },
        {
          label: '库存状态',
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
        },
        order: {
          updatedTime: 0
        }
      }
      if (this.searchKey !== '') {
        params.where.or = [
          { id: { like: this.searchKey } }
        ]
      }
      const path = []
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
    customers () {
      return this.$store.state.Business.customers
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
