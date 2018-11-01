<template>
  <Page>
    <BaseButton
      type="add"
      @click="handleClick"/>
    <BaseButton type="save"/>
    <BaseButton type="search"/>
    <BaseButton type="print"/>
    <BaseButton type="back"/>

    <BaseButton type="view"/>
    <BaseButton type="edit"/>
    <BaseButton type="stop"/>
    <BaseButton
      :loading="true"
      type="edit"/>
    <BaseButton type="test">test</BaseButton>
    <div>{{ form }}</div>
    <GridForm
      :items="items"
      :model="form"
      :rules="rules">
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
          type="textarea"
          @change="handleChange"/>
      </div>
    </GridForm>
  </Page>
</template>
<script>
import BaseButton from '@/components/BaseButton'

export default {
  name: 'Play',
  components: {
    BaseButton
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
    rules () {
      return {
        date: [{ required: true }],
        name: [{ required: true }],
        age: [{ required: true }],
        address: [{ required: true }]
      }
    }
  },
  watch: {

  },
  mounted () {
    // this.$refs.in.focus()
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
    },
    handleClick () {
      console.log('click')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
