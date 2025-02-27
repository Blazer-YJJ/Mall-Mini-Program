<template>
  <view class="goods-detail-container">
    <!-- 高级轮播图 - 带视差效果 -->
    <view class="banner-container">
      <swiper class="swiper" indicator-dots indicator-active-color="#ffffff" indicator-color="rgba(255,255,255,0.5)" :autoplay="true" :interval="3000" :duration="500" circular>
        <swiper-item v-for="(item, index) in goodsInfo.images" :key="index" class="swiper-item">
          <image :src="item" mode="aspectFill" class="swiper-image"></image>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 商品信息卡片 -->
    <view class="goods-info">
      <view class="price">¥{{ goodsInfo.price }}</view>
      <view class="name">{{ goodsInfo.name }}</view>
      <view class="desc">{{ goodsInfo.desc }}</view>
    </view>
    
    <!-- 商品详情区域 -->
    <view class="goods-detail">
      <view class="section-header">
        <view class="title-container">
          <view class="title-line"></view>
          <text class="section-title">商品详情</text>
          <view class="title-line"></view>
        </view>
      </view>
      <rich-text :nodes="goodsInfo.detail" class="detail-content"></rich-text>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="cart-box" @click="goToCart">
        <u-icon name="shopping-cart" size="40"></u-icon>
        <text>购物车</text>
        <u-badge :count="cartCount" type="error" :offset="[0, -10]" />
      </view>
      <view class="btn-group">
        <view class="cart-btn" @click="handleAddToCart">加入购物车</view>
        <view class="buy-btn" @click="buyNow">立即购买</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      goodsInfo: {
        id: 0,
        name: '',
        price: 0,
        desc: '',
        detail: '',
        images: ['/static/logo.png']
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['cartCount'])
  },
  onLoad(options) {
    this.loadGoodsDetail(options.id)
  },
  methods: {
    ...mapMutations(['addToCart']),
    async loadGoodsDetail(id) {
      try {
        // 模拟商品详情数据
        this.goodsInfo = {
          id: parseInt(id),
          name: `商品${id}`,
          price: Math.floor(Math.random() * 1000 + 100),
          desc: '商品描述信息',
          detail: '<div>商品详细介绍</div>',
          images: ['/static/logo.png', '/static/logo.png']
        }
      } catch (error) {
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    },
    goToCart() {
      uni.switchTab({
        url: '/pages/cart/index'
      })
    },
    handleAddToCart() {
      if (!this.userInfo) {
        this.checkLogin()
        return
      }
      this.addToCart(this.goodsInfo)
      uni.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
    },
    buyNow() {
      if (!this.userInfo) {
        this.checkLogin()
        return
      }
      uni.navigateTo({
        url: `/pages/order/create?goodsId=${this.goodsInfo.id}`
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
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
  padding-bottom: 120rpx;
  background-color: #f8f8f8;
  
  // 轮播图样式
  .banner-container {
    position: relative;
    height: 750rpx;
    overflow: hidden;
    
    .swiper {
      height: 100%;
      
      .swiper-item {
        position: relative;
        
        .swiper-image {
          width: 100%;
          height: 100%;
          transform: scale(1.05);
          transition: transform 0.3s;
        }
      }
    }
  }
  
  // 商品信息样式
  .goods-info {
    margin: 20rpx;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
    box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.05);
    
    .price {
      font-size: 44rpx;
      color: #ff6b81;
      font-weight: bold;
    }
    
    .name {
      font-size: 34rpx;
      color: #333;
      margin-top: 20rpx;
      font-weight: 500;
    }
    
    .desc {
      font-size: 28rpx;
      color: #666;
      margin-top: 16rpx;
      line-height: 1.5;
    }
  }
  
  // 商品详情样式
  .goods-detail {
    margin: 30rpx 20rpx;
    padding: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
    box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.05);
    
    .section-header {
      margin-bottom: 30rpx;
      
      .title-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rpx;
        
        .title-line {
          height: 2rpx;
          width: 60rpx;
          background-color: #333;
        }
        
        .section-title {
          font-size: 32rpx;
          font-weight: bold;
          margin: 0 20rpx;
          letter-spacing: 4rpx;
        }
      }
    }
    
    .detail-content {
      font-size: 28rpx;
      line-height: 1.8;
      color: #333;
    }
  }
  
  // 底部操作栏样式
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 110rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.08);
    
    .cart-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30rpx;
      position: relative;
      padding: 0 20rpx;
      
      text {
        font-size: 22rpx;
        color: #666;
        margin-top: 4rpx;
      }
    }
    
    .btn-group {
      flex: 1;
      display: flex;
      justify-content: space-between;
      
      .cart-btn, .buy-btn {
        flex: 1;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: bold;
        border-radius: 40rpx;
        margin: 0 10rpx;
      }
      
      .cart-btn {
        background-color: #ffeaa7;
        color: #ff6b00;
      }
      
      .buy-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: #fff;
      }
    }
  }
}
</style>