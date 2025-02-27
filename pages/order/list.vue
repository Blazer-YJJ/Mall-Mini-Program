<template>
  <view class="order-list-container">
    <!-- 订单状态选项卡 -->
    <view class="status-tabs">
      <view 
        class="tab-item" 
        v-for="(item, index) in statusList" 
        :key="index"
        :class="{active: currentStatus === item.value}"
        @click="switchStatus(item.value)"
      >
        {{ item.label }}
      </view>
    </view>
    
    <!-- 订单列表 -->
    <view class="order-list" v-if="orderList.length > 0">
      <view class="order-item" v-for="(order, index) in orderList" :key="index">
        <view class="order-header">
          <text class="order-no">订单号：{{ order.orderNo }}</text>
          <text class="order-status">{{ getStatusText(order.status) }}</text>
        </view>
        <view class="goods-list">
          <view class="goods-item" v-for="(goods, goodsIndex) in order.goodsList" :key="goodsIndex">
            <image :src="goods.image" mode="aspectFill" class="goods-image"></image>
            <view class="goods-info">
              <text class="goods-name">{{ goods.name }}</text>
              <view class="goods-price-box">
                <text class="goods-price">¥{{ goods.price }}</text>
                <text class="goods-count">x{{ goods.count }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="order-footer">
          <view class="total-box">
            <text>共{{ order.totalCount }}件商品 合计：</text>
            <text class="price">¥{{ order.totalAmount }}</text>
          </view>
          <view class="btn-group">
            <u-button v-if="order.status === 'pending'" size="mini" @click="cancelOrder(order.id)">取消订单</u-button>
            <u-button v-if="order.status === 'pending'" type="primary" size="mini" @click="payOrder(order.id)">去支付</u-button>
            <u-button v-if="order.status === 'shipped'" type="primary" size="mini" @click="confirmReceive(order.id)">确认收货</u-button>
            <u-button v-if="order.status === 'completed'" type="info" size="mini" @click="viewLogistics(order.id)">查看物流</u-button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty" v-else>
      <u-empty text="暂无相关订单" mode="order"></u-empty>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: 'all',
      statusList: [
        { label: '全部', value: 'all' },
        { label: '待付款', value: 'pending' },
        { label: '待发货', value: 'paid' },
        { label: '待收货', value: 'shipped' },
        { label: '已完成', value: 'completed' }
      ],
      orderList: []
    }
  },
  onLoad() {
    this.loadOrderList()
  },
  methods: {
    switchStatus(status) {
      this.currentStatus = status
      this.loadOrderList()
    },
    async loadOrderList() {
      try {
        // 模拟订单数据
        const mockOrders = [
          {
            id: 1,
            orderNo: 'O' + Date.now(),
            status: 'pending',
            goodsList: [
              {
                id: 1,
                name: '商品1',
                price: 199,
                count: 1,
                image: '/static/logo.png'
              }
            ],
            totalCount: 1,
            totalAmount: '199.00',
            createTime: '2023-01-01 12:00:00'
          },
          {
            id: 2,
            orderNo: 'O' + (Date.now() - 86400000),
            status: 'shipped',
            goodsList: [
              {
                id: 2,
                name: '商品2',
                price: 299,
                count: 2,
                image: '/static/logo.png'
              },
              {
                id: 3,
                name: '商品3',
                price: 99,
                count: 1,
                image: '/static/logo.png'
              }
            ],
            totalCount: 3,
            totalAmount: '697.00',
            createTime: '2022-12-30 15:30:00'
          }
        ]
        
        if (this.currentStatus !== 'all') {
          this.orderList = mockOrders.filter(order => order.status === this.currentStatus)
        } else {
          this.orderList = mockOrders
        }
      } catch (error) {
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    },
    getStatusText(status) {
      const statusMap = {
        'pending': '待付款',
        'paid': '待发货',
        'shipped': '待收货',
        'completed': '已完成',
        'cancelled': '已取消'
      }
      return statusMap[status] || '未知状态'
    },
    cancelOrder(orderId) {
      uni.showModal({
        title: '提示',
        content: '确定要取消该订单吗？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '订单已取消',
              icon: 'success'
            })
            this.loadOrderList()
          }
        }
      })
    },
    payOrder(orderId) {
      uni.showLoading({
        title: '正在跳转支付'
      })
      setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
          title: '支付成功',
          icon: 'success'
        })
        this.loadOrderList()
      }, 1500)
    },
    confirmReceive(orderId) {
      uni.showModal({
        title: '提示',
        content: '确认已收到商品？',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({
              title: '确认收货成功',
              icon: 'success'
            })
            this.loadOrderList()
          }
        }
      })
    },
    viewLogistics(orderId) {
      uni.showToast({
        title: '物流信息查询中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-list-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  
  .status-tabs {
    display: flex;
    background-color: #fff;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eee;
    
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      padding-bottom: 10rpx;
      
      &.active {
        color: #2979ff;
        font-weight: bold;
        
        &:after {
          content: '';
          position: absolute;
          bottom: -10rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 40rpx;
          height: 4rpx;
          background-color: #2979ff;
        }
      }
    }
  }
  
  .order-list {
    padding: 20rpx;
    
    .order-item {
      background-color: #fff;
      border-radius: 12rpx;
      margin-bottom: 20rpx;
      overflow: hidden;
      
      .order-header {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;
        border-bottom: 1rpx solid #f5f5f5;
        
        .order-no {
          font-size: 26rpx;
          color: #666;
        }
        
        .order-status {
          font-size: 26rpx;
          color: #ff5500;
        }
      }
      
      .goods-list {
        .goods-item {
          display: flex;
          padding: 20rpx;
          border-bottom: 1rpx solid #f5f5f5;
          
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
      
      .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        
        .total-box {
          font-size: 26rpx;
          color: #666;
          
          .price {
            color: #ff5500;
            font-size: 32rpx;
            font-weight: bold;
          }
        }
        
        .btn-group {
          display: flex;
          
          button {
            margin-left: 20rpx;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  
  .empty {
    padding: 100rpx 0;
  }
}
</style>