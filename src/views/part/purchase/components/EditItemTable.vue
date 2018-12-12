<template>
  <ElForm
    ref="form"
    :model="form"
  >
    <BaseTable
      ref="table"
      :columns="columns"
      :data="form.items"
      :summary-method="getSummaries"
      show-summary
    >
      <template
        slot="unit"
        slot-scope="scope"
      >
        {{
          $translate({
            key: 'AfterSales_Unit',
            value: scope.row.unit
          })
        }}
      </template>
      <template
        slot="orderQty"
        slot-scope="scope"
      >
        <ElFormItem
          :prop="'items.' + scope.index + '.orderQty'"
          :rules="rules.orderQty"
          :show-message="false"
        >
          <InputNumber
            v-model="scope.row.orderQty"
            :min="0"
            :max="999999"
            @change="calcQty(scope.row)"
          />
        </ElFormItem>
      </template>
      <template
        slot="price"
        slot-scope="scope"
      >
        <ElFormItem
          :prop="'items.' + scope.index + '.price'"
          :rules="rules.price"
          :show-message="false"
        >
          <InputNumber
            v-model="scope.row.price"
            :min="0"
            :max="999999"
            type="amount"
            @change="calcQty(scope.row)"
          />
        </ElFormItem>
      </template>
      <template
        slot="giftQty"
        slot-scope="scope"
      >
        <ElFormItem
          :prop="'items.' + scope.index + '.giftQty'"
          :rules="rules.giftQty"
          :show-message="false"
        >
          <InputNumber
            v-model="scope.row.giftQty"
            :min="0"
            :max="999999"
            @change="calcQty(scope.row)"
          />
        </ElFormItem>
      </template>
      <template
        slot="OwningQty"
        slot-scope="scope"
      >
        {{
          scope.row.qty - scope.row.inQty
        }}
      </template>
      <template
        slot="operations"
        slot-scope="{row, index}"
      >
        <Button
          button-type="delete"
          @click="remove(index)"
        />
      </template>
    </BaseTable>
  </ElForm>
</template>

<script>
import FormMixin from '@/mixins/form'
import { formatNumber } from '@/common/utils.js'

export default {
  mixins: [ FormMixin ],
  data () {
    return {
      form: {
        items: []
      }
    }
  },
  computed: {
    columns () {
      let columns = [
        {
          label: '商品名称',
          prop: 'prodName'
        },
        {
          label: '商品编码',
          prop: 'prodCode'
        },
        {
          label: '单位',
          slotName: 'unit'
        },
        {
          label: '规格型号',
          prop: 'product.specmodel'
        },
        {
          label: '品牌',
          prop: 'product.brand'
        },
        {
          label: '订货数量',
          prop: 'orderQty',
          slotName: 'orderQty',
          'render-header': this.headerRequired
        },
        {
          label: '单价',
          slotName: 'price',
          'render-header': this.headerRequired
        },
        {
          label: '金额',
          prop: 'amount',
          formatter: row => formatNumber(row.amount, 'amount')
        },
        {
          label: '赠送数量',
          prop: 'giftQty',
          slotName: 'giftQty'
        },
        {
          label: '合计数量',
          prop: 'qty'
        },
        {
          label: '入库数量',
          prop: 'inQty'
        },
        {
          label: '欠货数量',
          prop: 'OwningQty',
          slotName: 'OwningQty'
        },
        {
          label: '操作',
          slotName: 'operations'
        }
      ]
      return columns
    },
    rules () {
      return {
        orderQty: [{ required: true, message: '请输入订货数量', trigger: ['blur', 'change'] }],
        price: [{ required: true, message: '请输入单价', trigger: ['blur', 'change'] }],
        giftQty: [{ required: true, message: '请输入赠送数量', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    setItems (data) {
      this.form.items = data
    },
    getItems () {
      return this.form.items
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            if (column.property === 'prodName' ||
              column.property === 'prodCode' ||
              column.property === 'unit' ||
              column.property === 'product.specmodel' ||
              column.property === 'product.brand' ||
              column.property === 'operations') {
              return ''
            }
            const value = Number(curr)
            if (!isNaN(value)) {
              if (column.property === 'amount') {
                let res = Number(prev) + Number(curr)
                return formatNumber(res, 'amount')
              } else {
                let res = Number(prev) + Number(curr)
                return formatNumber(res)
              }
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      sums[columns.length - 2] = sums[9] - sums[10]
      return sums
    },
    headerRequired: (h, { column, $index }) => {
      const required = h('span', { style: { color: 'red', paddingRight: '3px' } }, ['*'])
      return h('span', [required, column.label])
    },
    remove (index) {
      this.form.items.splice(index, 1)
    },
    calcQty (row) {
      let orderQty = row.orderQty
      let price = row.price
      let giftQty = row.giftQty
      if (!isNaN(orderQty) && !isNaN(price)) {
        row.amount = (orderQty * price).toFixed(2)
      } else {
        row.amount = 0
      }
      if (!isNaN(orderQty) && !isNaN(giftQty)) {
        row.qty = formatNumber(orderQty + giftQty)
      } else {
        row.qty = orderQty
      }
    },
    validate () {
      return this.validatePromise('form')
    }
  }
}
</script>

<style lang='scss' scoped>
.el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0;
  }
</style>
