<template>
  <el-dialog
    :visible="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :before-close="close"
    :title="$t('product_select')"
    width="1200px">
    <div class="search">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.prodName')"
        @search="fetch"/>
    </div>
    <DataTable
      ref="table"
      :url="urlQuery"
      :params="params"
      :columns="columns"
      :table-config="tableConfig">
      <template
        slot="unit"
        slot-scope="scope">
        {{
          $translate({
            key: 'AfterSales_Unit',
            value: scope.row.unit
          })
        }}
      </template>
      <template
        slot="prodCategory"
        slot-scope="scope">
        {{
          $translate({
            key: 'AfterSales_ProdSubCate',
            value: scope.row.prodCategory
          })
        }}
      </template>
    </DataTable>
    <span slot="footer">
      <Button
        button-type="ok"
        @click="select"/>
      <Button
        button-type="cancel"
        @click="close"/>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchValue: null,
      multipleSelection: []
    }
  },
  computed: {
    urlQuery () {
      return '/ProductService/query'
    },
    params () {
      let params = [{ where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }]
      if (this.searchValue) {
        params[0].where.and.push({ prodName: this.searchValue })
      }
      return params
    },
    columns () {
      return [
        {
          type: 'selection',
          width: '45px'

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
          label: '计量单位',
          slotName: 'unit'
        },
        {
          label: '规格型号',
          prop: 'specmodel'
        },
        {
          label: '商品类型',
          slotName: 'prodCategory'
        },
        {
          label: '品牌',
          prop: 'brand'
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ]
    },
    tableConfig () {
      return {
        events: {
          'selection-change': this.handleSelectionChange,
          'row-click': this.handleRowClick
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    fetch () {
      this.$refs.table.fetch()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleRowClick (val) {
      this.$refs.table.$children[0].$children[0].toggleRowSelection(val)
    },
    select () {
      this.$emit('select', this.multipleSelection)
      this.close()
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
   text-align: right;
}
</style>
