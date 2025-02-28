"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      searchKeyword: "",
      banners: [
        { image: "/static/banner/1.png", title: "夏季系列", subtitle: "探索最新潮流" },
        { image: "/static/banner/2.png", title: "新品上市", subtitle: "抢先选购" },
        { image: "/static/banner/3.png", title: "特别优惠", subtitle: "限时折扣" }
      ],
      categories: [
        { id: 1, name: "手机数码", icon: "/static/category/digital.png" },
        { id: 2, name: "服装鞋包", icon: "/static/category/clothing.png" },
        { id: 3, name: "食品生鲜", icon: "/static/category/food.png" },
        { id: 4, name: "家居家装", icon: "/static/category/furniture.png" }
      ],
      goodsList: [],
      featuredProduct: null
    };
  },
  onLoad() {
    this.loadGoodsList();
  },
  methods: {
    async loadGoodsList() {
      try {
        this.goodsList = Array(6).fill().map((_, index) => ({
          id: index + 1,
          name: `精品商品 ${index + 1}`,
          price: Math.floor(Math.random() * 1e3 + 100),
          image: "/static/logo.png"
        }));
        this.featuredProduct = {
          id: 999,
          name: "特色系列",
          price: 899,
          image: "/static/banner/1.png"
        };
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    },
    handleSearch() {
      common_vendor.index.switchTab({
        url: "/pages/goods/list"
      });
      common_vendor.index.setStorageSync("searchKeyword", this.searchKeyword);
    },
    goToCategory(category) {
      common_vendor.index.switchTab({
        url: "/pages/goods/list"
      });
      common_vendor.index.setStorageSync("currentCategory", {
        id: category.id,
        name: category.name
      });
    },
    goToGoodsList() {
      common_vendor.index.switchTab({
        url: "/pages/goods/list"
      });
    },
    goToDetail(goods) {
      common_vendor.index.navigateTo({
        url: `/pages/goods/detail?id=${goods.id}`
      });
    },
    goToAbout() {
      common_vendor.index.navigateTo({
        url: "/pages/about/index"
      });
    }
  }
};
if (!Array) {
  const _component_u_search = common_vendor.resolveComponent("u-search");
  _component_u_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleSearch),
    b: common_vendor.o(($event) => $data.searchKeyword = $event),
    c: common_vendor.p({
      placeholder: "探索商品",
      shape: "circle",
      modelValue: $data.searchKeyword
    }),
    d: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title || "流行趋势"),
        c: common_vendor.t(item.subtitle || "探索我们的精选系列"),
        d: index
      };
    }),
    e: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: index,
        d: common_vendor.o(($event) => $options.goToCategory(item), index)
      };
    }),
    f: $data.featuredProduct
  }, $data.featuredProduct ? {
    g: $data.featuredProduct.image,
    h: common_vendor.t($data.featuredProduct.name),
    i: common_vendor.t($data.featuredProduct.price),
    j: common_vendor.o(($event) => $options.goToDetail($data.featuredProduct))
  } : {}, {
    k: common_vendor.o((...args) => $options.goToGoodsList && $options.goToGoodsList(...args)),
    l: common_vendor.f($data.goodsList, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: index === 0
      }, index === 0 ? {} : index === 1 ? {} : {}, {
        c: index === 1,
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.price),
        f: index,
        g: common_vendor.o(($event) => $options.goToDetail(item), index)
      });
    }),
    m: common_assets._imports_0,
    n: common_vendor.o((...args) => $options.goToAbout && $options.goToAbout(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
