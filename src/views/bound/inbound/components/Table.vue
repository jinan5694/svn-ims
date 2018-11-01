<template>
  <BaseTable
    :columns="columns"
    :data="data">
    <!-- slot -->
    <template
      slot="prodName"
      slot-scope="{row, index}">
      <el-input v-model="row.prodName"/>
    </template>
    <template
      slot="operator"
      slot-scope="{row, index}">
      <ConfirmButton @click="remove(row)"/>
      <el-button
        type="text"
        size="mini">复制</el-button>
    </template>
  </BaseTable>
</template>

<script>
export default {
  data () {
    return {
      form: {
        purchaseOrder: {
          id: null, // 采购单
          orderNo: null
        },
        sourceOrg: null, // vendor id
        postingDate: null, // 入库日期
        operator: null, // 操作员
        remark: null
      },
      data: [
        {
          product: {
            id: null,
            prodName: null,
            prodCode: null,
            unit: null,
            specmodel: null,
            brand: null
          },
          prodbatch: { // 批次
            batchCode: null
          },
          destLoc: { // 仓库
            id: null
          },
          destZone: { // 库区
            id: null
          },
          destBin: { // 库位
            id: null
          },
          movementQty: 0, // 入库数量
          price: 0, // 商品中带出的，可以修改
          amount: 0 // 根据数量和金额计算

        }
      ]
    }
  },
  computed: {
    columns () {
      return [
        {
          label: '商品名称',
          prop: 'prodName',
          slotName: 'prodName'
        },
        {
          label: '商品编码',
          prop: 'prodCode'
        },
        {
          label: '单位',
          prop: 'unit'
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
          label: '批次',
          prop: 'product.batch'
        },
        {
          label: '仓库',
          prop: 'warehouseId'
        },
        {
          label: '入库数量',
          prop: 'movementQty'
        },
        {
          label: '单价',
          prop: 'costPrice'
        },
        {
          label: '金额',
          prop: 'costAmount'
        },
        {
          label: '操作',
          slotName: 'operator'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
