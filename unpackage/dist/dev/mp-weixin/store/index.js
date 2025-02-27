"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    // 用户信息
    userInfo: common_vendor.index.getStorageSync("userInfo") || null,
    // 购物车数据
    cartList: common_vendor.index.getStorageSync("cartList") || [],
    // 收货地址列表
    addressList: common_vendor.index.getStorageSync("addressList") || []
  },
  mutations: {
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      common_vendor.index.setStorageSync("userInfo", userInfo);
    },
    // 添加商品到购物车
    addToCart(state, goods) {
      const index = state.cartList.findIndex((item) => item.id === goods.id);
      if (index > -1) {
        state.cartList[index].count += 1;
      } else {
        state.cartList.push({
          ...goods,
          count: 1,
          checked: true
        });
      }
      common_vendor.index.setStorageSync("cartList", state.cartList);
    },
    // 更新购物车商品数量
    updateCartCount(state, { id, count }) {
      const index = state.cartList.findIndex((item) => item.id === id);
      if (index > -1) {
        state.cartList[index].count = count;
      }
      common_vendor.index.setStorageSync("cartList", state.cartList);
    },
    // 删除购物车商品
    removeFromCart(state, id) {
      const index = state.cartList.findIndex((item) => item.id === id);
      if (index > -1) {
        state.cartList.splice(index, 1);
      }
      common_vendor.index.setStorageSync("cartList", state.cartList);
    },
    // 设置收货地址列表
    setAddressList(state, addressList) {
      state.addressList = addressList;
      common_vendor.index.setStorageSync("addressList", addressList);
    },
    // 更新购物车商品选中状态
    updateCartItemChecked(state, { id, checked }) {
      const index = state.cartList.findIndex((item) => item.id === id);
      if (index > -1) {
        state.cartList[index].checked = checked;
      }
      common_vendor.index.setStorageSync("cartList", state.cartList);
    },
    // 更新所有购物车商品的选中状态
    updateAllCartItemsChecked(state, checked) {
      state.cartList.forEach((item) => {
        item.checked = checked;
      });
      common_vendor.index.setStorageSync("cartList", state.cartList);
    }
  },
  actions: {
    // 异步操作可以在这里处理
    // 初始化应用数据
    initAppData({ commit }) {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const cartList = common_vendor.index.getStorageSync("cartList");
      const addressList = common_vendor.index.getStorageSync("addressList");
      if (userInfo)
        commit("setUserInfo", userInfo);
      if (cartList) {
        cartList.forEach((item) => {
          commit("addToCart", item);
        });
      }
      if (addressList)
        commit("setAddressList", addressList);
    }
  },
  getters: {
    // 购物车商品总数
    cartCount: (state) => {
      return state.cartList.reduce((total, item) => total + item.count, 0);
    },
    // 购物车商品总价
    cartTotal: (state) => {
      return state.cartList.reduce((total, item) => total + item.price * item.count, 0);
    }
  }
});
exports.store = store;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/index.js.map
