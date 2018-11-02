<template>
  <el-cascader
    v-model="ids"
    :options="options"
    v-bind="$attrs"
    expand-trigger="hover"
    @change="handleChange"/>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'WarehouseCascader',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ids: [],
      warehouse: []
    }
  },
  computed: {
    options () {
      const options = []
      this.warehouse.forEach(item => {
        const warehouseItem = {
          value: item.id,
          label: item.warehouseCode
        }
        if (item.zone.length) {
          warehouseItem.children = item.zone.map(item => {
            const zoneItem = {
              value: item.id,
              label: item.zoneCode
            }
            if (item.bin.length) {
              zoneItem.children = item.bin.map(item => {
                return {
                  value: item.id,
                  label: item.binCode
                }
              })
            }
            return zoneItem
          })
          options.push(warehouseItem)
        }
      })
      return options
    }
  },
  watch: {
    value () {
      this.setIds()
    }
  },
  created () {
    this.setIds()
    this.fetchWarehouse()
  },
  methods: {
    fetchWarehouse () {
      const url = '/WarehouseService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      this.$axios.get(url, { params: params }).then(resp => {
        this.warehouse = resp.data
      })
    },
    handleChange (ids) {
      this.$emit('input', this.getData())
      this.$emit('change', this.getData())
    },
    getData () {
      return { warehouse: this.ids[0], zone: this.ids[1], bin: this.ids[2] }
    },
    setIds () {
      if (!_.isEmpty(this.value)) {
        this.ids = [
          this.value.warehouse,
          this.value.zone,
          this.value.bin
        ]
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
