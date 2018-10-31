<template>
  <Page>
    <GridForm
      :items="items"
      :model="form"
      :number-of-columns="4">
      <!-- <div slot="date">
        <el-date-picker v-model="form.date"/>
      </div> -->
      <el-date-picker
        slot="date"
        v-model="form.date"/>
      <div slot="name">
        <el-input v-model="form.name"/>
      </div>
      <div slot="address">
        <el-input
          v-model="form.address"
          type="textarea"/>
      </div>
    </GridForm>
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
      form: {
        name: null,
        date: null,
        address: null
      },
      items: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name',
          span: 1
        },
        {
          label: '地址',
          prop: 'address'
        }
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
          slotName: 'name2'
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
