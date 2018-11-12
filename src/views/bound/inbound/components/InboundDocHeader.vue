<template>
  <GridForm
    ref="form"
    :items="items"
    :model="form"
    :rules="rules"
    :disabled="disabled">
    <el-input
      slot="orderNo"
      v-model="form.orderNo"
      disabled/>
    <el-select
      slot="purchaseOrder"
      v-model="form.purchaseOrder.id"
      @change="handlePurchaseChange">
      <el-option
        v-for="item in orders"
        :key="item.id"
        :label="item.orderNo"
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
      disabled
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
    <div slot="docStatus">
      {{
        $translate({
          key: 'AfterSales_DOCStatus_InStorageDOCStatus',
          value: form.docStatus
        })
      }}
    </div>
  </GridForm>
</template>
<script>
import moment from 'moment'

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
      },
      orders: []
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    items () {
      const items = [
        {
          label: '入库单号',
          prop: 'orderNo'
        },
        {
          label: '采购单',
          prop: 'purchaseOrder.id',
          slotName: 'purchaseOrder'
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
      if (this.$route.params.id) {
        items.push({
          label: '状态',
          slotName: 'docStatus'
        })
      }
      return items
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
  created () {
    this.queryPurchaseOrders()
    this.setPostingDate()
  },
  methods: {
    handlePurchaseChange (id) {
      const order = this.orders.find(item => item.id === id)
      this.form.purchaseOrder.id = order.id
      this.form.sourceOrg = order.sourceOrg
      this.$emit('order-change', order)
    },
    queryPurchaseOrders () {
      const url = '/PurchaseOrderService/query'
      const params = {
        where: { or: [] }
      }
      if (this.editable) {
        params.where.or.push({ orderStatus: 'AfterSales_OrderStatus_POStatus_POS001' }) // 新建
        params.where.or.push({ orderStatus: 'AfterSales_OrderStatus_POStatus_POS002' }) // 部分入库
      }
      this.$axios.get(url, { params: [params] }).then(resp => {
        this.orders = resp.data
      })
    },
    getForm () {
      return this.form
    },
    setForm (form) {
      this.form = form
    },
    setPostingDate () {
      if (this.editable && !this.id) {
        // is add page
        this.form.postingDate = moment().format('YYYY-MM-DD')
      }
    },
    validate () {
      return this.$refs.form.validate()
    }
  }
}
</script>
