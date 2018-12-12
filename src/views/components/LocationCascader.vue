<template>
  <ElCascader
    v-model="ids"
    :options="options"
    v-bind="$attrs"
    expand-trigger="hover"
    @change="handleChange"
  />
</template>
<script>
export default {
  name: 'LocationCascader',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      locations: []
    }
  },
  computed: {
    ids: {
      get () {
        if (this.value) {
          return this.value.split(',')
        }
        return []
      },
      set (ids) {
        this.$emit('input', ids.join(','))
      }
    },
    options () {
      const options = []
      this.locations.forEach(item => {
        const warehouseItem = {
          value: item.id,
          label: item.warehouseName
        }
        if (item.zone.length) {
          warehouseItem.children = item.zone.map(item => {
            const zoneItem = {
              value: item.id,
              label: item.zoneName
            }
            if (item.bin.length) {
              zoneItem.children = item.bin.map(item => {
                return {
                  value: item.id,
                  label: item.binName
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
  created () {
    this.fetchLocation()
  },
  methods: {
    fetchLocation () {
      const url = '/WarehouseService/query'
      const params = [
        { where: { and: [{ enableFlag: 'System_EnableFlag_1' }] } }
      ]
      this.$axios.get(url, { params: params }).then(resp => {
        this.locations = resp.data
      })
    },
    handleChange (ids) {
      // this.$emit('input', this.getData())
      this.$emit('change', this.getData())
    },
    getData () {
      return this.ids.join(',')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
