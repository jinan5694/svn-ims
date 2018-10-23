<template>
  <div class="form">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="仓库代码"
        prop="warehouseId">
        <el-input v-model="form.warehouseId"/>
      </el-form-item>
      <el-form-item
        label="库区代码"
        prop="">
        <el-input v-model="form.zoneCode"/>
      </el-form-item>
      <el-form-item
        label="库区名称"
        prop="zoneName">
        <el-input v-model="form.zoneName"/>
      </el-form-item>
      <el-form-item
        label="库区类型"
        prop="">
        <el-input v-model="form.zoneType"/>
      </el-form-item>
      <el-form-item
        label="默认库位"
        prop="">
        在哪
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
        zoneCode: null,
        zoneName: null,
        zoneType: null,
        tel: null,
        remark: null

      },
      rules: {
        zoneName: [{ required: true, message: '请输入库区名称', trigger: ['blur', 'change'] }]
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
