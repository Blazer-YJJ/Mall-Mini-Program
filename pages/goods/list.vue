<template>
  <view class="goods-list-container">
    <view class="search-section">
      <u-search v-model="keyword" placeholder="SEARCH PRODUCTS" shape="round" @search="handleSearch" />
    </view>
    
    <!-- 分类导航 - 横向滚动标签 -->
    <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
      <view class="category-container">
        <view 
          class="category-item" 
          v-for="item in categories" 
          :key="item.id" 
          @click="selectCategory(item)" 
          :class="{active: currentCategory === item.id}"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
    
    <!-- 筛选工具栏 - 现代简约 -->
    <view class="filter-toolbar">
      <view class="filter-item" :class="{active: sortType === 'default'}" @click="changeSort('default')">
        <text>默认</text>
      </view>
      <view class="filter-item" :class="{active: sortType === 'sales'}" @click="changeSort('sales')">
        <text>销量</text>
      </view>
      <view class="filter-item price-filter" @click="changeSort('price')">
        <text>价格</text>
        <view class="sort-icon">
          <u-icon :name="sortType === 'price_asc' ? 'arrow-up-fill' : 'arrow-up'" size="12" color="#999"></u-icon>
          <u-icon :name="sortType === 'price_desc' ? 'arrow-down-fill' : 'arrow-down'" size="12" color="#999"></u-icon>
        </view>
      </view>
      <view class="filter-item" @click="showPriceFilter = true">
        <text>筛选</text>
        <u-icon name="filter" size="14"></u-icon>
      </view>
    </view>
    
    <!-- 商品列表 - 不规则网格布局 -->
    <view class="products-grid">
      <view 
        class="product-card" 
        v-for="(item, index) in goodsList" 
        :key="item.id" 
        @click="goToDetail(item)"
        :class="{'featured': index % 5 === 0}"
      >
        <view class="product-image-container">
          <image :src="item.image" mode="aspectFill" class="product-image"></image>
          <view class="product-tags" v-if="item.tags && item.tags.length">
            <text class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">{{tag}}</text>
          </view>
        </view>
        <view class="product-info">
          <text class="product-name">{{ item.name }}</text>
          <view class="product-meta">
            <text class="product-price">¥{{ item.price }}</text>
            <text class="product-sales">{{ item.sales || 0 }} 已售</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 加载更多 -->
    <view class="load-more">
      <u-loadmore :status="loadStatus" />
    </view>
    
    <!-- 价格筛选弹窗 - 现代风格 -->
    <u-popup v-model="showPriceFilter" mode="bottom" height="400">
      <view class="price-filter-panel">
        <view class="panel-header">
          <text class="panel-title">价格区间</text>
          <u-icon name="close" size="28" @click="showPriceFilter = false"></u-icon>
        </view>
        
        <view class="price-input-range">
          <input type="number" v-model="minPrice" placeholder="Min" />
          <view class="range-divider"></view>
          <input type="number" v-model="maxPrice" placeholder="Max" />
        </view>
        
        <view class="quick-ranges">
          <view 
            class="range-chip" 
            v-for="(range, index) in priceRanges" 
            :key="index" 
            @click="selectPriceRange(range)"
          >
            {{range.text}}
          </view>
        </view>
        
        <view class="panel-actions">
          <u-button plain @click="resetFilter">取消</u-button>
          <u-button type="primary" @click="confirmFilter">确定</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      currentCategory: null,
      categories: [
        { id: 1, name: '全部' },
        { id: 2, name: '手机数码' },
        { id: 3, name: '服饰鞋包' },
        { id: 4, name: '食品生鲜' },
        { id: 5, name: '家居家装' }
      ],
      goodsList: [],
      page: 1,
      loadStatus: 'loadmore',
      sortType: 'default',
      showPriceFilter: false,
      minPrice: '',
      maxPrice: '',
      priceRanges: [
        { text: '0-100', min: 0, max: 100 },
        { text: '100-500', min: 100, max: 500 },
        { text: '500-1000', min: 500, max: 1000 },
        { text: '1000+', min: 1000, max: 999999 }
      ],
      filterPrice: null
    }
  },
  onLoad(options) {
  // 处理从首页传递的参数
  // 从本地存储中获取分类信息
  const categoryInfo = uni.getStorageSync('currentCategory')
  if (categoryInfo) {
    this.currentCategory = categoryInfo.id
    // 使用完后清除存储的分类信息
    uni.removeStorageSync('currentCategory')
  } else if (options.categoryId) {
    this.currentCategory = parseInt(options.categoryId)
  }
  
  // 从本地存储中获取搜索关键词
  const keyword = uni.getStorageSync('searchKeyword')
  if (keyword) {
    this.keyword = keyword
    // 使用完后清除存储的关键词
    uni.removeStorageSync('searchKeyword')
  } else if (options.keyword) {
    this.keyword = options.keyword
  }
  
  this.loadGoodsList()
},
  onReachBottom() {
    if (this.loadStatus === 'loadmore') {
      this.page++
      this.loadGoodsList()
    }
  },
  methods: {
    async loadGoodsList() {
      try {
        // 模拟商品数据
        let mockGoods = Array(10).fill().map((_, index) => ({
          id: this.page * 10 + index,
          name: `商品 ${this.page * 10 + index}`,
          price: Math.floor(Math.random() * 1000 + 100),
          image: '/static/logo.png',
          sales: Math.floor(Math.random() * 500),
          tags: this.generateRandomTags(),
          categoryId: Math.floor(Math.random() * 8) + 1 // 随机分配分类ID
        }))
        
        // 应用分类筛选
        if (this.currentCategory && this.currentCategory !== 1) { // 1是全部分类
          mockGoods = mockGoods.filter(item => item.categoryId === this.currentCategory)
        }
        
        // 应用价格筛选
        if (this.filterPrice) {
          mockGoods = mockGoods.filter(item => 
            item.price >= this.filterPrice.min && item.price <= this.filterPrice.max
          )
        }
        
        // 应用排序
        mockGoods = this.applySorting(mockGoods)
        
        if (this.page === 1) {
          this.goodsList = mockGoods
        } else {
          this.goodsList = [...this.goodsList, ...mockGoods]
        }
        
        this.loadStatus = mockGoods.length < 10 ? 'nomore' : 'loadmore'
      } catch (error) {
        this.loadStatus = 'loadmore'
        uni.showToast({
          title: '加载失败',
          icon: 'none'
        })
      }
    },
    
    // 生成随机标签
    generateRandomTags() {
      const allTags = ['NEW', 'HOT', 'SALE', 'LIMITED', 'FREE SHIP']
      const tags = []
      const count = Math.floor(Math.random() * 3) // 0-2个标签
      
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * allTags.length)
        if (!tags.includes(allTags[randomIndex])) {
          tags.push(allTags[randomIndex])
        }
      }
      
      return tags
    },
    
    // 应用排序
    applySorting(goods) {
      switch(this.sortType) {
        case 'sales':
          return goods.sort((a, b) => b.sales - a.sales)
        case 'price_asc':
          return goods.sort((a, b) => a.price - b.price)
        case 'price_desc':
          return goods.sort((a, b) => b.price - a.price)
        default:
          return goods
      }
    },
    handleSearch() {
      this.page = 1
      this.loadGoodsList()
    },
    selectCategory(category) {
      this.currentCategory = category.id
      this.page = 1
      this.loadGoodsList()
    },
    goToDetail(goods) {
      uni.navigateTo({
        url: `/pages/goods/detail?id=${goods.id}`
      })
    },
    
    // 改变排序方式
    changeSort(type) {
      if (type === 'price') {
        // 价格排序特殊处理，点击一次升序，再点击一次降序
        if (this.sortType === 'price_asc') {
          this.sortType = 'price_desc'
        } else {
          this.sortType = 'price_asc'
        }
      } else {
        this.sortType = type
      }
      
      this.page = 1
      this.loadGoodsList()
    },
    
    // 选择价格区间
    selectPriceRange(range) {
      this.minPrice = range.min
      this.maxPrice = range.max
    },
    
    // 确认价格筛选
    confirmFilter() {
      const min = Number(this.minPrice) || 0
      const max = Number(this.maxPrice) || 999999
      
      this.filterPrice = { min, max }
      this.showPriceFilter = false
      this.page = 1
      this.loadGoodsList()
    },
    
    // 重置价格筛选
    resetFilter() {
      this.minPrice = ''
      this.maxPrice = ''
      this.filterPrice = null
      this.page = 1
      this.loadGoodsList()
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list-container {
  background-color: #f9f9f9;
  min-height: 100vh;
  
  // 搜索区域
  .search-section {
    padding: 30rpx;
    background-color: #fff;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }
  
  // 分类导航
  .category-scroll {
    background-color: #fff;
    white-space: nowrap;
    padding: 20rpx 0;
    margin-bottom: 20rpx;
    
    .category-container {
      display: inline-flex;
      padding: 0 20rpx;
      
      .category-item {
        padding: 12rpx 30rpx;
        margin-right: 20rpx;
        border-radius: 40rpx;
        font-size: 26rpx;
        font-weight: 500;
        letter-spacing: 2rpx;
        color: #333;
        background-color: #f0f0f0;
        transition: all 0.3s;
        
        &.active {
          color: #fff;
          background-color: #000;
          box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.2);
        }
        
        &:last-child {
          margin-right: 20rpx;
        }
      }
    }
  }
  
  // 筛选工具栏
  .filter-toolbar {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20rpx 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
    
    .filter-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 500;
      letter-spacing: 1rpx;
      color: #666;
      position: relative;
      padding: 10rpx 0;
      transition: all 0.3s;
      
      &.active {
        color: #000;
        font-weight: bold;
      }
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2rpx;
        background-color: transparent;
        transform: scaleX(0);
        transition: all 0.3s;
      }
      
      &.active:after {
        background-color: #000;
        transform: scaleX(0.5);
      }
      
      .sort-icon {
        display: flex;
        flex-direction: column;
        margin-left: 8rpx;
      }
    }
  }
  
  // 商品网格布局
  .products-grid {
    padding: 0 20rpx 30rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    .product-card {
      width: 345rpx;
      margin-bottom: 30rpx;
      background-color: #fff;
      border-radius: 16rpx;
      overflow: hidden;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
      transition: all 0.3s;
      
      &.featured {
        width: 100%;
        
        .product-image {
          height: 400rpx;
        }
        
        .product-name {
          font-size: 32rpx;
        }
      }
      
      &:hover {
        transform: translateY(-6rpx);
        box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.1);
      }
      
      .product-image-container {
        position: relative;
        
        .product-image {
          width: 100%;
          height: 345rpx;
          transition: all 0.5s;
        }
        
        .product-tags {
          position: absolute;
          top: 16rpx;
          left: 16rpx;
          display: flex;
          flex-wrap: wrap;
          
          .tag {
            font-size: 20rpx;
            color: #fff;
            background-color: #000;
            padding: 4rpx 12rpx;
            border-radius: 4rpx;
            margin-right: 8rpx;
            margin-bottom: 8rpx;
            font-weight: 500;
            letter-spacing: 1rpx;
          }
        }
      }
      
      .product-info {
        padding: 20rpx;
        
        .product-name {
          font-size: 28rpx;
          color: #333;
          font-weight: 500;
          margin-bottom: 12rpx;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .product-price {
            font-size: 32rpx;
            color: #000;
            font-weight: bold;
          }
          
          .product-sales {
            font-size: 22rpx;
            color: #999;
          }
        }
      }
    }
  }
  
  // 加载更多
  .load-more {
    padding: 20rpx 0 40rpx;
  }
  
  // 价格筛选面板
  .price-filter-panel {
    padding: 40rpx 30rpx;
    
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      
      .panel-title {
        font-size: 32rpx;
        font-weight: bold;
        letter-spacing: 2rpx;
      }
    }
    
    .price-input-range {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      
      input {
        flex: 1;
        height: 80rpx;
        border: 2rpx solid #eee;
        border-radius: 8rpx;
        padding: 0 20rpx;
        text-align: center;
        font-size: 28rpx;
      }
      
      .range-divider {
        width: 40rpx;
        height: 2rpx;
        background-color: #ddd;
        margin: 0 20rpx;
      }
    }
    
    .quick-ranges {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40rpx;
      
      .range-chip {
        padding: 12rpx 24rpx;
        border: 2rpx solid #eee;
        border-radius: 40rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        font-size: 24rpx;
        color: #666;
        transition: all 0.3s;
        
        &:active {
          background-color: #000;
          color: #fff;
          border-color: #000;
        }
      }
    }
    
    .panel-actions {
      display: flex;
      justify-content: space-between;
      
      button {
        width: 48%;
        letter-spacing: 2rpx;
        font-weight: 500;
      }
    }
  }
}
</style>