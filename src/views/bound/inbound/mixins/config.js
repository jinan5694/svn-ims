export default {
  data () {
    return {
      serviceName: 'InStorageService',
      path: []
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
    },
    // 入库单是否可以编辑，删除等操作
    orderEditable (order) {
      return order.docStatus === 'AfterSales_DOCStatus_InStorageDOCStatus_ISDOCS001'
    }
  }
}
