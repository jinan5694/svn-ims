<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.warehouse')"
        @search="fetch"/>
      <Button
        button-type="add"
        @click="toAdd"/>
    </template>
    <ConfirmButton>test</ConfirmButton>
    <DataTable
      ref="table"
      url="/WarehouseService/query"
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
        <ConfirmButton>test</ConfirmButton>
      </template>
    </DataTable>
  </Page>
</template>
<script>

export default {
  data () {
    return {
      searchKey: ''
    }
  },
  computed: {
    // 建议 params 参数放在计算属性中，可以方便的与其他变量整合
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
          width: 100
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
  },
  watch: {

  },
  methods: {
    fetch () {
      this.$refs.table.fetch()
    },
    toAdd () {
      this.$router.push('/masterData/warehouse/add')
    },
    toView (id) {
      this.$router.push('/masterData/warehouse/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/warehouse/edit/' + id)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
