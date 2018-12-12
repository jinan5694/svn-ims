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
        prop="warehouseCode"
      >
        <ElInput
          v-model="form.warehouseCode"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="仓库名称"
        prop="warehouseName"
      >
        <ElInput
          v-model="form.warehouseName"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="仓库属性"
        prop="warehouseCategory"
      >
        <ElSelect
          v-model="form.warehouseCategory"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in inventoryAttributes"
            :key="item.id"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="计价方式"
        prop="pricingMethod"
      >
        <ElSelect
          v-model="form.pricingMethod"
          :disabled="disabled"
        >
          <ElOption
            v-for="item in inventoryPricingMethod"
            :key="item.id"
            :label="item.label"
            :value="item.code"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        v-show="form.id"
        label="默认库区"
        prop="defaultZoneId"
      >
        <ElSelect
          v-model="form.defaultZoneId"
          :disabled="disabled"
          @change="handleDfaultZoneChange"
        >
          <ElOption
            v-for="item in zones"
            :key="item.id"
            :label="item.zoneCode"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem
        label="联系人"
        prop="contact"
      >
        <ElInput
          v-model="form.contact"
          :disabled="disabled"
        />
      </ElFormItem>
      <ElFormItem
        label="电话"
        prop="tel"
      >
        <ElInput
          v-model="form.tel"
          :disabled="disabled"
        />
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
        warehouseCode: null,
        warehouseName: null,
        warehouseCategory: null,
        pricingMethod: null,
        contact: null,
        tel: null,
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
