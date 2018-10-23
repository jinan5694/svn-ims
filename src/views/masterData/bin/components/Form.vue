<template>
  <div class="form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="仓库代码"
        prop="">
        <el-input v-model="form.warehouseId"/>
      </el-form-item>
      <el-form-item
        label="库区代码"
        prop="">
        <el-input v-model="form.zoneId"/>
      </el-form-item>
      <el-form-item
        label="库位代码"
        prop="">
        <el-input v-model="form.binCode"/>
      </el-form-item>
      <el-form-item
        label="库位类型"
        prop="">
        <el-input v-model="form.binType"/>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="">
        <el-input v-model="form.remark"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  data () {
    return {
      form: {
        warehouseId: null,
        zoneId: null,
        binCode: null,
        binType: null,
        remark: null

      },
      rules: {
        // warehouseName: [{ required: true, message: '请输入仓库名称', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
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
