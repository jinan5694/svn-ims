<script>
/**
 * 关于 jsx 中使用自定义组件的说明
 * https://github.com/vuejs/babel-plugin-transform-vue-jsx#component-tip
 * 如果是小写字母开头，正常寻找组件
 * 如果是大写字母开头，转换成小写
 * 如果使用大写，可以在组件内在引入
 */
import resources from '@/common/resource'
import Icon from '@/components/Icon'

export default {
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
  },
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    active () {
      return this.$route.path
    }
  },
  methods: {
    getItem (item, slot) {
      return (
        <div class="item" { ...slot && { slot: slot }}>
          <Icon name={ item.icon } />
          <div class="title">{ item.label }</div>
        </div>
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  padding-top: 16px;
  // 图标 + 文字样式
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
