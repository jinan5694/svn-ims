<template>
  <div>
    <el-input
      v-model="key"
      :style="{width: fieldWidth}"
      :placeholder="placeholder"
      class="rb-search"
      prefix-icon="el-icon-search"
      @keyup.enter.native="enter"
      @change="handleChange"/>
      <!-- <Button
      button-type="search"
      @click="handleIconClick"/> -->
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'Search',
  props: {
    width: {
      type: [String, Number],
      default: 200
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      key: this.value,
      searched: null
    }
  },
  computed: {
    fieldWidth: function () {
      if (typeof this.width === 'number') {
        return this.width + 'px'
      }
      return this.width
    }
  },
  watch: {
    key (value) {
      this.debounceSearch()
    }
  },
  methods: {
    debounceSearch: _.debounce(function () {
      // 与搜索历史比对
      if (this.key !== this.searched) {
        this.$emit('input', this.key)
        this.$emit('search')
      }
    }, 300),
    handleIconClick: function (e) {
      this.$emit('input', this.key)
      this.$emit('search')
      // 记录搜索过的关键词
      this.searched = this.key
    },
    handleChange: function (value) {
      this.key = value
    },
    enter: function (e) {
      this.handleIconClick(e)
    }
  }
}
</script>

<style lang="scss" scoped>
  .rb-search {
    .el-input__icon {
      cursor: pointer;
    }
    // .search-btn {
    //   height: 100%;
    //   margin-left: 8px;
    //   padding: 0 5px;
    //   cursor: pointer;
    //   display: flex;
    //   align-items: center;
    // }
  }
</style>
