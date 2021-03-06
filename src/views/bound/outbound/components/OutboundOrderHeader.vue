<template>
  <GridForm
    ref="form"
    :items="items"
    :model="form"
    :rules="rules"
    :disabled="disabled"
  >
    <ElInput
      slot="docCode"
      v-model="form.docCode"
    />
    <ElSelect
      slot="saleOrder"
      v-model="form.saleOrder.id"
      @change="handleSaleOrderChange"
    >
      <ElOption
        v-for="item in orders"
        :key="item.id"
        :label="item.orderNo"
        :value="item.id"
      />
    </ElSelect>
    <ElSelect
      slot="destOrg"
      v-model="form.destOrg.id"
    >
      <ElOption
        v-for="item in customers"
        :key="item.id"
        :label="item.customerName"
        :value="item.id"
      />
    </ElSelect>
    <ElDatePicker
      slot="postingDate"
      v-model="form.postingDate"
      disabled
      value-format="yyyy-MM-dd"
    />
    <ElSelect
      slot="operator"
      v-model="form.operator"
    >
      <ElOption
        v-for="item in employees"
        :key="item.id"
        :label="item.employeeName"
        :value="item.id"
      />
    </ElSelect>
    <ElInput
      slot="remark"
      v-model="form.remark"
    />
    <div slot="orderStatus">
      {{
        $translate({
          key: 'AfterSales_OrderStatus_SOStatus',
          value: $_.get(form, 'saleOrder.orderStatus')
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
        orderId: null, // 出库单号
        saleOrder: {
          id: null,
          orderNo: null // 销售单号
        },
        destOrg: {
          id: null // 客户 （id）
        },
        postingDate: null, // 出库日期
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
          label: '出库单号',
          prop: 'docCode'
        },
        {
          label: '销售单',
          prop: 'saleOrder.id',
          slotName: 'saleOrder'
        },
        {
          label: '客户名称',
          prop: 'destOrg.id',
          slotName: 'destOrg'
        },
        {
          label: '出库日期',
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
          slotName: 'orderStatus'
        })
      }
      return items
    },
    rules () {
      return {

        'docCode': [{
          required: true,
          message: '请输入出库单号',
          trigger: ['blur']
        }],
        'saleOrder.id': [{
          required: true,
          message: '请选择销售单',
          trigger: ['blur', 'change']
        }],
        'destOrg.id': [{
          required: true,
          message: '请选择客户',
          trigger: ['blur', 'change']
        }],
        'postingDate': [{
          message: '请选择入库日期',
          trigger: ['blur', 'change']
        }],
        'operator': [{
          required: true,
          message: '请选择操作员',
          trigger: ['blur', 'change']
        }]
      }
    },
    employees () {
      return this.$store.state.Business.employees
    },
    customers () {
      return this.$store.state.Business.customers
    }
  },
  created () {
    this.querySaleOrders()
    this.setPostingDate()
  },
  methods: {
    handleSaleOrderChange (id) {
      const order = this.orders.find(item => item.id === id)
      this.form.saleOrder.id = order.id
      this.$emit('sale-order-change', order)
    },
    querySaleOrders () {
      const url = '/SaleOrderService/query'
      const params = {
        where: {
          or: [
            { orderStatus: 'AfterSales_OrderStatus_SOStatus_SOS001' }, // 新建
            { orderStatus: 'AfterSales_OrderStatus_SOStatus_SOS002' } // 部分出库
          ]
        }
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
