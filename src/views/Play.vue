<template>
  <Page>
    <p>{{ value }}</p>
    <el-button @click="value += 1">add</el-button>
    <!-- <input
      v-model="value"
      type="text"> -->

    <div>input temp</div>
    <InputTemp
      v-model="value"
      clearable
      @input="handleInput"
      @change="handleChange"/>

    <div>input render</div>
    <InputRender
      v-model="value"
      clearable
      @input="handleInput"
      @change="handleChange"/>

    <div>input functional</div>
    <InputFunc
      v-model="value"
      clearable
      @input="handleInput"
      @change="handleChange"/>

    <div>element-ui</div>
    <el-input
      v-model="value"
      clearable
      @input="handleInput"
      @change="handleChange"/>

    <div>native</div>
    <input
      v-model="value"
      clearable
      @input="handleInput"
      @change="handleChange">

    <div>InputNumber</div>
    <InputNumber
      v-model="value"
      controls
      @input="handleInput"
      @change="handleChange" />
  </Page>
</template>
<script>
import BaseButton from '@/components/BaseButton'
import Inputt from '@/components/Input'
import In from '@/components/in'

import InputTemp from '@/test/input-temp'
import InputRender from '@/test/input-render'
import InputFunc from '@/test/input-func'

export default {
  name: 'Play',
  components: {
    BaseButton,
    In,
    Inputt,
    InputTemp,
    InputRender,
    InputFunc
  },
  data () {
    return {
      value: 5
    }
  },
  watch: {
    value (value) {
      console.log('play watch, value is:', value)
    }
  },
  methods: {
    handleChange (value) {
      console.log('play change', value)
    },
    handleInput (value) {
      console.log('play input', value)
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
