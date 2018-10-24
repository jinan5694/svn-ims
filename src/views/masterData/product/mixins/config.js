export default {
  data () {
    return {
      serviceName: 'ProductService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/product/list')
    },
    toAdd () {
      this.$router.push('/masterData/product/add')
    },
    toView (id) {
      this.$router.push('/masterData/product/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/product/edit/' + id)
    }
  }
}
