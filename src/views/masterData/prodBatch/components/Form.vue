<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="产品"
        prop="product.id"
      >
        <ElSelect
          v-model="form.product.id"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in products"
            :key="item.id"
            :label="item.prodName"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="批次号"
        prop="batchCode"
      >
        <ElInput
          v-model="form.batchCode"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="批次描述"
        prop="batchDesc"
      >
        <ElInput
          v-model="form.batchDesc"
          :disabled="disabled"
          type="textarea"
        />
      </ElFormItem>
      <ElFormItem
        label="批次状态"
        prop="batchStatus"
      >
        <ElInput
          v-model="form.batchStatus"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="最后采购时间"
        prop="lastPurchaseTime"
      >
        <ElDatePicker
          v-model="form.lastPurchaseTime"
          :disabled="disabled"
          type="datetime"
          placeholder="选择最后采购时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </ElFormItem>
      <ElFormItem
        label="生产日期"
        prop="productionDate"
      >
        <ElDatePicker
          v-model="form.productionDate"
          :disabled="disabled"
          type="date"
          placeholder="选择生产日期"
          value-format="yyyy-MM-dd"
        />
      </ElFormItem>
      <ElFormItem
        label="失效日期"
        prop="expirationDate"
      >
        <ElDatePicker
          v-model="form.expirationDate"
          :disabled="disabled"
          type="date"
          placeholder="选择失效日期"
          value-format="yyyy-MM-dd"
        />
      </ElFormItem>
      <ElFormItem
        label="供应商"
        prop="vendor"
      >
        <ElSelect
          v-model="form.vendor"
          :disabled="disabled"
          placeholder="选择供应商"
        >
          <ElOption
            v-for="item in vendors"
            :key="item.id"
            :label="item.vendorName"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="备注"
        prop="remark"
      >
        <ElInput
          v-model="form.remark"
          :disabled="disabled"
          type="textarea"
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
        product: {
          id: null
        },
        batchCode: null,
        batchDesc: null,
        batchStatus: null,
        lastPurchaseTime: null,
        productionDate: null,
        expirationDate: null,
        vendor: null,
        remark: null
      },
      products: []
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    rules () {
      return {
        'product.id': [{
          required: true,
          message: '请选择产品',
          trigger: ['blur', 'change']
        }],
        batchCode: [{
          required: true,
          message: '请输入批次号',
          trigger: ['blur']
        }],
        batchDesc: [{
          required: true,
          message: '请输入批次描述',
          trigger: ['blur']
        }]
      }
    },
    vendors () {
      return this.$store.state.Business.vendors
    }
  },
  created () {
    this.fetchProduct()
  },
  methods: {
    fetchProduct () {
      const url = '/ProductService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      this.$axios.get(url, { params: params }).then(resp => {
        this.products = resp.data
      }).catch(error => {
        this.$message({ type: 'error', message: error })
      })
    },
    getForm () {
      return this.form
    },
    setForm (form) {
      if (!form.product) {
        form.product = { id: null }
      }
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
