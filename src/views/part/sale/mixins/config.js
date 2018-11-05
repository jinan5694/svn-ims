export default {
  data () {
    return {
      serviceName: 'SaleOrderService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/part/sale/list')
    },
    toAdd () {
      this.$router.push('/part/sale/add')
    },
    toView (id) {
      this.$router.push('/masterData/customer/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/customer/edit/' + id)
    }
  }
}
