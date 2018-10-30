<script>
import resources from '@/common/resource'

export default {
  computed: {
    active () {
      return this.$route.path
    }
  },
  methods: {
    getItem (item, slot) {
      return (
        <div class="item" { ...slot && { slot: slot }}>
          <icon name={ item.icon } />
          <div class="title">{ item.label }</div>
        </div>
      )
    }
  },
  render () {
    return (
      <div class="sidebar">
        <el-menu
          collapse={ true }
          defaultActive={ this.active }
          router={ true }>
          {
            resources.map(item => {
              if (item.children && item.children.length) {
                return (
                  <el-submenu index={ item.path }>
                    { this.getItem(item, 'title') }
                    {
                      item.children.map(subItem => {
                        return (
                          <el-menu-item index={ subItem.path }>
                            { subItem.label }
                          </el-menu-item>
                        )
                      })
                    }
                  </el-submenu>
                )
              } else {
                return (
                  <el-menu-item index={ item.path } >
                    { this.getItem(item) }
                  </el-menu-item>
                )
              }
            })
          }
        </el-menu>
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  padding-top: 16px;
  // icon & text
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .title {
      line-height: 20px;
      font-size: 12px;
    }
  }
}
</style>
