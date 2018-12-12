<template>
  <DataTable
    ref="table"
    :columns="columns"
    :params="params"
    :table-config="tableConfig"
    :url="urlQuery"
  >
    <template
      slot="orderStatus"
      slot-scope="{row}"
    >
      {{
        $translate({
          key: 'AfterSales_OrderStatus_POStatus',
          value: $_.get(row, 'purchaseOrder.orderStatus')
        })
      }}
    </template>
    <template
      slot="operator"
      slot-scope="{row}"
    >
      <Button
        button-type="view"
        @click="toView(row.id)"
      />
      <Button
        v-show="orderEditable(row)"
        button-type="edit"
        @click="toEdit(row.id)"
      />
      <!-- TODO: 实现列表入库，跳转到详情页 -->
      <!-- <el-button type="text">入库</el-button> -->
      <ConfirmButton
        v-show="orderEditable(row)"
        @click="remove(row)"
      />
    </template>
  </DataTable>
</template>

<script>
// mixins
import CrudMixin from '@/mixins/crud'
import configMixin from '../mixins/config'
// utils
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
          // TODO: replace docCode
          prop: 'purchaseOrder.orderNo'
        },
        {
          label: '订单编号',
          prop: 'purchaseOrder.orderNo'
        },
        {
          label: '订单状态',
          prop: 'purchaseOrder.orderStatus',
          slotName: 'orderStatus'
        },
        {
          label: '创建日期',
          formatter: row => timeToDate(row.createdTime),
          width: 90
        },
        {
          label: '入库日期',
          formatter: row => timeToDate(row.postingDate),
          width: 90
        },
        {
          label: '供应商代码',
          formatter: row => {
            const vendor = this.vendors.find(item => {
              return item.id === row.sourceOrg
            })
            return this.$_.get(vendor, 'vendorCode')
          }
        },
        {
          label: '供应商名称',
          formatter: row => {
            const vendor = this.vendors.find(item => {
              return item.id === row.sourceOrg
            })
            return this.$_.get(vendor, 'vendorName')
          }
        },
        {
          label: '采购日期',
          formatter: row => timeToDate(row.postingDate),
          width: 90
        },
        {
          label: '状态',
          prop: 'docStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_DOCStatus_InStorageDOCStatus',
              value: row.docStatus
            })
          },
          width: 70
        },
        {
          label: '冲销状态',
          prop: 'woStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_OrderWithdrawStatus',
              value: row.woStatus
            })
          },
          width: 70
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
          { 'purchaseOrder.orderNo': { like: this.searchKey } }
          // TODO: doc code
          // { 'docCode': { like: this.searchKey } }
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
