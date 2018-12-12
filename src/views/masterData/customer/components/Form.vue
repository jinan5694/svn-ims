<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="客户名称"
        prop="customerName"
      >
        <ElInput
          v-model="form.customerName"
          :disabled="disabled"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="客户电话"
        prop=""
      >
        <ElInput
          v-model="form.customerTel"
          :disabled="disabled"
          maxlength="30"
        />
      </ElFormItem>
      <ElFormItem
        label="客户类别"
        prop=""
      >
        <ElSelect
          v-model="form.customerCategory"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in customerCategorys"
            :key="item.value"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
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
          v-model="form.customerTelOther"
          :disabled="disabled"
          maxlength="30"
        />
      </ElFormItem>
      <ElFormItem
        label="账单地址"
        prop=""
      >
        <ElInput
          v-model="form.billingAddr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="收货地址"
        prop=""
      >
        <ElInput
          v-model="form.addr"
          :disabled="disabled"
          type="textarea"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="备注"
        prop=""
      >
        <ElInput
          v-model="form.remark"
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
    },
    customerCategorys () {
      return this.$getDictByKey('AfterSales_CustomerCate')
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
