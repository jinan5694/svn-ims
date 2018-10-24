<template>
  <el-popover
    v-model="visible"
    class="confirm-button"
    placement="bottom-end"
    title="提示"
    trigger="click"
    :width="width">
    <div class="content">
      <div class="message">
        <Icon name="warning"/>
        {{ msg }}
      </div>
      <div class="footer">
        <el-button
          type="text"
          @click="handleDone">{{ $t('ok') }}</el-button>
        <el-button
          type="text"
          @click="handleCancel">{{ $t('cancel') }}</el-button>
      </div>
    </div>
    <el-button
      slot="reference"
      :type="type">{{ text }}</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'ConfirmButton',
  props: {
    text: {
      type: String,
      default: '删除'
    },
    type: {
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
    width: {
      type: Number,
      default: 180
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleCancel () {
      this.visible = false
    },
    handleDone () {
      this.visible = false
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-button {
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
}
.content {
  .message {
    display: flex;
    align-items: center;
    .material-icons {
      font-size: 18px;
      color: orange;
      margin-right: 5px;
    }
    font-size: 12px;
    color: #666;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
