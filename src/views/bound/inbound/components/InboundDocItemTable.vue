<template>
  <BaseTable
    ref="table"
    :columns="columns"
    :data="items">
    <template
      slot="operator"
      slot-scope="{row, index}">
      <Button
        button-type="view"
        @click="toView(row.id)"/>
      <Button
        button-type="edit"
        @click="toEdit(row.id)"/>
      <ConfirmButton
        text="停用"
        msg="确定停用该仓库？"
        @click="remove(row)"/>
    </template>
  </BaseTable>
</template>

<script>

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    columns () {
      return [
        {
          label: '商品名称',
          prop: 'product.prodName'
        },
        {
          label: '商品编码',
          prop: 'product.prodCode'
        },
        {
          label: '单位',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_Unit',
              value: this.$_.get(row, 'product.unit')
            })
          },
          width: 80
        },
        {
          label: '规格型号',
          prop: 'product.specmodel'
        },
        {
          label: '品牌',
          prop: 'product.brand'
        },
        {
          label: '入库数量',
          prop: 'movementQty'
        },
        {
          label: '单价',
          prop: 'price',
          width: 100
        },
        {
          label: '金额',
          prop: 'amount',
          width: 100
        },
        {
          label: '状态',
          prop: 'docItemStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_DOCStatus_InStorageDOCStatus',
              value: row.docItemStatus
            })
          },
          width: 80
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
