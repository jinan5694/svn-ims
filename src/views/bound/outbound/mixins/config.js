export default {
  data () {
    return {
      serviceName: 'OutStorageService',
      path: []
    }
  },
  computed: {

  },
  methods: {
    toList () {
      this.$router.push('/bound/outbound/list')
    },
    toAdd () {
      this.$router.push('/bound/outbound/add')
    },
    toView (id) {
      this.$router.push('/bound/outbound/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/bound/outbound/edit/' + id)
    },
    // 入库单是否可以编辑，删除等操作
    orderEditable (order) {
      return order.docStatus === 'AfterSales_DOCStatus_InStorageDOCStatus_ISDOCS001'
    }
  }
}
