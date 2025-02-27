<template>
  <view class="cart-container">
    <view class="empty" v-if="cartList.length === 0">
      <u-empty text="购物车空空如也" mode="cart"></u-empty>
      <u-button type="primary" @click="goToHome">去逛逛</u-button>
    </view>
    <block v-else>
      <view class="cart-list">
        <view class="cart-item" v-for="item in cartList" :key="item.id">
          <u-checkbox v-model="item.checked" @change="updateSelection"></u-checkbox>
          <image :src="item.image" mode="aspectFill" class="goods-image"></image>
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-price">¥{{ item.price }}</text>
            <view class="count-box">
              <u-number-box v-model="item.count" @change="(value) => updateCount(item.id, value)"></u-number-box>
              <u-icon name="trash" size="40" @click="removeItem(item.id)"></u-icon>
            </view>
          </view>
        </view>
      </view>
      <view class="bottom-bar">
        <view class="select-all">
          <u-checkbox v-model="isAllSelected" @change="toggleSelectAll">全选</u-checkbox>
        </view>
        <view class="total-box">
          <text>合计：</text>
          <text class="price">¥{{ totalPrice }}</text>
        </view>
        <u-button type="primary" @click="checkout">结算({{ selectedCount }})</u-button>
      </view>
    </block>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      isAllSelected: false,
      // 添加一些模拟数据，用于在没有购物车数据时显示
      mockData: [
        {
          id: 1,
          name: '智能手机 Pro Max',
          price: 5999,
          image: '/static/logo.png',
          count: 1,
          checked: true
        },
        {
          id: 2,
          name: '超薄笔记本电脑',
          price: 8999,
          image: '/static/logo.png',
          count: 1,
          checked: true
        },
        {
          id: 3,
          name: '无线蓝牙耳机',
          price: 999,
          image: '/static/logo.png',
          count: 2,
          checked: false
        }
      ]
    }
  },
  computed: {
    ...mapState(['cartList', 'userInfo']),
    // 如果购物车为空，则使用模拟数据
    displayCartList() {
      // 确保cartList存在再访问其length属性
      return (this.cartList && this.cartList.length > 0) ? this.cartList : this.mockData
    },
    selectedCount() {
      return this.displayCartList.filter(item => item.checked).length
    },
    totalPrice() {
      return this.displayCartList
        .filter(item => item.checked)
        .reduce((total, item) => total + item.price * item.count, 0)
        .toFixed(2)
    }
  },
  onShow() {
    // 页面显示时检查全选状态
    this.updateSelection()
  },
  methods: {
    ...mapMutations(['updateCartCount', 'removeFromCart', 'updateCartItemChecked', 'updateAllCartItemsChecked']),
    goToHome() {
      uni.switchTab({
        url: '/pages/index/index'
      })
    },
    updateSelection() {
      this.isAllSelected = this.displayCartList.length > 0 && this.displayCartList.every(item => item.checked)
    },
    toggleSelectAll(value) {
      // 使用store中的mutation更新所有商品选中状态
      this.updateAllCartItemsChecked(value)
      this.displayCartList.forEach(item => {
        item.checked = value
      })
    },
    updateCount(id, count) {
      this.updateCartCount({ id, count })
    },
    removeItem(id) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该商品吗？',
        success: (res) => {
          if (res.confirm) {
            this.removeFromCart(id)
          }
        }
      })
    },
    checkout() {
      if (!this.userInfo) {
        uni.navigateTo({
          url: '/pages/user/login'
        })
        return
      }
      if (this.selectedCount === 0) {
        uni.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      // 使用displayCartList而不是直接使用cartList
      const selectedGoods = this.displayCartList.filter(item => item.checked)
      uni.navigateTo({
        url: `/pages/order/create?goods=${JSON.stringify(selectedGoods)}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;
  .empty {
    padding: 100rpx 40rpx;
    text-align: center;
    button {
      margin-top: 40rpx;
      width: 200rpx;
    }
  }
  .cart-list {
    .cart-item {
      display: flex;
      align-items: center;
      padding: 20rpx;
      background-color: #fff;
      margin-bottom: 20rpx;
      .goods-image {
        width: 160rpx;
        height: 160rpx;
        margin: 0 20rpx;
      }
      .goods-info {
        flex: 1;
        .goods-name {
          font-size: 28rpx;
          color: #333;
        }
        .goods-price {
          font-size: 32rpx;
          color: #ff5500;
          font-weight: bold;
          margin: 10rpx 0;
        }
        .count-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .bottom-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    .select-all {
      margin-right: 20rpx;
    }
    .total-box {
      flex: 1;
      text-align: right;
      margin-right: 20rpx;
      .price {
        color: #ff5500;
        font-size: 36rpx;
        font-weight: bold;
      }
    }
  }
}
</style>