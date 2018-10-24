export default {
  data () {
    return {
      serviceName: 'VendorService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/vendor/list')
    },
    toAdd () {
      this.$router.push('/masterData/vendor/add')
    },
    toView (id) {
      this.$router.push('/masterData/vendor/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/vendor/edit/' + id)
    }
  }
}
