<template>
  <div class="form-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px">
      <el-form-item
        label="仓库代码"
        prop="warehouse.id">
        <el-select
          v-model="form.warehouse.id"
          :disabled="disabled">
          <el-option
            v-for="item in warehouse"
            :key="item.id"
            :label="item.warehouseCode"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="库区代码"
        prop="zoneCode">
        <el-input
          v-model="form.zoneCode"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="库区名称"
        prop="zoneName">
        <el-input
          v-model="form.zoneName"
          :disabled="disabled"/>
      </el-form-item>
      <el-form-item
        label="库区类型"
        prop="zoneType">
        <el-select
          v-model="form.zoneType"
          :disabled="disabled">
          <el-option
            v-for="item in inventoryZoneType"
            :key="item.id"
            :label="item.label"
            :value="item.code"/>
        </el-select>
      </el-form-item>
      <!-- <el-form-item
        label="默认库位"
        prop="defaultBin">
        defaultBin
      </el-form-item> -->
      <el-form-item
        label="备注"
        prop="remark">
        <el-input
          v-model="form.remark"
          :disabled="disabled"
          type="textarea"
          maxlength="20"/>
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
        warehouse: {
          id: null
        },
        zoneCode: null,
        zoneName: null,
        zoneType: null,
        // defaultBin: null,
        remark: null
      },
      warehouse: []
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    inventoryZoneType () {
      return this.$getDictByKey('Inventory_ZoneType')
    },
    rules () {
      return {
        'warehouse.id': [{
          required: true,
          message: '请选择仓库代码',
          trigger: ['blur', 'change']
        }],
        zoneCode: [{
          required: true,
          message: '请输入库区代码',
          trigger: ['blur']
        }],
        zoneName: [{
          required: true,
          message: '请输入库区名称',
          trigger: ['blur']
        }]
      }
    }
  },
  created () {
    this.fetchWarehouse()
  },
  methods: {
    fetchWarehouse () {
      const url = '/WarehouseService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      this.$axios.get(url, { params: params }).then(resp => {
        this.warehouse = resp.data
      }).catch(error => {
        this.$message({ type: 'error', message: error })
      })
    },
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
