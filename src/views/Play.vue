<template>
  <Page>
    <div>{{ form }}</div>
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
      <InputNumber
        slot="age"
        v-model="form.age"
        :max="100"
        :min="0"/>
      <div slot="address">
        <el-input
          v-model="form.address"
          type="textarea"
          @change="handleChange"/>
      </div>
    </GridForm>
  </Page>
</template>
<script>
import BaseTable from '@/components/BaseTable'
export default {
  name: 'Play',
  components: {
    BaseTable
  },
  data () {
    return {
      form: {
        name: null,
        age: null,
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
          label: '年龄',
          prop: 'age'
        },
        {
          label: '地址',
          prop: 'address',
          span: 2
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
    handleChange (value) {
      debugger
      console.log(value)
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
