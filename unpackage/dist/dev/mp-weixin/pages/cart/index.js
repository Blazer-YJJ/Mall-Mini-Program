"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isAllSelected: false,
      // 添加一些模拟数据，用于在没有购物车数据时显示
      mockData: [
        {
          id: 1,
          name: "智能手机 Pro Max",
          price: 5999,
          image: "/static/logo.png",
          count: 1,
          checked: true
        },
        {
          id: 2,
          name: "超薄笔记本电脑",
          price: 8999,
          image: "/static/logo.png",
          count: 1,
          checked: true
        },
        {
          id: 3,
          name: "无线蓝牙耳机",
          price: 999,
          image: "/static/logo.png",
          count: 2,
          checked: false
        }
      ]
    };
  },
  computed: {
    ...common_vendor.mapState(["cartList", "userInfo"]),
    // 如果购物车为空，则使用模拟数据
    displayCartList() {
      return this.cartList && this.cartList.length > 0 ? this.cartList : this.mockData;
    },
    selectedCount() {
      return this.displayCartList.filter((item) => item.checked).length;
    },
    totalPrice() {
      return this.displayCartList.filter((item) => item.checked).reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
    }
  },
  onShow() {
    this.updateSelection();
  },
  methods: {
    ...common_vendor.mapMutations(["updateCartCount", "removeFromCart", "updateCartItemChecked", "updateAllCartItemsChecked"]),
    goToHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    updateSelection() {
      this.isAllSelected = this.displayCartList.length > 0 && this.displayCartList.every((item) => item.checked);
    },
    toggleSelectAll(value) {
      this.updateAllCartItemsChecked(value);
      this.displayCartList.forEach((item) => {
        item.checked = value;
      });
    },
    updateCount(id, count) {
      this.updateCartCount({ id, count });
    },
    removeItem(id) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该商品吗？",
        success: (res) => {
          if (res.confirm) {
            this.removeFromCart(id);
          }
        }
      });
    },
    checkout() {
      if (!this.userInfo) {
        common_vendor.index.navigateTo({
          url: "/pages/user/login"
        });
        return;
      }
      if (this.selectedCount === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      const selectedGoods = this.displayCartList.filter((item) => item.checked);
      common_vendor.index.navigateTo({
        url: `/pages/order/create?goods=${JSON.stringify(selectedGoods)}`
      });
    }
  }
};
if (!Array) {
  const _component_u_empty = common_vendor.resolveComponent("u-empty");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_checkbox = common_vendor.resolveComponent("u-checkbox");
  const _component_u_number_box = common_vendor.resolveComponent("u-number-box");
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  (_component_u_empty + _component_u_button + _component_u_checkbox + _component_u_number_box + _component_u_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.cartList.length === 0
  }, _ctx.cartList.length === 0 ? {
    b: common_vendor.p({
      text: "购物车空空如也",
      mode: "cart"
    }),
    c: common_vendor.o($options.goToHome),
    d: common_vendor.p({
      type: "primary"
    })
  } : {
    e: common_vendor.f(_ctx.cartList, (item, k0, i0) => {
      return {
        a: common_vendor.o($options.updateSelection, item.id),
        b: "8039fbf1-2-" + i0,
        c: common_vendor.o(($event) => item.checked = $event, item.id),
        d: common_vendor.p({
          modelValue: item.checked
        }),
        e: item.image,
        f: common_vendor.t(item.name),
        g: common_vendor.t(item.price),
        h: common_vendor.o((value) => $options.updateCount(item.id, value), item.id),
        i: "8039fbf1-3-" + i0,
        j: common_vendor.o(($event) => item.count = $event, item.id),
        k: common_vendor.p({
          modelValue: item.count
        }),
        l: common_vendor.o(($event) => $options.removeItem(item.id), item.id),
        m: "8039fbf1-4-" + i0,
        n: item.id
      };
    }),
    f: common_vendor.p({
      name: "trash",
      size: "40"
    }),
    g: common_vendor.o($options.toggleSelectAll),
    h: common_vendor.o(($event) => $data.isAllSelected = $event),
    i: common_vendor.p({
      modelValue: $data.isAllSelected
    }),
    j: common_vendor.t($options.totalPrice),
    k: common_vendor.t($options.selectedCount),
    l: common_vendor.o($options.checkout),
    m: common_vendor.p({
      type: "primary"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8039fbf1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/cart/index.js.map
