export default {
  data () {
    return {
      serviceName: 'BinService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/bin/list')
    },
    toAdd () {
      this.$router.push('/masterData/bin/add')
    },
    toView (id) {
      this.$router.push('/masterData/bin/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/bin/edit/' + id)
    }
  }
}
