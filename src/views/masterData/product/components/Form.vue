<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="商品名称"
        prop="prodName"
      >
        <ElInput
          v-model="form.prodName"
          :disabled="disabled"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="商品编码"
        prop=""
      >
        <ElInput
          v-model="form.prodCode"
          :disabled="disabled"
          maxlength="32"
        />
      </ElFormItem>
      <ElFormItem
        label="计量单位"
        prop=""
      >
        <Unit
          v-model="form.unit"
          :disabled="disabled"
          class="unit"
          maxlength="50"
        />
      </ElFormItem>
      <ElFormItem
        label="规格型号"
        prop=""
      >
        <ElInput
          v-model="form.specmodel"
          :disabled="disabled"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="品牌"
        prop=""
      >
        <ElInput
          v-model="form.brand"
          :disabled="disabled"
          maxlength="255"
        />
      </ElFormItem>
      <ElFormItem
        label="保质期天数"
        prop=""
      >
        <InputNumber
          v-model="form.qualityGuaranteePeriod"
          :disabled="disabled"
          :max="999999"
          :min="0"
        />
      </ElFormItem>
      <ElFormItem
        label="商品类型"
        prop=""
      >
        <ElSelect
          v-model="form.prodCategory"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in prodCategorys"
            :key="item.value"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
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
      <ElFormItem
        label="采购价"
        prop=""
      >
        <InputNumber
          v-model="form.purchasePrice"
          :disabled="disabled"
          :precision="2"
          :max="999999"
          :min="0"
        />
      </ElFormItem>
      <ElFormItem
        label="销售价"
        prop=""
      >
        <InputNumber
          v-model="form.sellingPrice"
          :disabled="disabled"
          :precision="2"
          :max="999999"
          :min="0"
        />
      </ElFormItem>
      <ElFormItem
        label="高储"
        prop=""
      >
        <InputNumber
          v-model="form.stockTopLimit"
          :disabled="disabled"
          :precision="2"
          :max="999999"
          :min="0"
        />
      </ElFormItem>
      <ElFormItem
        label="低储"
        prop=""
      >
        <InputNumber
          v-model="form.stockLowerLimit"
          :disabled="disabled"
          :precision="2"
          :max="999999"
          :min="0"
        />
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script>

export default {
  name: 'ProductForm',
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        prodName: null,
        prodCode: null,
        unit: null,
        specmodel: null,
        brand: null,
        qualityGuaranteePeriod: null,
        prodCategory: null,
        remark: null,
        purchasePrice: null,
        sellingPrice: null,
        warehouseToplimit: null,
        warehouseLowerlimit: null

      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    rules () {
      return {
        prodName: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }]
      }
    },
    prodCategorys () {
      return this.$getDictByKey('AfterSales_ProdSubCate')
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
.unit {
  width: 300px;
}
</style>
