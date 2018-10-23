<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.prodName')"
        @search="query"/>
      <Button
        button-type="add"
        @click="add"/>
    </template>
    <DataTable
      ref="table"
      url="/ProductService/query"
      :params="params"
      :columns="columns">
      <template
        slot="operations"
        slot-scope="scope">
        <Button
          button-type="view"
          @click="view(scope.row)"/>
        <Button
          button-type="edit"
          @click="edit(scope.row)"/>
        <Button
          button-type="stop"
          @click="stop(scope.row)"/>
      </template>
    </DataTable>
  </Page>
</template>
<script>
export default {
  name: 'ProductList',
  data () {
    return {
      loading: false,
      searchValue: null,
      columns: [
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
  },
  computed: {
    params () {
      let params = [ { where: { and: [], or: [] } } ]
      params[0].where.and.push({ enableFlag: 'System_EnableFlag_1' })
      if (this.searchValue) {
        params[0].where.or.push({ prodName: { like: this.searchValue } })
      }
      return params
    }
  },
  methods: {
    query () {
      this.$refs.table.fetch()
    },
    add () {
      this.$router.push('/masterData/product/add')
    },
    view (data) {
      this.$router.push('/masterData/product/view/' + data.id)
    },
    edit (data) {
      this.$router.push('/masterData/product/edit/' + data.id)
    },
    stop (data) {
      this.$confirm('是否停用' + data.prodName + '商品', this.$t('confirm_info'), {
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel')
      })
        .then(() => {
          this.loading = true
          let param = { id: data.id, enableFlag: 'System_EnableFlag_0' }
          this.$axios.post('ProductService/update', [param])
            .then(resp => {
              this.$refs.table.fetch()
            }).finally(() => {
              this.loading = false
            })
        })
        .catch(action => {
        })
    }
  }
}
</script>
