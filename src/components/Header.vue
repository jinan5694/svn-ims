<template>
  <div class="header">
    <router-link to="/">
      <Logo color="#fff"/>
    </router-link>
    <div class="toolbar">
      <div class="item">
        {{ user.name }}
        {{ $t('message.success') }}
      </div>
      <div class="item">
        <Icon name="notifications"/>
      </div>
      <div class="item">
        <Icon name="settings"/>
      </div>
      <div
        class="item"
        @click="handleLogout">
        <Icon name="power_settings_new"/>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import { logout } from '@/common/login'
export default {
  name: 'Header',
  components: {
    Logo
  },
  computed: {
    user () {
      return this.$store.state.User.user
    }
  },
  methods: {
    handleLogout () {
      this.$confirm('确认退出登录？', '提示', {
        confirmButtonText: this.$t('ok'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        logout(this)
      }).catch(() => {
        // do nothing
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/vars.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .toolbar {
    display: flex;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 0, 0, 0.1);
      }
    }
  }
}
</style>
