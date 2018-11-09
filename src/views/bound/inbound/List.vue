<template>
  <Page>
    <template slot="toolbar">
      <Search
        v-model="searchKey"
        :placeholder="$t('placeholder.inbound')"
        @search="fetch"/>
      <Button
        button-type="add"
        @click="toAdd"/>
    </template>
    <TopBottomLayout>
      <div slot="top">
        <Toolbar title="入库单"/>
        <InboundDocTable
          ref="inboundDocTable"
          :search-key="searchKey"
          @current-change="handleCurrentChange"/>
      </div>
      <div slot="bottom">
        <Toolbar title="商品"/>
        <InboundDocItemTable :items="docItems"/>
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>
// mixins
import configMixin from './mixins/config'
// components
import InboundDocTable from './components/InboundDocTable'
import InboundDocItemTable from './components/InboundDocItemTable'

export default {
  components: {
    InboundDocTable,
    InboundDocItemTable
  },
  mixins: [ configMixin ],
  data () {
    return {
      searchKey: '',
      docItems: []
    }
  },
  methods: {
    fetch () {
      this.$refs.inboundDocTable.fetch()
    },
    handleCurrentChange (row) {
      this.docItems = row.items
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
