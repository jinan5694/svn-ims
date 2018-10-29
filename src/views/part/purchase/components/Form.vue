<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :inline="true"
      label-width="100px">
      <el-form-item
        label="单据编号">
        <el-input
          v-model="form.orderNo"
          :disabled="true"/>
      </el-form-item>
      <el-form-item
        label="供应商"
        prop="sourceOrg.id">
        <el-select
          v-model="form.sourceOrg.id">
          <el-option
            v-for="item in vendors"
            :key="item.id"
            :label="item.vendorName"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="采购日期"
        prop="postingDate">
        <el-date-picker
          v-model="form.postingDate"
          :disabled="disabled"
          type="date"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item
        label="操作员"
        prop="operator.id">
        <el-select
          v-model="form.operator.id"
          :disabled="disabled">
          <el-option
            v-for="item in operators"
            :key="item.id"
            :label="item.employeeName"
            :value="item.id"/>
        </el-select>
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
        orderNo: null,
        sourceOrg: {
          id: null
        },
        postingDate: null,
        operator: {
          id: null
        },
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
        customerName: [{ required: true, message: '请输入客户名称', trigger: ['blur', 'change'] }],
        'sourceOrg.id': [{ required: true, message: '请选择供应商', trigger: ['blur', 'change'] }],
        postingDate: [{ required: true, message: '请选择采购日期', trigger: ['blur', 'change'] }],
        'operator.id': [{ required: true, message: '请选择操作员', trigger: ['blur', 'change'] }]
      }
    },
    vendors () {
      return this.$store.state.Business.vendors
    },
    operators () {
      return this.$store.state.Business.employees
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
