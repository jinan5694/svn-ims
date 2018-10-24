<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="供应商名称"
        prop="vendorName">
        <el-input
          v-model="form.vendorName"
          :disabled="disabled"
          maxlength="255"/>
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
          v-model="form.vendorTel"
          :disabled="disabled"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="银行账号"
        prop="">
        <el-input
          v-model="form.bankAccount"
          :disabled="disabled"
          maxlength="100"/>
      </el-form-item>
      <el-form-item
        label="开户行"
        prop="">
        <el-input
          v-model="form.openingBank"
          :disabled="disabled"
          maxlength="100"/>
      </el-form-item>
      <el-form-item
        label="税号"
        prop="">
        <el-input
          v-model="form.taxNo"
          :disabled="disabled"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="地址"
        prop="">
        <el-input
          v-model="form.addr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'VendorForm',
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        vendorName: null,
        contact: null,
        vendorTel: null,
        bankAccount: null,
        openingBank: null,
        taxNo: null,
        addr: null
      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    rules () {
      return {
        vendorName: [{ required: true, message: '请输入供应商名称', trigger: ['blur', 'change'] }]
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
