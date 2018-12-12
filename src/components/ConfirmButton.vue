<template>
  <ElPopover
    v-model="visible"
    :width="width"
    class="confirm-button"
    placement="bottom-end"
    title="提示"
    trigger="click"
  >
    <div class="content">
      <div class="message">
        <Icon name="warning" />
        {{ msg }}
      </div>
      <div class="footer">
        <ElButton
          type="text"
          @click="handleDone"
        >
          {{ $t('ok') }}
        </ElButton>
        <ElButton
          type="text"
          @click="handleCancel"
        >
          {{ $t('cancel') }}
        </ElButton>
      </div>
    </div>
    <ElButton
      slot="reference"
      :loading="loading"
      :type="type"
    >
      {{ text }}
    </ElButton>
  </ElPopover>
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
<style lang="scss">
.el-button + .confirm-button,
.confirm-button + .el-button,
.confirm-button + .confirm-button {
  margin-left: 10px;
}
</style>
