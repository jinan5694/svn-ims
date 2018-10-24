<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.prodName')"
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
  name: 'ProductList',
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
        params[0].where.or.push({ prodName: { like: this.searchValue } })
      }
      return params
    },
    columns () {
      return [
        {
          label: '商品名称',
          prop: 'prodName'
        },
        {
          label: '商品编码',
          prop: 'prodCode'
        },
        {
          label: '计量单位',
          prop: 'unit'
        },
        {
          label: '规格型号',
          prop: 'specmodel'
        },
        {
          label: '商品类型',
          prop: 'prodType'
        },
        {
          label: '品牌',
          prop: 'brand'
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
  }
}
</script>
