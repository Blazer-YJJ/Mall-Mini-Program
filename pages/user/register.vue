<template>
  <view class="register-container">
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
        <u-form-item label="确认密码">
          <u-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
        </u-form-item>
        <u-form-item label="昵称">
          <u-input v-model="form.nickname" placeholder="请输入昵称" />
        </u-form-item>
      </u-form>
      <view class="btn-group">
        <u-button type="primary" @click="handleRegister">注册</u-button>
        <u-button @click="goToLogin">返回登录</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        password: '',
        confirmPassword: '',
        nickname: ''
      }
    }
  },
  methods: {
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        uni.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        })
        return
      }
      try {
        // 模拟注册请求
        uni.showToast({
          title: '注册成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      } catch (error) {
        uni.showToast({
          title: '注册失败',
          icon: 'none'
        })
      }
    },
    goToLogin() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
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