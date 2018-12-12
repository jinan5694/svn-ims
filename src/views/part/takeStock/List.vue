<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchValue"
        :placeholder="$t('placeholder.takeStock')"
        @search="fetch"
      />
      <Button
        button-type="add"
        @click="toAdd"
      />
    </template>
    <TopBottomLayout>
      <div slot="top">
        <Toolbar :title="$t('take_stock')" />
        <HeadTable
          ref="headTable"
          :search-key="searchValue"
          @current-change="handleCurrentChange"
        />
      </div>
      <div slot="bottom">
        <Toolbar :title="$t('product')" />
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
  name: 'TakeStockList',
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
