import _ from 'lodash'

export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    remove (row, url) {
      this.loading = true
      const params = _.cloneDeep(row)
      params.enableFlag = 'System_EnableFlag_0'
      this.$axios.post(url, [params]).then(() => {
        this.$message({
          type: 'success',
          message: this.$t('message.success')
        })
        this.fetch()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
