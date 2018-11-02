<template>
  <Page>
    <p>{{ value }}</p>
    <In
      v-model="value"
      :max="10"/>
    <Number/><br >
    <hr>
    <Number value="0"/><br >
    <Number :value="0"/><br >
    <Number
      :value="0"
      amount/><br ><hr>

    <Number value="1"/><br >
    <Number :value="1"/><br >
    <Number
      :value="1"
      amount/><br ><hr>

    <Number value="1.2345"/><br >
    <Number :value="1.2345"/><br >
    <Number
      :value="1.2345"
      amount/><br ><hr>

    <Number value="test"/><br >
    <!-- <Number :value="test"/><br > -->
    <Number
      value="test"
      amount/><br ><hr>

    <Number value="-3456.7789"/><br >
    <Number :value="-3456.7789"/><br >
    <Number
      :value="-3456.7789"
      amount/><br ><hr>

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
      <el-select
        slot="sex"
        v-model="form.sex"/>
      <el-date-picker
        slot="time"
        v-model="form.time"
        type="datetime"/>
    </GridForm>
  </Page>
</template>
<script>
import BaseButton from '@/components/BaseButton'
import In from '@/components/in'

export default {
  name: 'Play',
  components: {
    BaseButton,
    In
  },
  data () {
    return {
      value: 5,
      form: {
        name: null,
        age: null,
        date: null,
        sex: null,
        time: null,
        address: null
      },
      items: [
        {
          label: '日期',
          prop: 'date'
        },
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
          label: '性别',
          prop: 'sex',
          span: 1
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '姓名',
          prop: 'name'
        },
        {
          label: '时间',
          prop: 'time',
          span: 2
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
