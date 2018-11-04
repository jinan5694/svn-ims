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
          :prop="`items.${index}.prodBatch.batchCode`"
          :rules="rules.batch">
          <el-input v-model="row.prodBatch.batchCode"/>
        </el-form-item>
      </template>
      <template
        slot="warehouse"
        slot-scope="{row, index}">
        <el-form-item
          :prop="`items.${index}.destLoc.id`"
          :rules="rules.warehouse">
          <WarehouseCascader v-model="row.warehouse"/>
        </el-form-item>
      </template>
      <template
        slot="qty"
        slot-scope="{row, index}">
        <el-form-item
          :prop="`items.${index}.movementQty`"
          :rules="rules.qty">
          <InputNumber v-model="row.movementQty"/>
        </el-form-item>
      </template>
      <template
        slot="price"
        slot-scope="{row, index}">
        <el-form-item
          :prop="`items.${index}.price`"
          :rules="rules.price">
          <InputNumber
            v-model="row.price"
            type="amount"/>
        </el-form-item>

      </template>
      <template
        slot="operator"
        slot-scope="{row, index}">
        <ConfirmButton @click="remove(row)"/>
        <el-button
          type="text"
          size="mini">复制</el-button>
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
  data () {
    return {
      form: {
        items: [{}]
      }
    }
  },
  computed: {
    columns () {
      return [
        // {
        //   label: '商品名称',
        //   prop: 'product.prodName'
        // },
        // {
        //   label: '商品编码',
        //   prop: 'product.prodCode'
        // },
        // {
        //   label: '单位',
        //   prop: 'product.unit'
        // },
        // {
        //   label: '规格型号',
        //   prop: 'product.specmodel'
        // },
        // {
        //   label: '品牌',
        //   prop: 'product.brand'
        // },
        // {
        //   label: '批次',
        //   prop: 'prodBatch.batchCode',
        //   slotName: 'batch'
        // },
        // {
        //   label: '仓库',
        //   prop: 'destLoc.id',
        //   slotName: 'warehouse'
        // },
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
        },
        {
          label: '操作',
          slotName: 'operator'
        }
      ]
    },
    // rules
    rules () {
      return {
        // batch: [{ required: true, message: '请输入批次', trigger: ['blur'] }],
        // warehouse: [{ required: true, message: '请选择仓库', trigger: ['blur', 'change'] }],
        qty: [{ required: true, message: '请输入数量', trigger: ['blur'] }],
        price: [{ required: true, message: '请输入金额', trigger: ['blur'] }]
      }
    }
  },
  watch: {
    'form.items': {
      handler (items) {
        items.forEach(item => {
          // 仓库
          if (item.warehouse && item.warehouse.warehouse) {
            item.destLoc.id = item.warehouse.warehouse
            item.destZone.id = item.warehouse.zone
            item.destBin.id = item.warehouse.bin
          }
          // 金额 = 入库数量 * 单价
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
