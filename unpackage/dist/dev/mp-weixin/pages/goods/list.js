"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      keyword: "",
      currentCategory: null,
      categories: [
        { id: 1, name: "全部" },
        { id: 2, name: "手机数码" },
        { id: 3, name: "服饰鞋包" },
        { id: 4, name: "食品生鲜" },
        { id: 5, name: "家居家装" }
      ],
      goodsList: [],
      page: 1,
      loadStatus: "loadmore",
      sortType: "default",
      showPriceFilter: false,
      minPrice: "",
      maxPrice: "",
      priceRanges: [
        { text: "0-100", min: 0, max: 100 },
        { text: "100-500", min: 100, max: 500 },
        { text: "500-1000", min: 500, max: 1e3 },
        { text: "1000+", min: 1e3, max: 999999 }
      ],
      filterPrice: null
    };
  },
  onLoad(options) {
    const categoryInfo = common_vendor.index.getStorageSync("currentCategory");
    if (categoryInfo) {
      this.currentCategory = categoryInfo.id;
      common_vendor.index.removeStorageSync("currentCategory");
    } else if (options.categoryId) {
      this.currentCategory = parseInt(options.categoryId);
    }
    const keyword = common_vendor.index.getStorageSync("searchKeyword");
    if (keyword) {
      this.keyword = keyword;
      common_vendor.index.removeStorageSync("searchKeyword");
    } else if (options.keyword) {
      this.keyword = options.keyword;
    }
    this.loadGoodsList();
  },
  onReachBottom() {
    if (this.loadStatus === "loadmore") {
      this.page++;
      this.loadGoodsList();
    }
  },
  methods: {
    async loadGoodsList() {
      try {
        let mockGoods = Array(10).fill().map((_, index) => ({
          id: this.page * 10 + index,
          name: `商品 ${this.page * 10 + index}`,
          price: Math.floor(Math.random() * 1e3 + 100),
          image: "/static/logo.png",
          sales: Math.floor(Math.random() * 500),
          tags: this.generateRandomTags(),
          categoryId: Math.floor(Math.random() * 8) + 1
          // 随机分配分类ID
        }));
        if (this.currentCategory && this.currentCategory !== 1) {
          mockGoods = mockGoods.filter((item) => item.categoryId === this.currentCategory);
        }
        if (this.filterPrice) {
          mockGoods = mockGoods.filter(
            (item) => item.price >= this.filterPrice.min && item.price <= this.filterPrice.max
          );
        }
        mockGoods = this.applySorting(mockGoods);
        if (this.page === 1) {
          this.goodsList = mockGoods;
        } else {
          this.goodsList = [...this.goodsList, ...mockGoods];
        }
        this.loadStatus = mockGoods.length < 10 ? "nomore" : "loadmore";
      } catch (error) {
        this.loadStatus = "loadmore";
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    },
    // 生成随机标签
    generateRandomTags() {
      const allTags = ["NEW", "HOT", "SALE", "LIMITED", "FREE SHIP"];
      const tags = [];
      const count = Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * allTags.length);
        if (!tags.includes(allTags[randomIndex])) {
          tags.push(allTags[randomIndex]);
        }
      }
      return tags;
    },
    // 应用排序
    applySorting(goods) {
      switch (this.sortType) {
        case "sales":
          return goods.sort((a, b) => b.sales - a.sales);
        case "price_asc":
          return goods.sort((a, b) => a.price - b.price);
        case "price_desc":
          return goods.sort((a, b) => b.price - a.price);
        default:
          return goods;
      }
    },
    handleSearch() {
      this.page = 1;
      this.loadGoodsList();
    },
    selectCategory(category) {
      this.currentCategory = category.id;
      this.page = 1;
      this.loadGoodsList();
    },
    goToDetail(goods) {
      common_vendor.index.navigateTo({
        url: `/pages/goods/detail?id=${goods.id}`
      });
    },
    // 改变排序方式
    changeSort(type) {
      if (type === "price") {
        if (this.sortType === "price_asc") {
          this.sortType = "price_desc";
        } else {
          this.sortType = "price_asc";
        }
      } else {
        this.sortType = type;
      }
      this.page = 1;
      this.loadGoodsList();
    },
    // 选择价格区间
    selectPriceRange(range) {
      this.minPrice = range.min;
      this.maxPrice = range.max;
    },
    // 确认价格筛选
    confirmFilter() {
      const min = Number(this.minPrice) || 0;
      const max = Number(this.maxPrice) || 999999;
      this.filterPrice = { min, max };
      this.showPriceFilter = false;
      this.page = 1;
      this.loadGoodsList();
    },
    // 重置价格筛选
    resetFilter() {
      this.minPrice = "";
      this.maxPrice = "";
      this.filterPrice = null;
      this.page = 1;
      this.loadGoodsList();
    }
  }
};
if (!Array) {
  const _component_u_search = common_vendor.resolveComponent("u-search");
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_loadmore = common_vendor.resolveComponent("u-loadmore");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_popup = common_vendor.resolveComponent("u-popup");
  (_component_u_search + _component_u_icon + _component_u_loadmore + _component_u_button + _component_u_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.handleSearch),
    b: common_vendor.o(($event) => $data.keyword = $event),
    c: common_vendor.p({
      placeholder: "SEARCH PRODUCTS",
      shape: "round",
      modelValue: $data.keyword
    }),
    d: common_vendor.f($data.categories, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: common_vendor.o(($event) => $options.selectCategory(item), item.id),
        d: $data.currentCategory === item.id ? 1 : ""
      };
    }),
    e: $data.sortType === "default" ? 1 : "",
    f: common_vendor.o(($event) => $options.changeSort("default")),
    g: $data.sortType === "sales" ? 1 : "",
    h: common_vendor.o(($event) => $options.changeSort("sales")),
    i: common_vendor.p({
      name: $data.sortType === "price_asc" ? "arrow-up-fill" : "arrow-up",
      size: "12",
      color: "#999"
    }),
    j: common_vendor.p({
      name: $data.sortType === "price_desc" ? "arrow-down-fill" : "arrow-down",
      size: "12",
      color: "#999"
    }),
    k: common_vendor.o(($event) => $options.changeSort("price")),
    l: common_vendor.p({
      name: "filter",
      size: "14"
    }),
    m: common_vendor.o(($event) => $data.showPriceFilter = true),
    n: common_vendor.f($data.goodsList, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.tags && item.tags.length
      }, item.tags && item.tags.length ? {
        c: common_vendor.f(item.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        })
      } : {}, {
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.price),
        f: common_vendor.t(item.sales || 0),
        g: item.id,
        h: common_vendor.o(($event) => $options.goToDetail(item), item.id),
        i: index % 5 === 0 ? 1 : ""
      });
    }),
    o: common_vendor.p({
      status: $data.loadStatus
    }),
    p: common_vendor.o(($event) => $data.showPriceFilter = false),
    q: common_vendor.p({
      name: "close",
      size: "28"
    }),
    r: $data.minPrice,
    s: common_vendor.o(($event) => $data.minPrice = $event.detail.value),
    t: $data.maxPrice,
    v: common_vendor.o(($event) => $data.maxPrice = $event.detail.value),
    w: common_vendor.f($data.priceRanges, (range, index, i0) => {
      return {
        a: common_vendor.t(range.text),
        b: index,
        c: common_vendor.o(($event) => $options.selectPriceRange(range), index)
      };
    }),
    x: common_vendor.o($options.resetFilter),
    y: common_vendor.p({
      plain: true
    }),
    z: common_vendor.o($options.confirmFilter),
    A: common_vendor.p({
      type: "primary"
    }),
    B: common_vendor.o(($event) => $data.showPriceFilter = $event),
    C: common_vendor.p({
      mode: "bottom",
      height: "400",
      modelValue: $data.showPriceFilter
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7f2f18c6"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/goods/list.js.map
