<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
  >
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.prod_batch')"
        @search="fetch"
      />
      <Button
        button-type="add"
        @click="toAdd"
      />
    </template>
    <DataTable
      ref="table"
      :url="urlQuery"
      :params="params"
      :columns="columns"
    >
      <template
        slot="operator"
        slot-scope="{row}"
      >
        <Button
          button-type="view"
          @click="toView(row.id)"
        />
        <Button
          button-type="edit"
          @click="toEdit(row.id)"
        />
        <ConfirmButton
          text="停用"
          msg="确定停用该仓库？"
          @click="remove(row)"
        />
      </template>
    </DataTable>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'

import { timeToDate, translateBiz } from '@/common/utils'

export default {
  mixins: [ CrudMixin, configMixin ],
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    columns () {
      return [
        {
          label: '产品',
          prop: 'product.prodName'
        },
        {
          label: '批次号',
          prop: 'batchCode'
        },
        {
          label: '批次描述',
          prop: 'batchDesc'
        },
        {
          label: '批次状态',
          prop: 'batchStatus'
        },
        {
          label: '最后采购时间',
          prop: 'lastPurchaseTime',
          width: 150
        },
        {
          label: '生产日期',
          prop: 'productionDate',
          formatter: row => timeToDate(row.productionDate)
        },
        {
          label: '失效日期',
          prop: 'expirationDate',
          formatter: row => timeToDate(row.productionDate)
        },
        {
          label: '供应商',
          prop: 'vendor',
          formatter: row => translateBiz(row.vendor, this.vendors).vendorName
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
          { batchCode: { like: this.searchKey } },
          { batchDesc: { like: this.searchKey } }
        ]
      }
      const path = ['product']
      return [params, path]
    },
    vendors () {
      return this.$store.state.Business.vendors
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
