<template>
  <el-form
    ref="form"
    :model="form"
    :show-message="false">
    <BaseTable
      :columns="columns"
      :data="form.items"
      class="table-validate">
      <!-- slot -->
      <template
        slot="batch"
        slot-scope="{row, index}">
        <el-form-item
          v-if="editable"
          :prop="`items.${index}.prodBatch.batchCode`"
          :rules="rules.batch">
          <el-input v-model="row.prodBatch.batchCode"/>
        </el-form-item>
        <template v-else>{{ $_.get(row, 'prodBatch.batchCode') }}</template>
      </template>
      <template
        slot="warehouse"
        slot-scope="{row, index}">
        <el-form-item
          v-if="editable"
          :prop="`items.${index}.destLoc.id`"
          :rules="rules.warehouse">
          <WarehouseCascader v-model="row.warehouse"/>
        </el-form-item>
        <template v-else>{{ getWarehouse(row) }}</template>
      </template>
      <template
        slot="qty"
        slot-scope="{row, index}">
        <el-form-item
          v-if="editable"
          :prop="`items.${index}.movementQty`"
          :rules="rules.qty">
          <InputNumber
            v-model="row.movementQty"
            :min="0"
            :max="row.movementQty"/>
        </el-form-item>
        <Number
          v-else
          :value="row.movementQty"/>
      </template>
      <template
        slot="price"
        slot-scope="{row, index}">
        <!-- 价格更新暂时不支持，所以注销 -->
        <Number
          :value="row.price"
          amount/>
      </template>
      <template
        slot="operator"
        slot-scope="{row, index}">
        <el-button
          type="text"
          @click="handleRemove(index)">删除</el-button>
        <el-button
          type="text"
          @click="handleCopy(index)">复制</el-button>
      </template>
    </BaseTable>
  </el-form>
</template>

<script>
import FormMixin from '@/mixins/form'
import { toNumber } from '@/common/utils'

import WarehouseCascader from '@/components/WarehouseCascader'

export default {
  components: {
    WarehouseCascader
  },
  mixins: [ FormMixin ],
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: {
        items: []
      }
    }
  },
  computed: {
    columns () {
      const columns = [
        {
          label: '商品名称',
          prop: 'product.prodName'
        },
        {
          label: '商品编码',
          prop: 'product.prodCode'
        },
        {
          label: '单位',
          prop: 'product.unit',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_Unit',
              value: this.$_.get(row, 'product.unit')
            })
          }
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
          prop: 'prodBatch.batchCode'
        },
        {
          label: '仓库',
          prop: 'sourceLoc.warehouseName'
        },
        {
          label: '仓库',
          prop: 'sourceZone.zoneName'
        },
        {
          label: '仓库',
          prop: 'sourceBin.binName'
        },
        {
          label: '出库数量',
          prop: 'movementQty'
        },
        {
          label: '成本单价',
          prop: 'costPrice'
        },
        {
          label: '金额',
          prop: 'amount'
        }
      ]
      if (this.editable) {
        columns.push({
          label: '操作',
          slotName: 'operator'
        })
      }
      return columns
    },
    // rules
    rules () {
      return {
        batch: [{ required: true, message: '请输入批次', trigger: ['blur'] }],
        warehouse: [{ required: true, message: '请选择仓库', trigger: ['blur', 'change'] }],
        qty: [{ required: true, message: '请输入数量', trigger: ['blur'] }],
        price: [{ required: true, message: '请输入金额', trigger: ['blur'] }]
      }
    }
  },
  watch: {
    'form.items': {
      handler (items) {
        items.forEach(item => {
          // 金额 = 入库数量 * 单价
          item.amount = toNumber(item.movementQty) * toNumber(item.costPrice)
        })
      },
      deep: true
    }
  },
  methods: {
    getItems () {
      return this.form.items
    },
    handleCopy (index) {
      const item = this.$_.cloneDeep(this.form.items[index])
      this.form.items.push(item)
    },
    handleRemove (index) {
      this.form.items.splice(index, 1)
    },
    setItems (items) {
      this.$set(this.form, 'items', items.map(item => {
        return item
      }))
    },
    validate () {
      return this.validatePromise('form')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
