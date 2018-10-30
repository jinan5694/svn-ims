<template>
  <Page>
    <BaseTable
      :columns="columns"
      :data="data"
    >
      <div
        slot="address"
        slot-scope="{index, row}">
        <div>out test</div>
        <span>{{ index }}</span>
      </div>
      <div
        slot="name"
        slot-scope="{index, row}">
        <div>name is: {{ row.name }}</div>
      </div>
    </BaseTable>
  </Page>
</template>
<script>
import BaseTable from '@/components/BaseTable'
export default {
  components: {
    BaseTable
  },
  data () {
    return {
      data: [
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2018-10-30', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }
      ]
    }
  },
  computed: {
    columns () {
      return [
        {
          label: '日期',
          prop: 'date',
          align: 'center'
        },
        {
          label: '姓名',
          prop: 'name',
          slotName: 'name'
        },
        {
          label: '地址',
          prop: 'address',
          slotName: 'address'
        }
      ]
    }
  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>

</style>
