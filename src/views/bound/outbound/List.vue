<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.outbound')"
        @search="fetch"/>
      <Button
        button-type="add"
        @click="toAdd"/>
    </template>
    <TopBottomLayout>
      <div slot="top">
        <Toolbar title="出库单"/>
        <HeadTable
          ref="headTable"
          :search-key="searchKey"
          @current-change="handleCurrentChange"/>
      </div>
      <div slot="bottom">
        <Toolbar title="商品"/>
        <ItemTable :data="data"/>
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>
import configMixin from './mixins/config'

import HeadTable from './components/HeadTable'
import ItemTable from './components/ItemTable'

export default {
  components: {
    HeadTable,
    ItemTable
  },
  mixins: [ configMixin ],
  data () {
    return {
      searchKey: '',
      data: []
    }
  },
  methods: {
    fetch () {
      this.$refs.headTable.fetch()
    },
    handleCurrentChange (row) {
      this.data = row.items
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
