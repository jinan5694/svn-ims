<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.sale')"
        @search="fetch"
      />
      <Button
        button-type="add"
        @click="toAdd"
      />
    </template>
    <TopBottomLayout>
      <div slot="top">
        <Toolbar title="销售单" />
        <HeadTable
          ref="headTable"
          :search-key="searchValue"
          @current-change="handleCurrentChange"
        />
      </div>
      <div slot="bottom">
        <Toolbar title="商品" />
        <ItemTable :data="data" />
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>
import configMixin from './mixins/config'
import HeadTable from './components/HeadTable'
import ItemTable from './components/ItemTable'

export default {
  name: 'PurchaseList',
  components: {
    HeadTable,
    ItemTable
  },
  mixins: [ configMixin ],
  data () {
    return {
      searchValue: null,
      data: []
    }
  },
  methods: {
    fetch () {
      this.$refs.headTable.fetch()
    },
    handleCurrentChange (row) {
      if (row) {
        this.data = row.productItems
      } else {
        this.data = []
      }
    }
  }
}
</script>
