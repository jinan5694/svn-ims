<template>
  <DataTable
    ref="table"
    :url="urlQuery"
    :params="params"
    :columns="columns"
    :table-config="tableConfig"
  >
    <template
      slot="vendorCode"
      slot-scope="scope"
    >
      {{ vendorCode(scope.row.sourceOrg) }}
    </template>
    <template
      slot="vendorName"
      slot-scope="scope"
    >
      {{ vendorName(scope.row.sourceOrg) }}
    </template>
    <template
      slot="orderStatus"
      slot-scope="scope"
    >
      {{
        $translate({
          key: 'AfterSales_OrderStatus_POStatus',
          value: scope.row.orderStatus
        })
      }}
    </template>
    <template
      slot="operations"
      slot-scope="scope"
    >
      <Button
        button-type="view"
        @click="toView(scope.row.id)"
      />
      <Button
        button-type="edit"
        @click="toEdit(scope.row.id)"
      />
      <ConfirmButton
        @click="remove(scope.row)"
      />
      <!-- <Button
        button-type="inWarehouse"
        @click="toWarehouse(scope.row.id)"/> -->
      <Button
        button-type="print"
        @click="toPrint(scope.row.id)"
      />
    </template>
  </DataTable>
</template>

<script>
import CrudMixin from '@/mixins/crud'
import configMixin from '../mixins/config'
import { timeToDate, formatNumber } from '@/common/utils'

// import { timeToDate } from '@/common/utils'

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
          label: '单号',
          prop: 'orderNo'
        },
        {
          label: '创建日期',
          prop: 'createdTime',
          formatter: row => timeToDate(row.createdTime)
        },
        {
          label: '供应商代码',
          slotName: 'vendorCode'
        },
        {
          label: '供应商名称',
          slotName: 'vendorName'
        },
        {
          label: '采购日期',
          prop: 'postingDate',
          formatter: row => timeToDate(row.postingDate)
        },
        {
          label: '状态',
          slotName: 'orderStatus'
        },
        {
          label: '总价',
          prop: 'amount',
          formatter: row => formatNumber(row.amount, 'amount')
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '操作',
          prop: '',
          slotName: 'operations',
          align: 'center',
          width: '200px'
        }
      ]
    },
    params () {
      let params = [ { where: { and: [], or: [] } } ]
      params[0].where.and.push({ enableFlag: 'System_EnableFlag_1' })
      if (this.searchKey) {
        params[0].where.or.push({ orderNo: { like: this.searchKey } })
      }
      return params
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
    vendorCode (sourceOrg) {
      let vendor = this.$store.state.Business.vendors.filter((vendor) => {
        return sourceOrg === vendor.id
      })
      if (vendor && vendor.length) {
        return vendor[0].vendorCode
      }
    },
    vendorName (sourceOrg) {
      let vendor = this.$store.state.Business.vendors.filter((vendor) => {
        return sourceOrg === vendor.id
      })
      if (vendor && vendor.length) {
        return vendor[0].vendorName
      }
    },
    handleCurrentChange (row) {
      this.$emit('current-change', row)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
