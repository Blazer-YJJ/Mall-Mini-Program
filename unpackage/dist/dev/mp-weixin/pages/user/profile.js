"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  computed: {
    ...common_vendor.mapState(["userInfo"])
  },
  methods: {
    ...common_vendor.mapMutations(["setUserInfo"]),
    goToOrders() {
      if (!this.userInfo) {
        this.checkLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/order/list"
      });
    },
    goToAddress() {
      if (!this.userInfo) {
        this.checkLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/user/address"
      });
    },
    goToAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/index"
      });
    },
    checkLogin() {
      common_vendor.index.showToast({
        title: "请先登录",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/user/login"
        });
      }, 1500);
    },
    handleLogout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            this.setUserInfo(null);
            common_vendor.index.showToast({
              title: "已退出登录",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_u_cell = common_vendor.resolveComponent("u-cell");
  const _component_u_cell_group = common_vendor.resolveComponent("u-cell-group");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_cell + _component_u_cell_group + _component_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$1,
    b: common_vendor.t(_ctx.userInfo ? _ctx.userInfo.nickname : "未登录"),
    c: _ctx.userInfo
  }, _ctx.userInfo ? {
    d: common_vendor.t(_ctx.userInfo.phone)
  } : {}, {
    e: common_vendor.o($options.goToOrders),
    f: common_vendor.p({
      title: "我的订单",
      icon: "shopping-cart",
      ["is-link"]: true
    }),
    g: common_vendor.o($options.goToAddress),
    h: common_vendor.p({
      title: "收货地址",
      icon: "map",
      ["is-link"]: true
    }),
    i: common_vendor.o($options.goToAbout),
    j: common_vendor.p({
      title: "关于我们",
      icon: "info-circle",
      ["is-link"]: true
    }),
    k: _ctx.userInfo
  }, _ctx.userInfo ? {
    l: common_vendor.o($options.handleLogout),
    m: common_vendor.p({
      type: "error"
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-036958a5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/profile.js.map
