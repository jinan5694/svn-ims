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
      </template>
    </DataTable>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'

export default {
  name: 'CustomerList',
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
        params[0].where.or.push({ customerName: { like: this.searchValue } })
      }
      return params
    },
    columns () {
      return [
        {
          label: '客户名称',
          prop: 'customerName'
        },
        {
          label: '客户电话',
          prop: 'customerTel'
        },
        {
          label: '客户类型',
          prop: 'customerCategory'
        },
        {
          label: '联系人',
          prop: 'contact'
        },
        {
          label: '联系电话',
          prop: 'customerTelOther'
        },
        {
          label: '状态',
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
          width: '120px'
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
