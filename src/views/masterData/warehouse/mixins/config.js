export default {
  data () {
    return {
      serviceName: 'WarehouseService',
      path: ['zone']
    }
  },
  computed: {
    urlUpdate () {
      return `/${this.serviceName}/cascadeSaveOrUpdate`
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/warehouse/list')
    },
    toAdd () {
      this.$router.push('/masterData/warehouse/add')
    },
    toView (id) {
      this.$router.push('/masterData/warehouse/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/warehouse/edit/' + id)
    }
  }
}
