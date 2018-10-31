<template>
  <GridForm
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px">
    <!-- slots -->
  </GridForm>
</template>
<script>
export default {
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
