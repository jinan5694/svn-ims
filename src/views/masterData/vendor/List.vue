<template>
  <Page
    v-loading="loading"
    :element-loading-text="$t('loading_text')">
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.vendorName')"
        @search="query"/>
      <Button
        button-type="add"
        @click="add"/>
    </template>
    <DataTable
      ref="table"
      url="/VendorService/query"
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
  name: 'VendorList',
  data () {
    return {
      loading: false,
      searchValue: null,
      columns: [
        {
          label: '供应商名称',
          prop: 'vendorName'
        },
        {
          label: '联系人',
          prop: 'contact'
        },
        {
          label: '联系电话',
          prop: 'vendorTel'
        },
        {
          label: '地址',
          prop: 'addr'
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
        params[0].where.or.push({ vendorName: { like: this.searchValue } })
      }
      return params
    }
  },
  methods: {
    query () {
      this.$refs.table.fetch()
    },
    add () {
      this.$router.push('/masterData/vendor/add')
    },
    view (data) {
      this.$router.push('/masterData/vendor/view/' + data.id)
    },
    edit (data) {
      this.$router.push('/masterData/vendor/edit/' + data.id)
    },
    stop (data) {
      this.$confirm('是否停用' + data.vendorName + '供应商', this.$t('confirm_info'), {
        distinguishCancelAndClose: true,
        closeOnClickModal: false,
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel')
      })
        .then(() => {
          this.loading = true
          let param = { id: data.id, enableFlag: 'System_EnableFlag_0' }
          this.$axios.post('VendorService/update', [param])
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
