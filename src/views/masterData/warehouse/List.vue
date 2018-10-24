<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.warehouse')"
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
        <ConfirmButton @click="remove(row)"/>
      </template>
    </DataTable>
  </Page>
</template>
<script>
import CrudMixin from '@/mixins/crud'
import configMixin from './mixins/config'

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
          label: '仓库编号',
          prop: 'warehouseNo'
        },
        {
          label: '仓库代码',
          prop: 'warehouseCode'
        },
        {
          label: '仓库名称',
          prop: 'warehouseName'
        },
        {
          label: '仓库属性',
          prop: 'warehouseCategory',
          slotName: 'warehouseCategory'
        },
        {
          label: '计价方式',
          prop: 'pricingMethod',
          slotName: 'pricingMethod'
        },
        {
          label: '电话',
          prop: 'tel'
        },
        {
          label: '地址',
          prop: 'addr'
        },
        {
          label: '联系人',
          prop: 'contact'
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '操作',
          slotName: 'operator',
          align: 'center',
          width: 200
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
          { warehouseNo: { like: this.searchKey } },
          { warehouseCode: { like: this.searchKey } },
          { warehouseName: { like: this.searchKey } }
        ]
      }
      return [params]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
