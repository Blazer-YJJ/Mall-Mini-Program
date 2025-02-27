<template>
  <view class="address-container">
    <!-- 地址列表 -->
    <view class="address-list" v-if="addressList.length > 0">
      <view 
        class="address-item" 
        v-for="(item, index) in addressList" 
        :key="index"
        @click="selectMode ? selectAddress(item) : editAddress(item)"
      >
        <view class="address-info">
          <view class="user-info">
            <text class="name">{{ item.name }}</text>
            <text class="phone">{{ item.phone }}</text>
            <text class="tag" v-if="item.isDefault">默认</text>
          </view>
          <view class="address-detail">
            {{ item.province }} {{ item.city }} {{ item.district }} {{ item.address }}
          </view>
        </view>
        <view class="action-box" @click.stop="showActionSheet(item, index)">
          <u-icon name="more-dot-fill" color="#ccc" size="40"></u-icon>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty" v-else>
      <u-empty text="暂无收货地址" mode="address"></u-empty>
    </view>
    
    <!-- 底部按钮 -->
    <view class="bottom-btn">
      <u-button type="primary" @click="addAddress">新增收货地址</u-button>
    </view>
    
    <!-- 地址编辑弹窗 -->
    <u-popup v-model="showEditPopup" mode="bottom" border-radius="16">
      <view class="popup-content">
        <view class="popup-header">
          <text>{{ editingAddress.id ? '编辑地址' : '新增地址' }}</text>
          <u-icon name="close" @click="showEditPopup = false"></u-icon>
        </view>
        <view class="form-box">
          <u-form :model="editingAddress" ref="uForm">
            <u-form-item label="收货人">
              <u-input v-model="editingAddress.name" placeholder="请输入收货人姓名" />
            </u-form-item>
            <u-form-item label="手机号码">
              <u-input v-model="editingAddress.phone" placeholder="请输入手机号码" />
            </u-form-item>
            <u-form-item label="所在地区">
              <view class="region-select" @click="showRegionPicker = true">
                <text v-if="editingAddress.province">
                  {{ editingAddress.province }} {{ editingAddress.city }} {{ editingAddress.district }}
                </text>
                <text v-else class="placeholder">请选择所在地区</text>
                <u-icon name="arrow-right" color="#ccc"></u-icon>
              </view>
            </u-form-item>
            <u-form-item label="详细地址">
              <u-input v-model="editingAddress.address" placeholder="请输入详细地址" />
            </u-form-item>
            <u-form-item label="设为默认地址">
              <u-switch v-model="editingAddress.isDefault"></u-switch>
            </u-form-item>
          </u-form>
          <view class="btn-group">
            <u-button type="primary" @click="saveAddress">保存</u-button>
          </view>
        </view>
      </view>
    </u-popup>
    
    <!-- 地区选择器 -->
    <u-picker v-model="showRegionPicker" mode="region" @confirm="confirmRegion"></u-picker>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      selectMode: false,
      showEditPopup: false,
      showRegionPicker: false,
      editingAddress: {
        id: null,
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        isDefault: false
      }
    }
  },
  computed: {
    ...mapState(['addressList'])
  },
  onLoad(options) {
    if (options.select) {
      this.selectMode = true
    }
    
    // 如果没有地址数据，添加一些模拟数据
    if (this.addressList.length === 0) {
      this.initMockData()
    }
  },
  methods: {
    ...mapMutations(['setAddressList']),
    initMockData() {
      const mockAddressList = [
        {
          id: 1,
          name: '张三',
          phone: '13800138000',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          address: '科技园南路XX号',
          isDefault: true
        },
        {
          id: 2,
          name: '李四',
          phone: '13900139000',
          province: '广东省',
          city: '广州市',
          district: '天河区',
          address: '天河路XX号',
          isDefault: false
        }
      ]
      this.setAddressList(mockAddressList)
    },
    addAddress() {
      this.editingAddress = {
        id: null,
        name: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        address: '',
        isDefault: false
      }
      this.showEditPopup = true
    },
    editAddress(address) {
      this.editingAddress = JSON.parse(JSON.stringify(address))
      this.showEditPopup = true
    },
    saveAddress() {
      // 简单验证
      if (!this.editingAddress.name) {
        uni.showToast({
          title: '请输入收货人姓名',
          icon: 'none'
        })
        return
      }
      if (!this.editingAddress.phone) {
        uni.showToast({
          title: '请输入手机号码',
          icon: 'none'
        })
        return
      }
      if (!this.editingAddress.province) {
        uni.showToast({
          title: '请选择所在地区',
          icon: 'none'
        })
        return
      }
      if (!this.editingAddress.address) {
        uni.showToast({
          title: '请输入详细地址',
          icon: 'none'
        })
        return
      }
      
      const newAddressList = [...this.addressList]
      
      // 如果设置为默认地址，需要将其他地址设为非默认
      if (this.editingAddress.isDefault) {
        newAddressList.forEach(item => {
          item.isDefault = false
        })
      }
      
      if (this.editingAddress.id) {
        // 编辑现有地址
        const index = newAddressList.findIndex(item => item.id === this.editingAddress.id)
        if (index > -1) {
          newAddressList[index] = this.editingAddress
        }
      } else {
        // 添加新地址
        const newId = newAddressList.length > 0 ? Math.max(...newAddressList.map(item => item.id)) + 1 : 1
        newAddressList.push({
          ...this.editingAddress,
          id: newId
        })
      }
      
      this.setAddressList(newAddressList)
      this.showEditPopup = false
      
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    },
    confirmRegion(e) {
      const { province, city, area } = e
      this.editingAddress.province = province.label
      this.editingAddress.city = city.label
      this.editingAddress.district = area.label
    },
    showActionSheet(address, index) {
      uni.showActionSheet({
        itemList: ['编辑', '删除', address.isDefault ? '取消默认' : '设为默认'],
        success: (res) => {
          switch (res.tapIndex) {
            case 0: // 编辑
              this.editAddress(address)
              break
            case 1: // 删除
              this.deleteAddress(index)
              break
            case 2: // 设为默认/取消默认
              this.toggleDefault(index)
              break
          }
        }
      })
    },
    deleteAddress(index) {
      uni.showModal({
        title: '提示',
        content: '确定要删除该地址吗？',
        success: (res) => {
          if (res.confirm) {
            const newAddressList = [...this.addressList]
            newAddressList.splice(index, 1)
            this.setAddressList(newAddressList)
            
            uni.showToast({
              title: '删除成功',
              icon: 'success'
            })
          }
        }
      })
    },
    toggleDefault(index) {
      const newAddressList = [...this.addressList]
      const isCurrentDefault = newAddressList[index].isDefault
      
      // 如果当前已是默认，则取消默认
      if (isCurrentDefault) {
        newAddressList[index].isDefault = false
      } else {
        // 否则将当前设为默认，其他取消默认
        newAddressList.forEach((item, i) => {
          item.isDefault = i === index
        })
      }
      
      this.setAddressList(newAddressList)
    },
    selectAddress(address) {
      // 在选择模式下，选中地址后返回上一页
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]
      
      // 设置上一页的选中地址
      if (prevPage && prevPage.$vm) {
        prevPage.$vm.selectedAddress = address
      }
      
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.address-container {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding-bottom: 120rpx;
  
  .address-list {
    padding: 20rpx;
    
    .address-item {
      display: flex;
      align-items: center;
      background-color: #fff;
      border-radius: 12rpx;
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
          
          .tag {
            display: inline-block;
            font-size: 20rpx;
            color: #fff;
            background-color: #ff5500;
            padding: 4rpx 10rpx;
            border-radius: 4rpx;
            margin-left: 10rpx;
          }
        }
        
        .address-detail {
          font-size: 28rpx;
          color: #333;
        }
      }
    }
  }
  
  .empty {
    padding: 100rpx 0;
    text-align: center;
  }
  
  .bottom-btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20rpx;
    background-color: #fff;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
  }
  
  .popup-content {
    padding: 30rpx;
    
    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      text {
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    
    .form-box {
      .region-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70rpx;
        
        .placeholder {
          color: #c0c4cc;
        }
      }
      
      .btn-group {
        margin-top: 40rpx;
      }
    }
  }
}
</style>