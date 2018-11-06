export default {
  data () {
    return {
      serviceName: 'PurchaseOrderService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/part/purchase/list')
    },
    toAdd () {
      this.$router.push('/part/purchase/add')
    },
    toView (id) {
      this.$router.push('/part/purchase/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/part/purchase/edit/' + id)
    }
  }
}
