<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.customerName')"
        @search="fetch"/>
      <Button
        button-type="add"
        @click="toAdd"/>
    </template>
    <DataTable
      ref="table"
      :url="urlQuery"
      :params="params"
      :columns="columns">
      <template
        slot="operations"
        slot-scope="scope">
        <Button
          button-type="view"
          @click="toView(scope.row.id)"/>
        <Button
          button-type="edit"
          @click="toEdit(scope.row.id)"/>
        <ConfirmButton
          @click="remove(scope.row)"/>
        <Button
          button-type="inWarehouse"
          @click="toWarehouse(scope.row.id)"/>
        <Button
          button-type="print"
          @click="toPrint(scope.row.id)"/>
      </template>
    </DataTable>
    <div style="height:100px">
      123
    </div>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'

export default {
  name: 'PurchaseList',
  mixins: [ CrudMixin, configMixin ],
  data () {
    return {
      searchValue: null
    }
  },
  computed: {
    params () {
      let params = [ { where: { and: [], or: [] } } ]
      params[0].where.and.push({ enableFlag: 'System_EnableFlag_1' })
      if (this.searchValue) {
        params[0].where.or.push({ orderNo: { like: this.searchValue } })
      }
      return params
    },
    columns () {
      return [
        {
          label: '单号',
          prop: 'orderNo'
        },
        {
          label: '创建日期',
          prop: 'postingDate'
        },
        {
          label: '供应商代码',
          prop: 'vendorNo'
        },
        {
          label: '供应商名称',
          prop: 'vendorName'
        },
        {
          label: '采购日期',
          prop: 'postingDate'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '总价',
          prop: 'status'
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
    }
  },
  methods: {
    fetch () {
      this.$refs.table.fetch()
    }
  }
}
</script>
