export default {
  data () {
    return {
      serviceName: 'ProdBatchService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/prodBatch/list')
    },
    toAdd () {
      this.$router.push('/masterData/prodBatch/add')
    },
    toView (id) {
      this.$router.push('/masterData/prodBatch/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/prodBatch/edit/' + id)
    }
  }
}
