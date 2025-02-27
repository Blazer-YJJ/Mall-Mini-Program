<template>
  <view class="goods-list-container">
    <view class="search-box">
      <u-search v-model="keyword" placeholder="搜索商品" @search="handleSearch" />
    </view>
    <view class="category-box">
      <scroll-view scroll-x class="category-scroll">
        <view class="category-item" v-for="item in categories" :key="item.id" @click="selectCategory(item)" :class="{active: currentCategory === item.id}">
          {{ item.name }}
        </view>
      </scroll-view>
    </view>
    <view class="filter-box">
      <view class="filter-item" :class="{active: sortType === 'default'}" @click="changeSort('default')">
        <text>默认</text>
      </view>
      <view class="filter-item" :class="{active: sortType === 'sales'}" @click="changeSort('sales')">
        <text>销量</text>
      </view>
      <view class="filter-item" @click="changeSort('price')">
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
    <view class="goods-list">
      <view class="goods-item" v-for="item in goodsList" :key="item.id" @click="goToDetail(item)">
        <image :src="item.image" mode="aspectFill" class="goods-image"></image>
        <view class="goods-info">
          <view class="tags" v-if="item.tags && item.tags.length">
            <text class="tag" v-for="(tag, index) in item.tags" :key="index">{{tag}}</text>
          </view>
          <text class="goods-name">{{ item.name }}</text>
          <view class="price-box">
            <text class="goods-price">¥{{ item.price }}</text>
            <text class="goods-sales">已售{{item.sales || 0}}件</text>
          </view>
        </view>
      </view>
    </view>
    <u-loadmore :status="loadStatus" />
    
    <!-- 价格筛选弹窗 -->
    <u-popup v-model="showPriceFilter" mode="bottom" height="300">
      <view class="price-filter">
        <view class="filter-header">
          <text>价格区间</text>
          <u-icon name="close" @click="showPriceFilter = false"></u-icon>
        </view>
        <view class="price-range">
          <input type="number" v-model="minPrice" placeholder="最低价" />
          <text>-</text>
          <input type="number" v-model="maxPrice" placeholder="最高价" />
        </view>
        <view class="quick-range">
          <view class="range-item" v-for="(range, index) in priceRanges" :key="index" @click="selectPriceRange(range)">
            {{range.text}}
          </view>
        </view>
        <view class="filter-btns">
          <u-button @click="resetFilter">重置</u-button>
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
        { id: 3, name: '家用电器' },
        { id: 4, name: '服装鞋包' },
        { id: 5, name: '食品生鲜' },
        { id: 6, name: '美妆个护' },
        { id: 7, name: '母婴玩具' },
        { id: 8, name: '家居日用' }
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
        { text: '1000以上', min: 1000, max: 999999 }
      ],
      filterPrice: null
    }
  },
  onLoad() {
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
          name: `商品${this.page * 10 + index}`,
          price: Math.floor(Math.random() * 1000 + 100),
          image: '/static/logo.png',
          sales: Math.floor(Math.random() * 500),
          tags: this.generateRandomTags()
        }))
        
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
      const allTags = ['新品', '热销', '促销', '限时', '包邮', '满减']
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
  .search-box {
    padding: 20rpx;
    background-color: #fff;
  }
  .category-box {
    background-color: #fff;
    padding: 20rpx 0;
    .category-scroll {
      white-space: nowrap;
      .category-item {
        display: inline-block;
        padding: 10rpx 30rpx;
        margin: 0 20rpx;
        border-radius: 30rpx;
        font-size: 28rpx;
        color: #666;
        background-color: #f5f5f5;
        &.active {
          color: #fff;
          background-color: #2979ff;
        }
      }
    }
  }
  .filter-box {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20rpx;
    margin-bottom: 20rpx;
    border-bottom: 1rpx solid #f5f5f5;
    
    .filter-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      color: #666;
      position: relative;
      
      &.active {
        color: #2979ff;
        font-weight: bold;
      }
      
      .sort-icon {
        display: flex;
        flex-direction: column;
        margin-left: 6rpx;
      }
    }
  }
  .goods-list {
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
      width: 345rpx;
      margin-bottom: 20rpx;
      background-color: #fff;
      border-radius: 12rpx;
      overflow: hidden;
      .goods-image {
        width: 345rpx;
        height: 345rpx;
      }
      .goods-info {
        padding: 16rpx;
        
        .tags {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10rpx;
          
          .tag {
            font-size: 20rpx;
            color: #ff5500;
            background-color: rgba(255, 85, 0, 0.1);
            padding: 2rpx 10rpx;
            border-radius: 6rpx;
            margin-right: 10rpx;
            margin-bottom: 6rpx;
          }
        }
        
        .goods-name {
          font-size: 28rpx;
          color: #333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        
        .price-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10rpx;
          
          .goods-price {
            font-size: 32rpx;
            color: #ff5500;
            font-weight: bold;
          }
          
          .goods-sales {
            font-size: 22rpx;
            color: #999;
          }
        }
      }
    }
  }
  
  .price-filter {
    padding: 30rpx;
    
    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      font-size: 32rpx;
      font-weight: bold;
    }
    
    .price-range {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      
      input {
        flex: 1;
        height: 70rpx;
        border: 1rpx solid #eee;
        border-radius: 8rpx;
        padding: 0 20rpx;
        text-align: center;
      }
      
      text {
        margin: 0 20rpx;
        color: #999;
      }
    }
    
    .quick-range {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 30rpx;
      
      .range-item {
        width: calc(25% - 15rpx);
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border: 1rpx solid #eee;
        border-radius: 8rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        font-size: 24rpx;
        color: #666;
        
        &:nth-child(4n) {
          margin-right: 0;
        }
        
        &:active {
          background-color: #f0f0f0;
        }
      }
    }
    
    .filter-btns {
      display: flex;
      justify-content: space-between;
      
      button {
        width: 48%;
      }
    }
  }
}
</style>