<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="供应商名称"
        prop="vendorName"
      >
        <ElInput
          v-model="form.vendorName"
          :disabled="disabled"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="联系人"
        prop=""
      >
        <ElInput
          v-model="form.contact"
          :disabled="disabled"
          maxlength="32"
        />
      </ElFormItem>
      <ElFormItem
        label="联系电话"
        prop=""
      >
        <ElInput
          v-model="form.vendorTel"
          :disabled="disabled"
          maxlength="30"
        />
      </ElFormItem>
      <ElFormItem
        label="银行账号"
        prop=""
      >
        <ElInput
          v-model="form.bankAccount"
          :disabled="disabled"
          maxlength="100"
        />
      </ElFormItem>
      <ElFormItem
        label="开户行"
        prop=""
      >
        <ElInput
          v-model="form.openingBank"
          :disabled="disabled"
          maxlength="100"
        />
      </ElFormItem>
      <ElFormItem
        label="税号"
        prop=""
      >
        <ElInput
          v-model="form.taxNo"
          :disabled="disabled"
          maxlength="30"
        />
      </ElFormItem>
      <ElFormItem
        label="地址"
        prop=""
      >
        <ElInput
          v-model="form.addr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"
        />
      </ElFormItem>
    </ElForm>
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
