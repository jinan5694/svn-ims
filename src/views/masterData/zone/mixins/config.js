export default {
  data () {
    return {
      serviceName: 'ZoneService',
      path: ['bin']
    }
  },
  computed: {
    urlUpdate () {
      return `/${this.serviceName}/cascadeSaveOrUpdate`
    }
  },
  methods: {
    toList () {
      this.$router.push('/masterData/zone/list')
    },
    toAdd () {
      this.$router.push('/masterData/zone/add')
    },
    toView (id) {
      this.$router.push('/masterData/zone/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/masterData/zone/edit/' + id)
    }
  }
}
