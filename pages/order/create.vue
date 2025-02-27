<template>
  <view class="order-create-container">
    <!-- 收货地址 -->
    <view class="address-section" @click="selectAddress">
      <block v-if="selectedAddress">
        <view class="address-info">
          <view class="user-info">
            <text class="name">{{ selectedAddress.name }}</text>
            <text class="phone">{{ selectedAddress.phone }}</text>
          </view>
          <view class="address-detail">
            {{ selectedAddress.province }} {{ selectedAddress.city }} {{ selectedAddress.district }} {{ selectedAddress.address }}
          </view>
        </view>
      </block>
      <view class="no-address" v-else>
        <u-icon name="map" size="40"></u-icon>
        <text>请选择收货地址</text>
      </view>
      <u-icon name="arrow-right" color="#ccc"></u-icon>
    </view>
    
    <!-- 商品列表 -->
    <view class="goods-section">
      <view class="section-title">商品信息</view>
      <view class="goods-list">
        <view class="goods-item" v-for="item in orderGoods" :key="item.id">
          <image :src="item.image" mode="aspectFill" class="goods-image"></image>
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <view class="goods-price-box">
              <text class="goods-price">¥{{ item.price }}</text>
              <text class="goods-count">x{{ item.count }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 支付方式 -->
    <view class="payment-section">
      <view class="section-title">支付方式</view>
      <view class="payment-list">
        <view class="payment-item" @click="selectPayment('wechat')">
          <view class="payment-info">
            <u-icon name="weixin-fill" color="#09BB07" size="40"></u-icon>
            <text>微信支付</text>
          </view>
          <u-radio v-model="paymentMethod" label="wechat" name="payment"></u-radio>
        </view>
        <view class="payment-item" @click="selectPayment('alipay')">
          <view class="payment-info">
            <u-icon name="zhifubao-circle-fill" color="#1296db" size="40"></u-icon>
            <text>支付宝支付</text>
          </view>
          <u-radio v-model="paymentMethod" label="alipay" name="payment"></u-radio>
        </view>
      </view>
    </view>
    
    <!-- 订单金额 -->
    <view class="amount-section">
      <view class="amount-item">
        <text>商品金额</text>
        <text>¥{{ goodsAmount }}</text>
      </view>
      <view class="amount-item">
        <text>运费</text>
        <text>¥{{ freight }}</text>
      </view>
      <view class="amount-item total">
        <text>实付金额</text>
        <text class="price">¥{{ totalAmount }}</text>
      </view>
    </view>
    
    <!-- 提交订单 -->
    <view class="submit-section">
      <view class="total-box">
        <text>合计：</text>
        <text class="price">¥{{ totalAmount }}</text>
      </view>
      <u-button type="primary" @click="submitOrder">提交订单</u-button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      orderGoods: [],
      selectedAddress: null,
      paymentMethod: 'wechat',
      freight: 10
    }
  },
  computed: {
    ...mapState(['addressList']),
    goodsAmount() {
      return this.orderGoods.reduce((total, item) => total + item.price * item.count, 0).toFixed(2)
    },
    totalAmount() {
      return (parseFloat(this.goodsAmount) + this.freight).toFixed(2)
    }
  },
  onLoad(options) {
    // 从购物车结算或直接购买
    if (options.goods) {
      this.orderGoods = JSON.parse(options.goods)
    } else if (options.goodsId) {
      // 模拟直接购买的商品数据
      this.orderGoods = [{
        id: parseInt(options.goodsId),
        name: `商品${options.goodsId}`,
        price: Math.floor(Math.random() * 1000 + 100),
        image: '/static/logo.png',
        count: 1
      }]
    }
    
    // 获取默认地址
    if (this.addressList.length > 0) {
      this.selectedAddress = this.addressList.find(item => item.isDefault) || this.addressList[0]
    }
  },
  methods: {
    selectAddress() {
      uni.navigateTo({
        url: '/pages/user/address?select=true'
      })
    },
    selectPayment(method) {
      this.paymentMethod = method
    },
    submitOrder() {
      if (!this.selectedAddress) {
        uni.showToast({
          title: '请选择收货地址',
          icon: 'none'
        })
        return
      }
      
      // 模拟提交订单
      uni.showLoading({
        title: '提交中...'
      })
      
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '下单成功',
          icon: 'success'
        })
        
        // 跳转到订单列表
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/order/list'
          })
        }, 1500)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.order-create-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;
  
  .address-section {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 30rpx;
    margin-bottom: 20rpx;
    
    .address-info {
      flex: 1;
      
      .user-info {
        margin-bottom: 10rpx;
        
        .name {
          font-size: 32rpx;
          font-weight: bold;
          margin-right: 20rpx;
        }
        
        .phone {
          font-size: 28rpx;
          color: #666;
        }
      }
      
      .address-detail {
        font-size: 28rpx;
        color: #333;
      }
    }
    
    .no-address {
      flex: 1;
      display: flex;
      align-items: center;
      color: #999;
      font-size: 28rpx;
      
      text {
        margin-left: 10rpx;
      }
    }
  }
  
  .goods-section, .payment-section, .amount-section {
    background-color: #fff;
    margin-bottom: 20rpx;
    padding: 20rpx 30rpx;
    
    .section-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }
  
  .goods-list {
    .goods-item {
      display: flex;
      padding: 20rpx 0;
      border-bottom: 1px solid #f5f5f5;
      
      &:last-child {
        border-bottom: none;
      }
      
      .goods-image {
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;
      }
      
      .goods-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .goods-name {
          font-size: 28rpx;
          color: #333;
        }
        
        .goods-price-box {
          display: flex;
          justify-content: space-between;
          
          .goods-price {
            font-size: 32rpx;
            color: #ff5500;
            font-weight: bold;
          }
          
          .goods-count {
            font-size: 28rpx;
            color: #999;
          }
        }
      }
    }
  }
  
  .payment-list {
    .payment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 0;
      
      .payment-info {
        display: flex;
        align-items: center;
        
        text {
          margin-left: 20rpx;
          font-size: 28rpx;
        }
      }
    }
  }
  
  .amount-section {
    .amount-item {
      display: flex;
      justify-content: space-between;
      padding: 10rpx 0;
      font-size: 28rpx;
      color: #666;
      
      &.total {
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 1px solid #f5f5f5;
        font-size: 32rpx;
        color: #333;
        
        .price {
          color: #ff5500;
          font-weight: bold;
        }
      }
    }
  }
  
  .submit-section {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    
    .total-box {
      flex: 1;
      
      .price {
        color: #ff5500;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
    
    button {
      width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
    }
  }
}
</style>