<template>
  <view class="profile-container">
    <view class="user-info">
      <view class="avatar-box">
        <image src="/static/logo.png" mode="aspectFit" class="avatar"></image>
      </view>
      <view class="info-box">
        <text class="nickname">{{ userInfo ? userInfo.nickname : '未登录' }}</text>
        <text class="phone" v-if="userInfo">{{ userInfo.phone }}</text>
      </view>
    </view>
    <view class="menu-list">
      <u-cell-group>
        <u-cell title="我的订单" icon="shopping-cart" is-link @click="goToOrders" />
        <u-cell title="收货地址" icon="map" is-link @click="goToAddress" />
        <u-cell title="关于我们" icon="info-circle" is-link @click="goToAbout" />
      </u-cell-group>
    </view>
    <view class="logout-btn" v-if="userInfo">
      <u-button type="error" @click="handleLogout">退出登录</u-button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    goToOrders() {
      if (!this.userInfo) {
        this.checkLogin()
        return
      }
      uni.navigateTo({
        url: '/pages/order/list'
      })
    },
    goToAddress() {
      if (!this.userInfo) {
        this.checkLogin()
        return
      }
      uni.navigateTo({
        url: '/pages/user/address'
      })
    },
    goToAbout() {
      uni.navigateTo({
        url: '/pages/about/index'
      })
    },
    checkLogin() {
      uni.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/user/login'
        })
      }, 1500)
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.setUserInfo(null)
            uni.showToast({
              title: '已退出登录',
              icon: 'success'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  .user-info {
    display: flex;
    align-items: center;
    padding: 40rpx;
    background-color: #f8f8f8;
    .avatar-box {
      .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
    }
    .info-box {
      margin-left: 30rpx;
      .nickname {
        font-size: 32rpx;
        font-weight: bold;
      }
      .phone {
        font-size: 24rpx;
        color: #666;
        margin-top: 10rpx;
      }
    }
  }
  .menu-list {
    margin-top: 20rpx;
  }
  .logout-btn {
    margin: 40rpx;
  }
}
</style>