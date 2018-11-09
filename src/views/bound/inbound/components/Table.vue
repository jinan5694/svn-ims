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
        slot="dest"
        slot-scope="{row, index}">
        <el-form-item
          v-if="editable"
          :prop="`items.${index}.dest`"
          :rules="rules.dest">
          <LocationCascader v-model="row.dest"/>
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
            :min="0"/>
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

import LocationCascader from '@/views/components/LocationCascader'

export default {
  components: {
    LocationCascader
  },
  mixins: [ FormMixin ],
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  computed: {
    form () {
      const itemTemplate = {
        product: {},
        prodBatch: { // 批次
          batchCode: null
        },
        dest: null, // 仓库选择器
        destLoc: { // 仓库
          id: null
        },
        destZone: { // 库区
          id: null
        },
        destBin: { // 库位
          id: null
        },
        movementQty: 0, // 入库数量
        price: 0, // 商品中带出的，可以修改
        amount: 0 // 根据数量和金额计算
      }
      const items = this.items.map(item => {
        return { ...this.$_.cloneDeep(itemTemplate), ...item }
      })
      return {
        items: items
      }
    },
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
          prop: 'prodBatch.batchCode',
          slotName: 'batch'
        },
        {
          label: '仓库',
          prop: 'dest',
          slotName: 'dest',
          width: 200
        },
        {
          label: '入库数量',
          prop: 'movementQty',
          slotName: 'qty'
        },
        {
          label: '单价',
          prop: 'price',
          slotName: 'price'
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
    defaultItem () {
      return {
        product: {},
        prodBatch: { // 批次
          batchCode: null
        },
        warehouse: {
          warehouse: null,
          zone: null,
          bin: null
        }, // inner
        destLoc: { // 仓库
          id: null
        },
        destZone: { // 库区
          id: null
        },
        destBin: { // 库位
          id: null
        },
        movementQty: 0, // 入库数量
        price: 0, // 商品中带出的，可以修改
        amount: 0 // 根据数量和金额计算
      }
    },
    // rules
    rules () {
      return {
        batch: [{ required: true, message: '请输入批次', trigger: ['blur', 'change'] }],
        dest: [{ required: true, message: '请选择仓库', trigger: ['blur', 'change'] }],
        qty: [{ required: true, message: '请输入数量', trigger: ['blur', 'change'] }],
        price: [{ required: true, message: '请输入金额', trigger: ['blur', 'change'] }]
      }
    }
  },
  watch: {
    'form.items': {
      handler (items) {
        items.forEach(item => {
          if (item.dest) {
            const ids = item.dest.split(',')
            item.destLoc.id = ids[0]
            item.destZone.id = ids[1]
            item.destBin.id = ids[2]
          } else {
            item.destLoc.id = null
            item.destZone.id = null
            item.destBin.id = null
          }
          item.amount = toNumber(item.movementQty) * toNumber(item.price)
        })
      },
      deep: true
    }
  },
  methods: {
    getItems () {
      return this.form.items
    },
    getWarehouse (row) {
      return `${row.destLoc.warehouseName}/${row.destZone.zoneName}/${row.destBin.binName}`
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
        item.warehouse = {
          warehouse: item.destLoc.id,
          zone: item.destZone.id,
          bin: item.destBin.id
        }
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
