<template>
  <view class="about-container">
    <view class="logo-box">
      <image src="/static/logo.png" mode="aspectFit" class="logo"></image>
      <text class="app-name">商城小程序</text>
      <text class="version">v1.0.0</text>
    </view>
    
    <view class="content-box">
      <view class="section">
        <view class="section-title">关于我们</view>
        <view class="section-content">
          <text>这是一个基于uni-app开发的商城小程序，提供商品浏览、购物车、订单管理等功能。</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-title">联系方式</view>
        <view class="section-content">
          <view class="contact-item">
            <u-icon name="phone" size="40" color="#2979ff"></u-icon>
            <text>客服电话：400-123-4567</text>
          </view>
          <view class="contact-item">
            <u-icon name="email" size="40" color="#2979ff"></u-icon>
            <text>邮箱：support@example.com</text>
          </view>
          <view class="contact-item">
            <u-icon name="home" size="40" color="#2979ff"></u-icon>
            <text>官网：www.example.com</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="footer">
      <text>Copyright © 2023 商城小程序 All Rights Reserved</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.about-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 40rpx;
  
  .logo-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0;
    background-color: #fff;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }
    
    .app-name {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    .version {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .content-box {
    margin-top: 20rpx;
    background-color: #fff;
    padding: 30rpx;
    
    .section {
      margin-bottom: 40rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 20rpx;
        position: relative;
        padding-left: 20rpx;
        
        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6rpx;
          height: 30rpx;
          background-color: #2979ff;
          border-radius: 3rpx;
        }
      }
      
      .section-content {
        font-size: 28rpx;
        color: #666;
        line-height: 1.8;
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 20rpx;
          
          text {
            margin-left: 20rpx;
          }
        }
      }
    }
  }
  
  .footer {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    margin-top: 60rpx;
  }
}
</style>