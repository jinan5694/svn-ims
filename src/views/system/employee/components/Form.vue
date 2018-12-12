<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="员工编号"
        prop="employeeNo"
      >
        <ElInput
          v-model="form.employeeNo"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="员工姓名"
        prop="employeeName"
      >
        <ElInput
          v-model="form.employeeName"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="职务"
        prop="postPosition"
      >
        <ElSelect
          v-model="form.postPosition"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in systemPostPosition"
            :key="item.id"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="性别"
        prop="sex"
      >
        <ElSelect
          v-model="form.sex"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in systemSex"
            :key="item.id"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="入职日期"
        prop="entryDate"
      >
        <ElDatePicker
          v-model="form.entryDate"
          :disabled="disabled"
          type="date"
          placeholder="选择失效日期"
          value-format="yyyy-MM-dd"
        />
      </ElFormItem>
      <ElFormItem
        label="出生日期"
        prop="dateOfBirth"
      >
        <ElDatePicker
          v-model="form.dateOfBirth"
          :disabled="disabled"
          type="date"
          placeholder="选择失效日期"
          value-format="yyyy-MM-dd"
        />
      </ElFormItem>
    </ElForm>
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
