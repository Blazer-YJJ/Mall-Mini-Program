"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goodsInfo: {
        id: 0,
        name: "",
        price: 0,
        desc: "",
        detail: "",
        images: ["/static/logo.png"]
      }
    };
  },
  computed: {
    ...common_vendor.mapState(["userInfo"]),
    ...common_vendor.mapGetters(["cartCount"])
  },
  onLoad(options) {
    this.loadGoodsDetail(options.id);
  },
  methods: {
    ...common_vendor.mapMutations(["addToCart"]),
    async loadGoodsDetail(id) {
      try {
        this.goodsInfo = {
          id: parseInt(id),
          name: `商品${id}`,
          price: Math.floor(Math.random() * 1e3 + 100),
          desc: "商品描述信息",
          detail: "<div>商品详细介绍</div>",
          images: ["/static/logo.png", "/static/logo.png"]
        };
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    },
    goToCart() {
      common_vendor.index.switchTab({
        url: "/pages/cart/index"
      });
    },
    handleAddToCart() {
      if (!this.userInfo) {
        this.checkLogin();
        return;
      }
      this.addToCart(this.goodsInfo);
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    },
    buyNow() {
      if (!this.userInfo) {
        this.checkLogin();
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/order/create?goodsId=${this.goodsInfo.id}`
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
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_badge = common_vendor.resolveComponent("u-badge");
  (_component_u_icon + _component_u_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsInfo.images, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.t($data.goodsInfo.price),
    c: common_vendor.t($data.goodsInfo.name),
    d: common_vendor.t($data.goodsInfo.desc),
    e: $data.goodsInfo.detail,
    f: common_vendor.p({
      name: "shopping-cart",
      size: "40"
    }),
    g: common_vendor.p({
      count: _ctx.cartCount,
      type: "error",
      offset: [0, -10]
    }),
    h: common_vendor.o((...args) => $options.goToCart && $options.goToCart(...args)),
    i: common_vendor.o((...args) => $options.handleAddToCart && $options.handleAddToCart(...args)),
    j: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-adbe0a1d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/goods/detail.js.map
