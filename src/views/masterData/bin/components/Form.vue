<template>
  <div class="form-container">
    <ElForm
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <ElFormItem
        label="库区代码"
        prop="warehouseAndZone"
      >
        <ElCascader
          v-model="form.warehouseAndZone"
          :disabled="disabled"
          :options="options"
          expand-trigger="hover"
          @change="handleChange"
        />
      </ElFormItem>
      <ElFormItem
        label="库位代码"
        prop="binCode"
      >
        <ElInput
          v-model="form.binCode"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="库位名称"
        prop="binName"
      >
        <ElInput
          v-model="form.binName"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="库位类型"
        prop="binType"
      >
        <ElSelect
          v-model="form.binType"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in inventoryBinType"
            :key="item.id"
            :label="item.label"
            :value="item.code"
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
import _ from 'lodash'

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
        warehouseAndZone: [],
        zone: {
          id: null
        },
        binCode: null,
        binName: null,
        binType: null,
        remark: null
      },
      warehouse: [],
      zone: []
    }
  },
  computed: {
    options () {
      const options = []
      this.warehouse.forEach(item => {
        const option = {
          value: item.id,
          label: item.warehouseCode
        }
        if (item.zone.length) {
          option.children = item.zone.map(item => {
            return {
              value: item.id,
              label: item.zoneCode
            }
          })
          options.push(option)
        }
      })
      return options
    },
    disabled () {
      return !this.editable
    },
    inventoryBinType () {
      return this.$getDictByKey('Inventory_BinType')
    },
    rules () {
      return {
        'zone.id': [{
          required: true,
          message: '请选择仓库和库区',
          trigger: ['blur', 'change']
        }],
        binCode: [{
          required: true,
          message: '请输入库位代码',
          trigger: ['blur']
        }],
        binName: [{
          required: true,
          message: '请输入库位名称',
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
    handleChange ([warehouseId, zoneId]) {
      this.form.zone.id = zoneId
    },
    getForm () {
      return this.form
    },
    setForm (form) {
      form.warehouseAndZone = [
        _.get(form, 'zone.warehouse.id'),
        _.get(form, 'zone.id')
      ]
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
