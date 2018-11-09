<template>
  <div class="">
    <Toolbar :title="$t('base_info')"/>
    <GridForm
      ref="form"
      :items="items"
      :model="form"
      :rules="rules"
      :number-of-columns="4"
      :disabled="disabled">
      <div slot="orderNo">
        <el-input
          v-model="form.orderNo"/>
      </div>
      <div slot="postingDate">
        <el-date-picker
          v-model="form.postingDate"
          :disabled="disabled"
          type="date"
          value-format="yyyy-MM-dd"/>
      </div>
      <div slot="operator">
        <el-select
          v-model="form.operator"
          :disabled="disabled">
          <el-option
            v-for="item in operators"
            :key="item.id"
            :label="item.employeeName"
            :value="item.id"/>
        </el-select>
      </div>
      <div slot="remark">
        <el-input
          v-model="form.remark"
          :disabled="disabled"
          type="textarea"
          maxlength="255"/>
      </div>
      <div slot="warehouse">
        <el-select
          v-model="form.warehouse"
          @change="handleChangeWarehouse">
          <el-option
            v-for="item in warehouses"
            :key="item.id"
            :label="item.warehouseName"
            :value="item.id"/>
        </el-select>
      </div>
      <div slot="zone">
        <el-select
          v-model="form.zone"
          @change="handleChangeZone">
          <el-option
            v-for="item in zones"
            :key="item.id"
            :label="item.zoneName"
            :value="item.id"/>
        </el-select>
      </div>
      <div slot="bin">
        <el-select
          v-model="form.bin"
          @change="handleChangeBin">
          <el-option
            v-for="item in bins"
            :key="item.id"
            :label="item.binName"
            :value="item.id"/>
        </el-select>
      </div>
    </GridForm>
    <ProductSelect
      v-if="visible"
      :visible.sync="visible"
      @select="select"/>
    <Toolbar :title="$t('product_info')">
      <el-button
        type="primary"
        @click="exportWarehouse">{{ $t('export_warehouse') }}</el-button>
    </Toolbar>
    <EditItemTable
      v-if="!disabled"
      ref="editItemTable"/>
    <ItemTable
      v-else
      ref="itemTable"
      :data="form.productItems"/>
  </div>
</template>
<script>
import EditItemTable from './EditItemTable.vue'
import ItemTable from './ItemTable.vue'
import ProductSelect from './ProductSelect.vue'

export default {
  name: 'PurchaseForm',
  components: {
    EditItemTable,
    ItemTable,
    ProductSelect
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false,
      warehouses: [],
      zones: [],
      bins: [],
      form: {
        orderNo: null,
        postingDate: null,
        operator: null,
        remark: null,
        warehouse: null,
        zone: null,
        bin: null,
        productItems: []
      }
    }
  },
  computed: {
    disabled () {
      return !this.editable
    },
    rules () {
      return {
        postingDate: [{ required: true, message: '请选择盘点日期', trigger: ['blur', 'change'] }],
        operator: [{ required: true, message: '请选择盘点员', trigger: ['blur', 'change'] }],
        orderNo: [{ required: true, message: '请输入单据编号', trigger: ['blur', 'change'] }],
        warehouse: [{ required: true, message: '请选择盘点仓库', trigger: ['blur', 'change'] }]
      }
    },
    operators () {
      return this.$store.state.Business.employees
    },
    items () {
      return [
        {
          label: '单据编号',
          prop: 'orderNo',
          span: 1
        },
        {
          label: '盘点日期',
          prop: 'postingDate',
          span: 1
        },
        {
          label: '盘点员',
          prop: 'operator',
          span: 1
        },
        {
          label: '备注',
          prop: 'remark',
          span: 1
        },
        {
          label: '盘点仓库',
          prop: 'warehouse',
          span: 1
        },
        {
          label: '盘点库区',
          prop: 'zone',
          span: 1
        },
        {
          label: '盘点库位',
          prop: 'bin',
          span: 1
        }
      ]
    }
  },
  created () {
    this.queryWarehouse()
  },
  methods: {
    exportWarehouse () {
      console.log('export')
    },
    handleChangeWarehouse (val) {
      if (val) {
        let warehouse = this.warehouses.filter((item) => {
          return item.id === val
        })
        if (warehouse && warehouse.length) {
          this.zones = warehouse[0].zone
        }
      }
      this.form.zone = null
      this.form.bin = null
      this.queryMetirialInventory()
    },
    handleChangeZone (val) {
      if (val) {
        let zone = this.zones.filter((item) => {
          return item.id === val
        })
        if (zone && zone.length) {
          this.bins = zone[0].bin
        }
      }
      this.form.bin = null
      this.queryMetirialInventory()
    },
    handleChangeBin (val) {
      this.queryMetirialInventory()
    },
    queryMetirialInventory () {
      const url = '/MetirialInventoryService/query'
      let params = [{ where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }, ['product', 'prodbatch', 'warehouse', 'zone', 'bin']]
      if (this.form.warehouse) {
        params[0].where.and.push({ 'warehouse.id': this.form.warehouse })
        if (this.form.zone) {
          params[0].where.and.push({ 'zone.id': this.form.zone })
          if (this.form.bin) {
            params[0].where.and.push({ 'bin.id': this.form.bin })
          }
        }
        this.$axios.get(url, { params: params }).then((resp) => {
          let items = this.formatItems(resp.data)
          this.$refs.editItemTable.setItems(items)
        })
      }
    },
    formatItems (datas) {
      if (datas && datas.length) {
        datas.map((data) => {
          data.prodName = data.product.prodName
          data.prodCode = data.product.prodCode
          data.unit = data.product.unit
        })
      }
      return datas
    },
    queryWarehouse () {
      const url = '/WarehouseService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      this.$axios.get(url, { params: params }).then(resp => {
        this.warehouses = resp.data
      })
    },
    setForm (form) {
      if (this.$refs.editItemTable) {
        this.$refs.editItemTable.setItems(form.productItems)
      }
      this.form = form
    },
    getForm () {
      this.form.productItems = this.$refs.editItemTable.getItems()
      return this.form
    },
    validate () {
      return new Promise((resolve, reject) => {
        Promise.all([
          this.$refs.form.$children[0].validate()
          // this.$refs.editItemTable.validate()
        ]).then(results => {
          const productItems = this.$refs.editItemTable.getItems()
          if (productItems && productItems.length === 0) {
            const errorMsg = '请添加商品'
            this.$message({
              type: 'warning',
              message: errorMsg
            })
            reject(errorMsg)
          }
          resolve()
        }).catch((error) => {
          if (error) {
            let errorMsg = '请完善信息'
            const keys = Object.keys(error)
            errorMsg = error[keys[0]][0].message
            this.$message({
              type: 'warning',
              message: errorMsg
            })
            reject(errorMsg)
          }
        })
      })
    },
    batchAdd () {
      this.visible = true
    },
    select (datas) {
      if (datas && datas.length) {
        let productItems = []
        const items = this.$refs.editItemTable.getItems()
        datas.forEach((data) => {
          let f = false
          for (let i = 0; i < items.length; i++) {
            if (data.id === items[i].product.id) {
              f = true
              break
            }
          }
          if (!f) {
            productItems.push({
              product: data,
              prodName: data.prodName,
              prodCode: data.prodCode,
              unit: data.unit,
              orderQty: 0,
              price: 0,
              amount: 0,
              giftQty: 0,
              qty: 0,
              inQty: 0
            })
          }
        })
        this.$refs.editItemTable.setItems(items.concat(productItems))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.batch-add {
  text-align: right;
}
</style>
