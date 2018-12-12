<template>
  <ElForm
    ref="form"
    :model="form"
    :show-message="false"
  >
    <BaseTable
      :columns="columns"
      :data="form.items"
      class="table-validate"
    >
      <!-- slot -->
      <template
        slot="batch"
        slot-scope="{row, index}"
      >
        <ElFormItem
          v-if="editable"
          :prop="`items.${index}.prodBatch.batchCode`"
          :rules="rules.batch"
        >
          <ElInput v-model="row.prodBatch.batchCode" />
        </ElFormItem>
        <template v-else>
          {{ $_.get(row, 'prodBatch.batchCode') }}
        </template>
      </template>
      <template
        slot="dest"
        slot-scope="{row, index}"
      >
        <ElFormItem
          v-if="editable"
          :prop="`items.${index}.dest`"
          :rules="rules.dest"
        >
          <LocationCascader v-model="row.dest" />
        </ElFormItem>
        <template v-else>
          {{ getWarehouse(row) }}
        </template>
      </template>
      <template
        slot="qty"
        slot-scope="{row, index}"
      >
        <ElFormItem
          v-if="editable"
          :prop="`items.${index}.movementQty`"
          :rules="rules.qty"
        >
          <InputNumber
            v-model="row.movementQty"
            :min="0"
          />
        </ElFormItem>
        <Number
          v-else
          :value="row.movementQty"
        />
      </template>
      <template
        slot="price"
        slot-scope="{row}"
      >
        <!-- 价格更新暂时不支持，所以注销 -->
        <Number
          :value="row.price"
          amount
        />
      </template>
      <template
        slot="operator"
        slot-scope="{row, index}"
      >
        <ElButton
          type="text"
          @click="handleRemove(index)"
        >
          删除
        </ElButton>
        <ElButton
          type="text"
          @click="handleCopy(index)"
        >
          复制
        </ElButton>
      </template>
    </BaseTable>
  </ElForm>
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
  computed: {
    form () {
      return {
        items: this.items
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
          },
          width: 80
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
          slotName: 'price',
          width: 100
        },
        {
          label: '金额',
          prop: 'amount',
          width: 100
        }
      ]
      if (this.editable) {
        columns.push({
          label: '操作',
          slotName: 'operator'
        })
      } else {
        columns.push({
          label: '状态',
          prop: 'docItemStatus',
          formatter: row => {
            return this.$translate({
              key: 'AfterSales_DOCStatus_InStorageDOCStatus',
              value: row.docItemStatus
            })
          },
          width: 80
        })
      }
      return columns
    },
    // rules
    rules () {
      return {
        batch: [{ required: true, message: '请输入批次', trigger: ['blur', 'change'] }],
        dest: [{ required: true, message: '请选择仓库', trigger: ['blur', 'change'] }],
        qty: [{ required: true, message: '请输入数量', trigger: ['blur', 'change'] }]
      }
    }
  },
  watch: {
    'form.items': {
      handler (items) {
        items.forEach(item => {
          // 批次
          if (!item.prodBatch) {
            this.$set(item, 'prodBatch', { batchCode: null })
          }
          // 仓库
          if (item.dest) {
            const ids = item.dest.split(',')
            this.$_.set(item, 'destLoc.id', ids[0])
            this.$_.set(item, 'destZone.id', ids[1])
            this.$_.set(item, 'destBin.id', ids[2])
          }
          if (item.destLoc && item.destLoc.id) {
            const ids = []
            ids.push(this.$_.get(item, 'destLoc.id'))
            ids.push(this.$_.get(item, 'destZone.id'))
            ids.push(this.$_.get(item, 'destBin.id'))
            item.dest = ids.join(',')
          }
          // 金额
          item.amount = toNumber(item.movementQty) * toNumber(item.price)
        })
      },
      deep: true
    }
  },
  methods: {
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
    validate () {
      return this.validatePromise('form')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
