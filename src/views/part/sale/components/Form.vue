<template>
  <div class="">
    <Toolbar title="基本信息"/>
    <GridForm
      ref="form"
      :items="items"
      :model="form"
      :rules="rules"
      :number-of-columns="4">
      <div slot="orderNo">
        <el-input
          v-model="form.orderNo"/>
      </div>
      <div slot="sourceOrg">
        <el-select
          v-model="form.sourceOrg">
          <el-option
            v-for="item in customers"
            :key="item.id"
            :label="item.customerName"
            :value="item.id"/>
        </el-select>
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
    </GridForm>
    <ProductSelect
      v-if="visible"
      :visible.sync="visible"
      @select="select"/>
    <Toolbar title="商品信息"/>
    <div class="batch-add">
      <Button
        button-type="batchAdd"
        @click="batchAdd"/>
    </div>
    <EditItemTable
      ref="editItemTable"
      :data="form.productItems"
      @remove="remove"/>
  </div>
</template>
<script>
import EditItemTable from './EditItemTable.vue'
import ProductSelect from '@/views/part/purchase/components/ProductSelect.vue'

export default {
  name: 'PurchaseForm',
  components: {
    EditItemTable,
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
      customers: [],
      form: {
        orderNo: null,
        sourceOrg: null,
        postingDate: null,
        operator: null,
        remark: null,
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
        sourceOrg: [{ required: true, message: '请选择客户', trigger: ['blur', 'change'] }],
        postingDate: [{ required: true, message: '请选择销售日期', trigger: ['blur', 'change'] }],
        operator: [{ required: true, message: '请选择操作员', trigger: ['blur', 'change'] }]
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
          label: '客户',
          prop: 'sourceOrg',
          span: 1
        },
        {
          label: '销售日期',
          prop: 'postingDate',
          span: 1
        },
        {
          label: '操作员',
          prop: 'operator',
          span: 1
        },
        {
          label: '备注',
          prop: 'remark',
          span: 1
        }
      ]
    }
  },
  created () {
    this.queryCustomer()
  },
  methods: {
    queryCustomer () {
      const url = '/CustomerService/query'
      const params = [{ where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }]
      this.$axios.get(url, params).then((resp) => {
        this.customers = resp.data
      })
    },
    setForm (form) {
      this.form = form
    },
    getForm () {
      return this.form
    },
    validate () {
      return new Promise((resolve, reject) => {
        Promise.all([
          this.$refs.form.$children[0].validate(),
          this.$refs.editItemTable.validate()
        ]).then(results => {
          if (this.form.productItems && this.form.productItems.length === 0) {
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
    remove (index) {
      this.form.productItems.splice(index, 1)
    },
    batchAdd () {
      this.visible = true
    },
    select (datas) {
      if (datas && datas.length) {
        datas.forEach((data) => {
          let f = false
          for (let i = 0; i < this.form.productItems.length; i++) {
            if (data.id === this.form.productItems[i].product.id) {
              f = true
              break
            }
          }
          if (!f) {
            this.form.productItems.push({
              product: data,
              prodName: data.prodName,
              prodCode: data.prodCode,
              unit: data.unit,
              orderQty: 0,
              price: 0,
              amount: 0,
              outQty: 0
            })
          }
        })
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
