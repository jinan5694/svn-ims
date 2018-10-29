<template>
  <DataTable
    ref="table"
    :url="urlQuery"
    :params="params"
    :columns="columns"
    :pagination-config="paginationConfig">
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
  </DataTable>
</template>

<script>
import CrudMixin from '@/mixins/crud'
import configMixin from '../mixins/config'

export default {
  mixins: [ CrudMixin, configMixin ],
  props: {
    orderNo: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // searchKey: ''
    }
  },
  computed: {
    columns () {
      return [
        {
          label: 'ID',
          prop: 'id'
        },
        {
          label: '商品名称',
          prop: 'prodName'
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
          label: '状态',
          prop: 'docItemStatus'
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
      // id here
      if (this.orderNo !== '') {
        params.where.or = [
          { id: { like: this.orderNo } }
        ]
      }
      const path = ['zone']
      return [params, path]
    },
    paginationConfig () {
      return {
        props: {
          pageSize: 5
        }
      }
    }
  },
  watch: {
    orderNo () {
      if (this.orderNo) {
        this.fetch()
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
