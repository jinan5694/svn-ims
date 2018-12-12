<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.outbound')"
        @search="fetch"
      />
      <Button
        button-type="add"
        @click="toAdd"
      />
    </template>
    <TopBottomLayout>
      <div slot="top">
        <Toolbar title="出库单" />
        <OutboundOrderTable
          ref="obOrderTable"
          :search-key="searchKey"
          @current-change="handleCurrentChange"
        />
      </div>
      <div slot="bottom">
        <Toolbar title="商品" />
        <OutboundOrderItemTable
          ref="obOrderItemTable"
          :editable="false"
        />
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>
import configMixin from './mixins/config'

import OutboundOrderTable from './components/OutboundOrderTable'
import OutboundOrderItemTable from './components/OutboundOrderItemTable'

export default {
  components: {
    OutboundOrderTable,
    OutboundOrderItemTable
  },
  mixins: [ configMixin ],
  data () {
    return {
      searchKey: ''
    }
  },
  methods: {
    fetch () {
      this.$refs.obOrderTable.fetch()
    },
    handleCurrentChange (row) {
      this.$refs.obOrderItemTable.setItems(row.items)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
