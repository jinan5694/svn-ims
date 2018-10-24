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
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="商品编码"
        prop="">
        <el-input
          v-model="form.prodCode"
          :disabled="viewFlag"
          maxlength="32"/>
      </el-form-item>
      <el-form-item
        label="计量单位"
        prop="">
        <el-input
          v-model="form.unit"
          :disabled="viewFlag"
          maxlength="50"/>
      </el-form-item>
      <el-form-item
        label="规格型号"
        prop="">
        <el-input
          v-model="form.specmodel"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="品牌"
        prop="">
        <el-input
          v-model="form.brand"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="保质期天数"
        prop="">
        <el-input
          v-model="form.qualityGuaranteePeriod"
          :disabled="viewFlag"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="商品类型"
        prop="">
        <el-input
          v-model="form.prodType"
          :disabled="viewFlag"/>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="">
        <el-input
          v-model="form.remark"
          :disabled="viewFlag"
          maxlength="255"/>
      </el-form-item>
      <el-form-item
        label="采购价"
        prop="">
        <el-input
          v-model="form.purchasePrice"
          :disabled="viewFlag"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="销售价"
        prop="">
        <el-input
          v-model="form.sellingPrice"
          :disabled="viewFlag"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="高储"
        prop="">
        <el-input
          v-model="form.stockTopLimit"
          :disabled="viewFlag"
          maxlength="12"/>
      </el-form-item>
      <el-form-item
        label="低储"
        prop="">
        <el-input
          v-model="form.stockLowerLimit"
          :disabled="viewFlag"
          maxlength="12"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'ProductForm',
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
        prodName: null,
        prodCode: null,
        unit: null,
        specmodel: null,
        brand: null,
        qualityGuaranteePeriod: null,
        prodType: null,
        remark: null,
        purchasePrice: null,
        sellingPrice: null,
        warehouseToplimit: null,
        warehouseLowerlimit: null

      },
      rules: {
        prodName: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }]
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
