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
          :disabled="viewFlag"
          maxlength="255"/>
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
          v-model="form.vendorTel"
          :disabled="viewFlag"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="银行账号"
        prop="">
        <el-input
          v-model="form.bankAccount"
          :disabled="viewFlag"
          maxlength="100"/>
      </el-form-item>
      <el-form-item
        label="开户行"
        prop="">
        <el-input
          v-model="form.openingBank"
          :disabled="viewFlag"
          maxlength="100"/>
      </el-form-item>
      <el-form-item
        label="税号"
        prop="">
        <el-input
          v-model="form.taxNo"
          :disabled="viewFlag"
          maxlength="30"/>
      </el-form-item>
      <el-form-item
        label="地址"
        prop="">
        <el-input
          v-model="form.addr"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'VendorForm',
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
        vendorName: null,
        contact: null,
        vendorTel: null,
        bankAccount: null,
        openingBank: null,
        taxNo: null,
        addr: null
      },
      rules: {
        vendorName: [{ required: true, message: '请输入供应商名称', trigger: ['blur', 'change'] }]
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
