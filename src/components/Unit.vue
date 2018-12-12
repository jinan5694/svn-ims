<template>
  <div class="unit-select">
    <ElPopover
      ref="pNPopover"
      v-model="pNPop"
      :disabled="disabled"
      trigger="click"
      placement="top-start"
      width="350"
      @hide="finish"
    >
      <span style="float: left;width: 330px;">
        <div
          v-for="(item, index) in unitData"
          :key="index"
          :class="{btnChecked : unitData[index].label==unitLabel }"
          class="btnOFF"
          @click="popoverClick(unitData[index])"
        >
          {{ unitData[index].label }}
        </div>
      </span>
    </ElPopover>
    <ElInput
      v-model="unitLabel"
      v-popover:pNPopover
      :readonly="true"
      :disabled="disabled"
      class="input-primary"
    >
      <!-- <i
        slot="suffix"
        class="el-input__icon el-icon-circle-close pointer"
        @click="handleClear"/> -->
    </ElInput>
  </div>
</template>
<script>

export default {
  name: 'Unit',
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pNPop: false,
      unitData: [].concat(this.$getDictByKey('AfterSales_Unit').sort((a, b) => { return a.sort - b.sort })),
      loading: false,
      unitCode: null,
      unitLabel: null
    }
  },
  watch: {
    'value': function (val) {
      this.unitCode = val
      this.unitData.forEach((value) => {
        if (value.code === val) { this.unitLabel = value.label }
      })
    }
  },
  created () {
    this.unitCode = this.value
    this.unitData.forEach((value) => {
      if (value.code === this.value) { this.unitLabel = value.label }
    })
  },
  methods: {
    popoverClick (val) {
      this.unitCode = val.code
      this.unitLabel = val.label
      this.pNPop = false
    },
    handleClear () {
      this.unitCode = ''
      this.unitLabel = ''
      this.$emit('input', '')
    },
    finish () {
      this.$emit('input', this.unitCode)
      this.$emit('change', this.unitCode)
    }
  }
}
</script>
<style lang="scss" scoped>
  .unit-select {
    display: flex;
    width: 100%;
    justify-content: space-between;
  .input-primary {
    width: 100%;
  }

  }
  .disabled {

    background-color: #ed1c24;
  }
  .btnOFF {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    display: inline-block;
    /*border:1px solid #c4c4c4;*/
    cursor: pointer;
    background-color: #e0e5e7;
    width: 50px;
    height: 28px;
    font-size: 16px;
    color: #111111;
    line-height: 28px;
    text-align: center;
    margin: 0px 5px 5px 0px;
    word-wrap: break-word;
    border-radius: 4px
  }

  .btnChecked {
    display: inline-block;
    /*border:1px solid #c4c4c4;*/
    cursor: pointer;
    background-color: #20a0ff;
    width: 50px;
    height: 28px;
    font-size: 16px;
    color: white;
    line-height: 28px;
    text-align: center;
    margin: 0px 5px 5px 0px;
    word-wrap: break-word;
    border-radius: 4px
  }

  .key-letter {
    margin-right: 7.8px;

  }

  .cut-off-rule {
    float: left;
    width: 1px;
    margin-right: 5px;
    height: 189px;
    background: rgb(190, 190, 190);
  }

  .but-keyboard-number {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    display: inline-block;
    /*border:1px solid #c4c4c4;*/
    cursor: pointer;
    background-color: #e0e5e7;
    width: 35px;
    height: 28px;
    font-size: 16px;
    color: #111111;
    line-height: 28px;
    text-align: center;
    margin: 0px 5px 7px 0px;
    word-wrap: break-word;
    border-radius: 4px
  }

  .num-9 {
    float: right;
    width: 32px;
    margin-left: 0px;
  }

  .bu-finish {
    text-align: center;
    width: 35px;
  }

  .del {
    display: inline-block;
    /*border:1px solid #c4c4c4;*/
    cursor: pointer;
    background-color: #e0e5e7;
    width: 105px;
    height: 28px;
    font-size: 16px;
    color: #111111;
    line-height: 28px;
    text-align: center;
    margin: 0px 5px 5px 0px;
    word-wrap: break-word;
    border-radius: 4px
  }

</style>
