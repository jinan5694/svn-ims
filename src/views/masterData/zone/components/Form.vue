<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="仓库代码"
        prop="warehouse.id"
      >
        <ElSelect
          v-model="form.warehouse.id"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in warehouse"
            :key="item.id"
            :label="item.warehouseCode"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="库区代码"
        prop="zoneCode"
      >
        <ElInput
          v-model="form.zoneCode"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="库区名称"
        prop="zoneName"
      >
        <ElInput
          v-model="form.zoneName"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="库区类型"
        prop="zoneType"
      >
        <ElSelect
          v-model="form.zoneType"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in inventoryZoneType"
            :key="item.id"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        v-show="form.id"
        label="默认库位"
        prop="defaultBinId"
      >
        <ElSelect
          v-model="form.defaultBinId"
          :disabled="disabled"
          @change="handleDefaultBinChange"
        >
          <ElOption
            v-for="item in bins"
            :key="item.id"
            :label="item.binCode"
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
          maxlength="20"
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
        warehouse: {
          id: null
        },
        zoneCode: null,
        zoneName: null,
        zoneType: null,
        defaultBinId: null,
        remark: null
      },
      warehouse: []
    }
  },
  computed: {
    bins () {
      return this.form.bin
    },
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
    getDefaultBinId (form) {
      const defaultBin = form.bin.find(item => {
        return item.defaultBinFlag === 'System_YesNo_1'
      })
      return defaultBin ? defaultBin.id : null
    },
    handleDefaultBinChange (id) {
      this.setDefaultBinFlag(id)
    },
    setDefaultBinFlag (id) {
      this.form.bin.forEach(item => {
        if (item.id === id) {
          item.defaultBinFlag = 'System_YesNo_1'
        } else {
          item.defaultBinFlag = 'System_YesNo_0'
        }
      })
    },
    setForm (form) {
      form.defaultBinId = this.getDefaultBinId(form)
      this.form = form
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
