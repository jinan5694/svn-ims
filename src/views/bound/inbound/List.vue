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
        <div class="title">入库单</div>
        <HeadTable
          ref="headTable"
          :search-key="searchKey"
          @current-change="handleCurrentChange"/>
      </div>
      <div slot="bottom">
        <div class="title">商品</div>
        <ItemTable :order-no="orderNo"/>
      </div>
    </TopBottomLayout>
  </Page>
</template>
<script>
import configMixin from './mixins/config'

import HeadTable from './components/HeadTable'
import ItemTable from './components/ItemTable'

export default {
  mixins: [ configMixin ],
  components: {
    HeadTable,
    ItemTable
  },
  data () {
    return {
      searchKey: '',
      orderNo: null
    }
  },
  methods: {
    fetch () {
      this.$refs.headTable.fetch()
    },
    handleCurrentChange (row) {
      this.orderNo = row.id
    }
  }
}
</script>

<style lang='scss' scoped>
$height-title: 24px;
.title {
  height: $height-title;
  line-height: $height-title;
  color: #999;
  font-size: 14px;
}
</style>
