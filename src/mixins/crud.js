import _ from 'lodash'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    urlQuery () {
      return `/${this.serviceName}/query`
    },
    urlGet () {
      return `/${this.serviceName}/get`
    },
    urlSave () {
      return `/${this.serviceName}/save`
    },
    urlUpdate () {
      return `/${this.serviceName}/update`
    }
  },
  methods: {
    // 查询
    fetch () {
      this.$refs.table.fetch()
    },
    // 新增
    handleSaveOrUpdate () {
      this.validate().then(() => {
        return this.saveOrUpdate()
      }).then(() => {
        this.$message({
          message: this.$t('message.success'),
          type: 'success'
        })
        this.toList()
      }).catch(err => {
        console.warn('validate faild', err)
      })
    },
    saveOrUpdate () {
      this.loading = true
      const params = this.$refs.form.getForm()
      const url = params.id ? this.urlUpdate : this.urlSave
      return this.$axios.post(url, [params]).then((resp) => {
        return resp
      }).catch(error => {
        this.$message({ type: 'error', message: error })
      }).finally(() => {
        this.loading = false
      })
    },
    validate () {
      return this.$refs.form.validate()
    },
    getData () {
      if (this.id) {
        this.loading = true
        this.$axios.get(this.urlGet, { params: [this.id] }).then(resp => {
          this.$refs.form.setForm(resp.data)
        }).catch(error => {
          this.$message({ type: 'error', message: error })
        }).finally(() => {
          this.loading = false
        })
      }
    },
    remove (row) {
      this.loading = true
      const params = _.cloneDeep(row)
      params.enableFlag = 'System_EnableFlag_0'
      this.$axios.post(this.urlUpdate, [params]).then(() => {
        this.$message({ type: 'success', message: this.$t('message.success') })
        this.fetch()
      }).catch(error => {
        this.$message({ type: 'error', message: error })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
