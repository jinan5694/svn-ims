<template>
  <div class="confirm-button">
    <el-popover
      ref="confirmPopover"
      v-model="isDisplay"
      :width="popoverWidth"
      placement="top"
      trigger="click">
      <div class="content">
        <i class="el-icon-warning"/>
        {{ msg }}
      </div>
      <div class="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          :loading="!isDisplay"
          type="primary"
          @click="handleDone">确定</el-button>
      </div>
      <el-button
        v-popover:confirmPopover
        :loading="loading"
        :type="buttonType"
      >{{ buttonText }}</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'ConfirmButton',
  props: {
    buttonText: {
      type: String,
      default: '删除'
    },
    buttonType: {
      type: String,
      default: 'text'
    },
    loading: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除？'
    },
    popoverWidth: {
      type: Number,
      default: 180
    }
  },
  data () {
    return {
      isDisplay: false
    }
  },
  methods: {
    handleCancel () {
      this.isDisplay = false
    },
    handleDone () {
      this.isDisplay = false
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-button {
  display: inline-block;
}
.content {
  .el-icon-warning {
    color: #E6A23C;
  }
  font-size: 12px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
<style lang="scss">
.confirm-button {
  line-height: 1;
}
// 设置按钮前后间距
.el-button + .confirm-button,
.confirm-button + .el-button,
.confirm-button + .confirm-button {
  margin-left: 10px;

}
</style>
