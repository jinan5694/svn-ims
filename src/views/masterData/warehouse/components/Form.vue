<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="仓库代码"
        prop="warehouseCode">
        <el-input
          v-model="form.warehouseCode"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="仓库名称"
        prop="warehouseName">
        <el-input
          v-model="form.warehouseName"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="仓库属性"
        prop="warehouseCategory">
        <el-select
          v-model="form.warehouseCategory"
          :disabled="disabled">
          <el-option
            v-for="item in inventoryAttributes"
            :key="item.id"
            :label="item.label"
            :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="计价方式"
        prop="pricingMethod">
        <el-select
          v-model="form.pricingMethod"
          :disabled="disabled">
          <el-option
            v-for="item in inventoryPricingMethod"
            :key="item.id"
            :label="item.label"
            :value="item.code"/>
        </el-select>
      </el-form-item>
      <el-form-item
        v-show="form.id"
        label="默认库区"
        prop="defaultZoneId">
        <el-select
          v-model="form.defaultZoneId"
          :disabled="disabled"
          @change="handleDfaultZoneChange">
          <el-option
            v-for="item in zones"
            :key="item.id"
            :label="item.zoneCode"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="联系人"
        prop="contact">
        <el-input
          v-model="form.contact"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="电话"
        prop="tel">
        <el-input
          v-model="form.tel"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="地址"
        prop="addr">
        <el-input
          v-model="form.addr"
          :disabled="disabled"
          type="textarea"/>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark">
        <el-input
          v-model="form.remark"
          :disabled="disabled"
          type="textarea"/>
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
        warehouseCode: null,
        warehouseName: null,
        warehouseCategory: null,
        pricingMethod: null,
        contact: null,
        tel: null,
        addr: null,
        remark: null,
        // 默认库区
        defaultZoneId: null
      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    inventoryAttributes () {
      return this.$getDictByKey('Inventory_Attributes')
    },
    inventoryPricingMethod () {
      return this.$getDictByKey('Inventory_PricingMethod')
    },
    rules () {
      return {
        warehouseCode: [{
          required: true,
          message: '请输入仓库代码',
          trigger: ['blur']
        }],
        warehouseName: [{
          required: true,
          message: '请输入仓库名称',
          trigger: ['blur']
        }],
        contact: [{
          required: true,
          message: '请输入联系人',
          trigger: ['blur']
        }],
        tel: [{
          required: true,
          message: '请输入电话',
          trigger: ['blur']
        }]
      }
    },
    zones () {
      return this.form.zone
    }
  },
  methods: {
    getForm () {
      return this.form
    },
    getDefaultZoneId (form) {
      const defaultZone = form.zone.find(item => {
        return item.defaultZoneFlag === 'System_YesNo_1'
      })
      return defaultZone ? defaultZone.id : null
    },
    handleDfaultZoneChange (id) {
      this.setDefaultZoneFlag(id)
    },
    setDefaultZoneFlag (id) {
      this.form.zone.forEach(item => {
        if (item.id === id) {
          item.defaultZoneFlag = 'System_YesNo_1'
        } else {
          item.defaultZoneFlag = 'System_YesNo_0'
        }
      })
    },
    setForm (form) {
      form.defaultZoneId = this.getDefaultZoneId(form)
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
