<template>
  <Page>
    <div>{{ form }}</div>
    <GridForm
      :items="items"
      :model="form"
      :number-of-columns="4">
      <el-date-picker
        slot="date"
        v-model="form.date"/>
      <div slot="name">
        <el-input v-model="form.name"/>
      </div>
      <InputNumber
        ref="in"
        slot="age"
        v-model="form.age"
        type="number"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"/>
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
        age: null,
        address: null
      },
      items: [
        {
          label: '日期',
          prop: 'date'
        },
        {
          label: '姓名',
          prop: 'name'
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
  mounted () {
    this.$refs.in.focus()
  },
  methods: {
    handleChange (value) {
      console.log('change', value)
    },
    handleBlur (event) {
      console.log('blur')
    },
    handleFocus (event) {
      console.log('focus')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
