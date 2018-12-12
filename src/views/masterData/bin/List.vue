<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
  >
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.bin')"
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
        slot="binType"
        slot-scope="{row}"
      >
        {{
          $translate({
            key: 'Inventory_BinType',
            value: row.binType
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
          button-type="edit"
          @click="toEdit(row.id)"
        />
        <ConfirmButton
          text="停用"
          msg="确定停用该库位？"
          @click="remove(row)"
        />
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
          label: '仓库代码',
          prop: 'zone.warehouse.warehouseCode'
        },
        {
          label: '库区代码',
          prop: 'zone.zoneCode'
        },
        {
          label: '库位代码',
          prop: 'binCode'
        },
        {
          label: '库位名称',
          prop: 'binName'
        },
        {
          label: '库位类型',
          prop: 'binType',
          slotName: 'binType'
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
          { binCode: { like: this.searchKey } },
          { binName: { like: this.searchKey } }
        ]
      }
      const path = ['zone.warehouse']
      return [params, path]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
