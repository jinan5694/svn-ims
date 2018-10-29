export default {
  data () {
    return {
      serviceName: 'PurchaseService'
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
      this.$router.push('/masterData/customer/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/customer/edit/' + id)
    }
  }
}
