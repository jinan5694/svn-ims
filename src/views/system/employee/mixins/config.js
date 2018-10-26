export default {
  data () {
    return {
      serviceName: 'EmployeeService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/system/employee/list')
    },
    toAdd () {
      this.$router.push('/system/employee/add')
    },
    toView (id) {
      this.$router.push('/system/employee/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/system/employee/edit/' + id)
    }
  }
}
