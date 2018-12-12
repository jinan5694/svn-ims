<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')"
  >
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.zone')"
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
        slot="zoneType"
        slot-scope="{row}"
      >
        {{
          $translate({
            key: 'Inventory_ZoneType',
            value: row.zoneType
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
          msg="确定停用该库区？"
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
          prop: 'warehouse.warehouseCode'
        },
        {
          label: '库区代码',
          prop: 'zoneCode'
        },
        {
          label: '库区名称',
          prop: 'zoneName'
        },
        {
          label: '库区类型',
          prop: 'zoneType',
          slotName: 'zoneType'
        },
        {
          label: '默认库位',
          formatter: row => {
            const defaultBin = row.bin.find(item => {
              return item.defaultBinFlag === 'System_YesNo_1'
            })
            return defaultBin && defaultBin.binCode
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
          { zoneCode: { like: this.searchKey } },
          { zoneName: { like: this.searchKey } }
        ]
      }
      const path = ['warehouse', 'bin']
      return [params, path]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
