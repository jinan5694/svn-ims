<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="商品名称"
        prop="prodName">
        <el-input
          v-model="form.prodName"
          :disabled="disabled"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="商品编码"
        prop="">
        <el-input
          v-model="form.prodCode"
          :disabled="disabled"
          maxlength="32"/>
      </el-form-item>
      <el-form-item
        label="计量单位"
        prop="">
        <Unit
          v-model="form.unit"
          :disabled="disabled"
          class="unit"
          maxlength="50"/>
      </el-form-item>
      <el-form-item
        label="规格型号"
        prop="">
        <el-input
          v-model="form.specmodel"
          :disabled="disabled"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="品牌"
        prop="">
        <el-input
          v-model="form.brand"
          :disabled="disabled"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="保质期天数"
        prop="">
        <el-input
          v-model="form.qualityGuaranteePeriod"
          :disabled="disabled"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="商品类型"
        prop="">
        <el-select
          v-model="form.prodCategory"
          :disabled="disabled">
          <el-option
            v-for="item in prodCategorys"
            :key="item.value"
            :label="item.label"
            :value="item.code"
          />
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
      <el-form-item
        label="采购价"
        prop="">
        <el-input
          v-model="form.purchasePrice"
          :disabled="disabled"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="销售价"
        prop="">
        <el-input
          v-model="form.sellingPrice"
          :disabled="disabled"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="高储"
        prop="">
        <el-input
          v-model="form.stockTopLimit"
          :disabled="disabled"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="低储"
        prop="">
        <el-input
          v-model="form.stockLowerLimit"
          :disabled="disabled"
          maxlength="12"/>
      </el-form-item>
    </el-form>
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
