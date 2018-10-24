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
          :disabled="disabled"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="客户电话"
        prop="">
        <el-input
          v-model="form.customerTel"
          :disabled="disabled"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="客户类别"
        prop="">
        <el-input
          v-model="form.customerCategory"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="">
        <el-input
          v-model="form.contact"
          :disabled="disabled"
          maxlength="32"/>
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="">
        <el-input
          v-model="form.customerTelOther"
          :disabled="disabled"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="账单地址"
        prop="">
        <el-input
          v-model="form.billingAddr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="收货地址"
        prop="">
        <el-input
          v-model="form.addr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="">
        <el-input
          v-model="form.remark"
          :disabled="disabled"
          type="textarea"
          maxlength="255"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CustomerForm',
  props: {
    editable: {
      type: Boolean,
      default: true
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

      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    rules () {
      return {
        customerName: [{ required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    setForm (form) {
      this.form = form
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
