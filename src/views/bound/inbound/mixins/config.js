export default {
  data () {
    return {
      serviceName: 'WarehouseService',
      path: ['zone']
    }
  },
  computed: {

  },
  methods: {
    toList () {
      this.$router.push('/bound/inbound/list')
    },
    toAdd () {
      this.$router.push('/bound/inbound/add')
    },
    toView (id) {
      this.$router.push('/bound/inbound/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/bound/inbound/edit/' + id)
    }
  }
}
