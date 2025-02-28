<template>
  <view class="container">
    <!-- 顶部搜索栏 - 现代风格 -->
    <view class="search-container">
      <view class="search-box">
        <u-search v-model="searchKeyword" placeholder="探索商品" shape="circle" @search="handleSearch" />
      </view>
    </view>
    
    <!-- 高级轮播图 - 带视差效果 -->
    <view class="banner-container">
      <swiper class="banner" indicator-dots indicator-active-color="#ffffff" indicator-color="rgba(255,255,255,0.5)" autoplay circular>
        <swiper-item v-for="(item, index) in banners" :key="index" class="swiper-item">
          <image :src="item.image" mode="aspectFill" class="banner-image" />
          <view class="banner-content">
            <text class="banner-title">{{item.title || '流行趋势'}}</text>
            <text class="banner-subtitle">{{item.subtitle || '探索我们的精选系列'}}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 创意分类导航 - 卡片式设计 -->
    <view class="category-section">
      <view class="category-container">
        <view class="category-item" v-for="(item, index) in categories" :key="index" @click="goToCategory(item)">
          <view class="category-icon-container">
            <image :src="item.icon" mode="aspectFit" class="category-icon" />
          </view>
          <text class="category-name">{{item.name}}</text>
        </view>
      </view>
    </view>
    
    <!-- 特色商品展示 - 大图卡片 -->
    <view class="featured-section">
      <view class="section-header">
        <view class="title-container">
          <view class="title-line"></view>
          <text class="section-title">特色商品</text>
          <view class="title-line"></view>
        </view>
        <text class="section-subtitle">为您精心挑选</text>
      </view>
      <view class="featured-card" @click="goToDetail(featuredProduct)" v-if="featuredProduct">
        <image :src="featuredProduct.image" mode="aspectFill" class="featured-image" />
        <view class="featured-info">
          <text class="featured-name">{{featuredProduct.name}}</text>
          <text class="featured-price">¥{{featuredProduct.price}}</text>
          <view class="featured-btn">立即购买</view>
        </view>
      </view>
    </view>
    
    <!-- 热门商品 - 现代网格布局 -->
    <view class="trending-section">
      <view class="section-header">
        <view class="title-container">
          <view class="title-line"></view>
          <text class="section-title">热门商品</text>
          <view class="title-line"></view>
        </view>
        <text class="more" @click="goToGoodsList">查看全部</text>
      </view>
      <view class="trending-grid">
        <view class="trending-item" v-for="(item, index) in goodsList" :key="index" @click="goToDetail(item)">
          <view class="product-card">
            <image :src="item.image" mode="aspectFill" class="product-image" />
            <view class="product-tag" v-if="index === 0">热卖</view>
            <view class="product-tag new" v-else-if="index === 1">新品</view>
            <view class="product-info">
              <text class="product-name">{{item.name}}</text>
              <text class="product-price">¥{{item.price}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 品牌故事 - 国际化设计 -->
    <view class="brand-section">
      <image src="/static/banner/2.png" mode="aspectFill" class="brand-bg-image"></image>
      <view class="brand-content">
        <text class="brand-title">品牌故事</text>
        <text class="brand-desc">探索我们精心挑选的优质产品系列</text>
        <view class="brand-btn" @click="goToAbout">了解更多</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      banners: [
        { image: '/static/banner/1.png', title: '夏季系列', subtitle: '探索最新潮流' },
        { image: '/static/banner/2.png', title: '新品上市', subtitle: '抢先选购' },
        { image: '/static/banner/3.png', title: '特别优惠', subtitle: '限时折扣' }
      ],
      categories: [
        { id: 1, name: '手机数码', icon: '/static/category/digital.png' },
        { id: 2, name: '服装鞋包', icon: '/static/category/clothing.png' },
        { id: 3, name: '食品生鲜', icon: '/static/category/food.png' },
        { id: 4, name: '家居家装', icon: '/static/category/furniture.png' }
      ],
      goodsList: [],
      featuredProduct: null
    }
  },
  onLoad() {
    this.loadGoodsList()
  },
  methods: {
    async loadGoodsList() {
      try {
        // 模拟商品数据
        this.goodsList = Array(6).fill().map((_, index) => ({
          id: index + 1,
          name: `精品商品 ${index + 1}`,
          price: Math.floor(Math.random() * 1000 + 100),
          image: '/static/logo.png'
        }))
        
        // 设置特色商品
        this.featuredProduct = {
          id: 999,
          name: '特色系列',
          price: 899,
          image: '/static/banner/1.png'
        }
      } catch (error) {
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    },
    handleSearch() {
      // 由于goods/list是tabBar页面，需要使用switchTab而不是navigateTo
      uni.switchTab({
        url: '/pages/goods/list'
      })
      // 通过本地存储传递搜索关键词参数
      uni.setStorageSync('searchKeyword', this.searchKeyword)
    },
    goToCategory(category) {
      // 根据分类ID跳转到对应的页面
      // 由于goods/list是tabBar页面，需要使用switchTab而不是navigateTo
      uni.switchTab({
        url: '/pages/goods/list'
      })
      // 通过全局状态管理或本地存储传递分类参数
      uni.setStorageSync('currentCategory', {
        id: category.id,
        name: category.name
      })
    },
    goToGoodsList() {
      uni.switchTab({
        url: '/pages/goods/list'
      })
    },
    goToDetail(goods) {
      uni.navigateTo({
        url: `/pages/goods/detail?id=${goods.id}`
      })
    },
    goToAbout() {
      uni.navigateTo({
        url: '/pages/about/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 30rpx;
  background-color: #f8f8f8;
  
  // 搜索栏样式
  .search-container {
    padding: 20rpx;
    background: linear-gradient(135deg, #2c3e50, #4a6572);
    
    .search-box {
      :deep(.u-search) {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }
  
  // 轮播图样式
  .banner-container {
    position: relative;
    height: 400rpx;
    overflow: hidden;
    
    .banner {
      height: 100%;
      
      .swiper-item {
        position: relative;
        
        .banner-image {
          width: 100%;
          height: 100%;
          transform: scale(1.05);
          transition: transform 0.3s;
        }
        
        .banner-content {
          position: absolute;
          bottom: 60rpx;
          left: 40rpx;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          
          .banner-title {
            font-size: 40rpx;
            font-weight: bold;
            margin-bottom: 10rpx;
            display: block;
          }
          
          .banner-subtitle {
            font-size: 24rpx;
            opacity: 0.9;
          }
        }
      }
    }
  }
  
  // 分类导航样式
  .category-section {
    padding: 30rpx 0 10rpx;
    
    .category-container {
      padding: 0 20rpx;
      display: flex;
      justify-content: space-between;
      
      .category-item {
        flex: 1;
        text-align: center;
        
        .category-icon-container {
          width: 120rpx;
          height: 120rpx;
          border-radius: 60rpx;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 0 8rpx 16rpx rgba(0,0,0,0.1);
          transition: transform 0.3s;
          
          &:active {
            transform: scale(0.95);
          }
          
          .category-icon {
            width: 60rpx;
            height: 60rpx;
          }
        }
        
        .category-name {
          font-size: 24rpx;
          margin-top: 16rpx;
          color: #333;
          display: block;
        }
      }
    }
  }
  
  // 特色商品样式
  .featured-section {
    margin: 30rpx 20rpx;
    
    .section-header {
      margin-bottom: 20rpx;
      
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
      
      .section-subtitle {
        font-size: 24rpx;
        color: #666;
        text-align: center;
        display: block;
      }
    }
    
    .featured-card {
      position: relative;
      height: 400rpx;
      border-radius: 16rpx;
      overflow: hidden;
      box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.15);
      
      .featured-image {
        width: 100%;
        height: 100%;
      }
      
      .featured-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 30rpx;
        background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        color: #fff;
        
        .featured-name {
          font-size: 36rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
          display: block;
        }
        
        .featured-price {
          font-size: 32rpx;
          margin-bottom: 20rpx;
          display: block;
        }
        
        .featured-btn {
          display: inline-block;
          padding: 12rpx 30rpx;
          background-color: #fff;
          color: #333;
          border-radius: 30rpx;
          font-size: 24rpx;
          font-weight: bold;
        }
      }
    }
  }
  
  // 热门商品样式
  .trending-section {
    margin: 40rpx 20rpx 20rpx;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .title-container {
        display: flex;
        align-items: center;
        
        .title-line {
          height: 2rpx;
          width: 40rpx;
          background-color: #333;
        }
        
        .section-title {
          font-size: 32rpx;
          font-weight: bold;
          margin: 0 20rpx;
          letter-spacing: 4rpx;
        }
      }
      
      .more {
        font-size: 24rpx;
        color: #666;
        text-decoration: underline;
      }
    }
    
    .trending-grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      
      .trending-item {
        width: calc(50% - 20rpx);
        margin: 10rpx;
        
        .product-card {
          background-color: #fff;
          border-radius: 16rpx;
          overflow: hidden;
          box-shadow: 0 6rpx 20rpx rgba(0,0,0,0.08);
          position: relative;
          
          .product-image {
            width: 100%;
            height: 300rpx;
            border-top-left-radius: 16rpx;
            border-top-right-radius: 16rpx;
          }
          
          .product-tag {
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            background-color: #ff6b81;
            color: #fff;
            padding: 6rpx 16rpx;
            border-radius: 4rpx;
            font-size: 20rpx;
            font-weight: bold;
            
            &.new {
              background-color: #2979ff;
            }
          }
          
          .product-info {
            padding: 20rpx;
            
            .product-name {
              font-size: 28rpx;
              color: #333;
              margin-bottom: 10rpx;
              display: block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            
            .product-price {
              font-size: 30rpx;
              color: #ff6b81;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  
  // 品牌故事样式
  .brand-section {
    margin: 40rpx 20rpx;
    height: 350rpx;
    border-radius: 16rpx;
    background: linear-gradient(135deg, #667eea, #764ba2);
    position: relative;
    overflow: hidden;
    
    .brand-bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      z-index: 0;
    }
    
    .brand-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40rpx;
      color: #fff;
      text-align: center;
      
      .brand-title {
        font-size: 40rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
        letter-spacing: 4rpx;
      }
      
      .brand-desc {
        font-size: 28rpx;
        margin-bottom: 40rpx;
        opacity: 0.9;
      }
      
      .brand-btn {
        padding: 16rpx 40rpx;
        background-color: rgba(255, 255, 255, 0.2);
        border: 2rpx solid #fff;
        border-radius: 40rpx;
        font-size: 24rpx;
        color: #fff;
        letter-spacing: 2rpx;
      }
    }
  }
}
</style>
