<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="客户名称"
        prop="customerName">
        <el-input
          v-model="form.customerName"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="客户电话"
        prop="">
        <el-input
          v-model="form.customerTel"
          :disabled="viewFlag"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="客户类别"
        prop="">
        <el-input
          v-model="form.customerCategory"
          :disabled="viewFlag"/>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="">
        <el-input
          v-model="form.contact"
          :disabled="viewFlag"
          maxlength="32"/>
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="">
        <el-input
          v-model="form.customerTelOther"
          :disabled="viewFlag"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="账单地址"
        prop="">
        <el-input
          v-model="form.billingAddr"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="收货地址"
        prop="">
        <el-input
          v-model="form.addr"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="">
        <el-input
          v-model="form.remark"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'CustomerForm',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    viewFlag: {
      type: Boolean,
      default: false
    },
    editFlag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        customerName: null,
        customerTel: null,
        customerCategory: null,
        contact: null,
        customerTelOther: null,
        billingAddr: null,
        addr: null,
        remark: null

      },
      rules: {
        customerName: [{ required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }]
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      if (this.viewFlag || this.editFlag) {
        this.form = _.assign({}, this.data)
      }
    },
    getForm () {
      return this.form
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
