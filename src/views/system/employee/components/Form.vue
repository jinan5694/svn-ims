<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="员工编号"
        prop="employeeNo">
        <el-input
          v-model="form.employeeNo"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="员工姓名"
        prop="employeeName">
        <el-input
          v-model="form.employeeName"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="职务"
        prop="postPosition">
        <el-select
          v-model="form.postPosition"
          :disabled="disabled">
          <el-option
            v-for="item in systemPostPosition"
            :key="item.id"
            :label="item.label"
            :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="性别"
        prop="sex">
        <el-select
          v-model="form.sex"
          :disabled="disabled">
          <el-option
            v-for="item in systemSex"
            :key="item.id"
            :label="item.label"
            :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="入职日期"
        prop="entryDate">
        <el-date-picker
          v-model="form.entryDate"
          :disabled="disabled"
          type="date"
          placeholder="选择失效日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item
        label="出生日期"
        prop="dateOfBirth">
        <el-date-picker
          v-model="form.dateOfBirth"
          :disabled="disabled"
          type="date"
          placeholder="选择失效日期"
          value-format="yyyy-MM-dd"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        id: null,
        employeeNo: null,
        employeeName: null,
        postPosition: null,
        sex: null,
        entryDate: null,
        dateOfBirth: null
      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    systemPostPosition () {
      return this.$getDictByKey('System_PostPosition')
    },
    systemSex () {
      return this.$getDictByKey('System_Sex')
    },
    rules () {
      return {
        employeeNo: [{
          required: true,
          message: '请输入员工编号',
          trigger: ['blur']
        }],
        employeeName: [{
          required: true,
          message: '请输入员工姓名',
          trigger: ['blur']
        }]
      }
    }
  },
  methods: {
    getForm () {
      return this.form
    },
    setForm (form) {
      this.form = form
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  width: 400px;
}
</style>
