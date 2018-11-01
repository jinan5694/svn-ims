<template>
  <GridForm
    ref="form"
    :items="items"
    :model="form"
    :rules="rules">
    <el-input
      slot="orderNo"
      v-model="form.orderNo"
      disabled/>
    <el-select
      slot="purchaseOrder.id"
      v-model="form.purchaseOrder.id">
      <el-option
        v-for="item in vendors"
        :key="item.id"
        :label="item.vendorName"
        :value="item.id"/>
    </el-select>
    <el-select
      slot="sourceOrg"
      v-model="form.sourceOrg">
      <el-option
        v-for="item in vendors"
        :key="item.id"
        :label="item.vendorName"
        :value="item.id"/>
    </el-select>
    <el-date-picker
      slot="postingDate"
      v-model="form.postingDate"
      value-format="yyyy-MM-dd"/>
    <el-select
      slot="operator"
      v-model="form.operator">
      <el-option
        v-for="item in employees"
        :key="item.id"
        :label="item.employeeName"
        :value="item.id"/>
    </el-select>
    <el-input
      slot="remark"
      v-model="form.remark"/>
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
        orderNo: null, // 入库单号
        purchaseOrder: {
          id: null,
          orderNo: null // 采购单号
        },
        sourceOrg: null, // 供应商 （id）
        postingDate: null, // 入库日期
        operator: null, // 操作员 （id）
        remark: null
      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    items () {
      return [
        {
          label: '入库单号',
          prop: 'orderNo'
        },
        {
          label: '采购单',
          prop: 'purchaseOrder.id'
        },
        {
          label: '供应商',
          prop: 'sourceOrg'
        },
        {
          label: '入库日期',
          prop: 'postingDate'
        },
        {
          label: '操作员',
          prop: 'operator'
        },
        {
          label: '备注',
          prop: 'remark',
          span: 2
        }
      ]
    },
    rules () {
      return {
        'purchaseOrder.id': [{
          required: true,
          message: '请选择采购单',
          trigger: ['blur', 'change']
        }],
        sourceOrg: [{
          required: true,
          message: '请选择供应商',
          trigger: ['blur', 'change']
        }],
        postingDate: [{
          required: true,
          message: '请选择入库日期',
          trigger: ['blur', 'change']
        }],
        operator: [{
          required: true,
          message: '请选择操作员',
          trigger: ['blur', 'change']
        }]
      }
    },
    employees () {
      return this.$store.state.Business.employees
    },
    vendors () {
      return this.$store.state.Business.vendors
    }
  },
  methods: {
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
