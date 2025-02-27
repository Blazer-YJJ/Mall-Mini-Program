/*
 * @Author: JingChengCool jingchengcool@outlook.com
 * @Date: 2025-02-28 01:51:13
 * @LastEditors: JingChengCool jingchengcool@outlook.com
 * @LastEditTime: 2025-02-28 04:48:26
 * @FilePath: \Mall-Mini-Program\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'

const store = createStore({
  state: {
    // 用户信息
    userInfo: uni.getStorageSync('userInfo') || null,
    // 购物车数据
    cartList: uni.getStorageSync('cartList') || [],
    // 收货地址列表
    addressList: uni.getStorageSync('addressList') || []
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorageSync('userInfo', userInfo)
    },
    // 添加商品到购物车
    addToCart(state, goods) {
      const index = state.cartList.findIndex(item => item.id === goods.id)
      if (index > -1) {
        state.cartList[index].count += 1
      } else {
        state.cartList.push({
          ...goods,
          count: 1,
          checked: true
        })
      }
      uni.setStorageSync('cartList', state.cartList)
    },
    // 更新购物车商品数量
    updateCartCount(state, { id, count }) {
      const index = state.cartList.findIndex(item => item.id === id)
      if (index > -1) {
        state.cartList[index].count = count
      }
      uni.setStorageSync('cartList', state.cartList)
    },
    // 删除购物车商品
    removeFromCart(state, id) {
      const index = state.cartList.findIndex(item => item.id === id)
      if (index > -1) {
        state.cartList.splice(index, 1)
      }
      uni.setStorageSync('cartList', state.cartList)
    },
    // 设置收货地址列表
    setAddressList(state, addressList) {
      state.addressList = addressList
      uni.setStorageSync('addressList', addressList)
    },
    // 更新购物车商品选中状态
    updateCartItemChecked(state, { id, checked }) {
      const index = state.cartList.findIndex(item => item.id === id)
      if (index > -1) {
        state.cartList[index].checked = checked
      }
      uni.setStorageSync('cartList', state.cartList)
    },
    // 更新所有购物车商品的选中状态
    updateAllCartItemsChecked(state, checked) {
      state.cartList.forEach(item => {
        item.checked = checked
      })
      uni.setStorageSync('cartList', state.cartList)
    }
  },
  actions: {
    // 异步操作可以在这里处理
    // 初始化应用数据
    initAppData({ commit }) {
      // 从本地存储加载数据
      const userInfo = uni.getStorageSync('userInfo')
      const cartList = uni.getStorageSync('cartList')
      const addressList = uni.getStorageSync('addressList')
      
      if (userInfo) commit('setUserInfo', userInfo)
      if (cartList) {
        // 直接更新购物车数据，而不是使用不存在的setCartList mutation
        cartList.forEach(item => {
          commit('addToCart', item)
        })
      }
      if (addressList) commit('setAddressList', addressList)
    }
  },
  getters: {
    // 购物车商品总数
    cartCount: state => {
      return state.cartList.reduce((total, item) => total + item.count, 0)
    },
    // 购物车商品总价
    cartTotal: state => {
      return state.cartList.reduce((total, item) => total + item.price * item.count, 0)
    }
  }
})

export default store