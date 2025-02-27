<template>
  <view class="login-container">
    <view class="logo-box">
      <image src="/static/logo.png" mode="aspectFit" class="logo"></image>
    </view>
    <view class="form-box">
      <u-form :model="form" ref="uForm">
        <u-form-item label="手机号">
          <u-input v-model="form.phone" placeholder="请输入手机号" />
        </u-form-item>
        <u-form-item label="密码">
          <u-input v-model="form.password" type="password" placeholder="请输入密码" />
        </u-form-item>
      </u-form>
      <view class="btn-group">
        <u-button type="primary" @click="handleLogin">登录</u-button>
        <u-button @click="goToRegister">注册账号</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async handleLogin() {
      try {
        // 模拟登录请求
        const userInfo = {
          id: 1,
          phone: this.form.phone,
          nickname: '测试用户'
        }
        this.setUserInfo(userInfo)
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
        uni.switchTab({
          url: '/pages/user/profile'
        })
      } catch (error) {
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    },
    goToRegister() {
      uni.navigateTo({
        url: '/pages/user/register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 40rpx;
  .logo-box {
    display: flex;
    justify-content: center;
    margin: 60rpx 0;
    .logo {
      width: 200rpx;
      height: 200rpx;
    }
  }
  .form-box {
    margin-top: 40rpx;
  }
  .btn-group {
    margin-top: 60rpx;
    button {
      margin-bottom: 30rpx;
    }
  }
}
</style>