export default {
  data () {
    return {
      serviceName: 'TakeStockOrderService'
    }
  },
  methods: {
    toList () {
      this.$router.push('/part/takeStock/list')
    },
    toAdd () {
      this.$router.push('/part/takeStock/add')
    },
    toView (id) {
      this.$router.push('/part/takeStock/view/' + id)
    },
    toEdit (id) {
      this.$router.push('/part/takeStock/edit/' + id)
    }
    // handleSaveOrUpdate () {
    //   this.validate().then(() => {
    //     return this.saveOrUpdate()
    //   }).then((resp) => {
    //     this.$message({
    //       message: this.$t('message.success'),
    //       type: 'success'
    //     })
    //     this.toEdit(resp.data.id)
    //   }).catch(error => {
    //     if (error) {
    //       console.error(error.exceptionMessage)
    //     }
    //   })
    // }
  }
}
