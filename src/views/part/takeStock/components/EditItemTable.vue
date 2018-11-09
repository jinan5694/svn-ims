<template>
  <el-form
    ref="form"
    :model="form"
  >
    <BaseTable
      ref="table"
      :columns="columns"
      :data="form.items"
      :summary-method="getSummaries"
      show-summary>
      <template
        slot="qtyStocktaking"
        slot-scope="scope">
        <el-form-item
          :prop="'items.' + scope.index + '.qtyStocktaking'"
          :rules="rules.qtyStocktaking"
          :show-message="false">
          <InputNumber
            v-model="scope.row.qtyStocktaking"
            :min="0"
            :max="999999"/>
        </el-form-item>
      </template>
      <template
        slot="invStocktaking"
        slot-scope="scope">
        <el-form-item
          :prop="'items.' + scope.index + '.invStocktaking'"
          :rules="rules.invStocktaking"
          :show-message="false">
          <InputNumber
            v-model="scope.row.invStocktaking"
            :min="0"
            :max="999999"
            type="amount"/>
        </el-form-item>
      </template>
      <template
        slot="unit"
        slot-scope="scope">
        {{
          $translate({
            key: 'AfterSales_Unit',
            value: scope.row.unit
          })
        }}
      </template>
    </BaseTable>
  </el-form>
</template>

<script>
import FormMixin from '@/mixins/form'

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
          label: '批次',
          prop: 'prodbatch.batchCode'
        },
        {
          label: '仓库',
          prop: 'warehouse.warehouseName'
        },
        {
          label: '库区',
          prop: 'zone.zoneName'
        },
        {
          label: '库位',
          prop: 'bin.binName'
        },
        {
          label: '账面数量',
          prop: 'qty'
        },
        {
          label: '库存金额',
          prop: 'invValue'
        },
        {
          label: '实盘数量',
          prop: 'qtyStocktaking',
          slotName: 'qtyStocktaking'
        },
        {
          label: '实盘金额',
          prop: 'invStocktaking',
          slotName: 'invStocktaking'
        }
      ]
      return columns
    },
    rules () {
      return {
        qtyStocktaking: [{ required: true, message: '请输入实盘数量', trigger: ['blur', 'change'] }],
        invStocktaking: [{ required: true, message: '请输入实盘金额', trigger: ['blur', 'change'] }]
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
              column.property === 'prodbatch.id' ||
              column.property === 'warehouse.id' ||
              column.property === 'zone.id' ||
              column.property === 'bin.id'
            ) {
              return ''
            }
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    headerRequired: (h, { column, $index }) => {
      const required = h('span', { style: { color: 'red', paddingRight: '3px' } }, ['*'])
      return h('span', [required, column.label])
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
