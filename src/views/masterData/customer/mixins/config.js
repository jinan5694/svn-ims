export default {
  data () {
    return {
      serviceName: 'CustomerService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/customer/list')
    },
    toAdd () {
      this.$router.push('/masterData/customer/add')
    },
    toView (id) {
      this.$router.push('/masterData/customer/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/customer/edit/' + id)
    }
  }
}
