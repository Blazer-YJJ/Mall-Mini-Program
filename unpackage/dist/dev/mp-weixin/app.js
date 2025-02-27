"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/goods/list.js";
  "./pages/goods/detail.js";
  "./pages/cart/index.js";
  "./pages/user/profile.js";
  "./pages/user/login.js";
  "./pages/user/register.js";
  "./pages/order/create.js";
  "./pages/order/list.js";
  "./pages/user/address.js";
  "./pages/about/index.js";
}
const pages = [
  "pages/index/index",
  "pages/goods/list",
  "pages/goods/detail",
  "pages/cart/index",
  "pages/user/profile",
  "pages/user/login",
  "pages/user/register",
  "pages/order/create",
  "pages/order/list",
  "pages/user/address",
  "pages/about/index"
];
const window = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "商城",
  navigationBarBackgroundColor: "#FFFFFF",
  backgroundColor: "#F8F8F8"
};
const tabBar = {
  color: "#999",
  selectedColor: "#007AFF",
  backgroundColor: "#FFFFFF",
  list: [
    {
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "static/tabbar/home.png",
      selectedIconPath: "static/tabbar/home-active.png"
    },
    {
      pagePath: "pages/goods/list",
      text: "分类",
      iconPath: "static/tabbar/category.png",
      selectedIconPath: "static/tabbar/category-active.png"
    },
    {
      pagePath: "pages/cart/index",
      text: "购物车",
      iconPath: "static/tabbar/cart.png",
      selectedIconPath: "static/tabbar/cart-active.png"
    },
    {
      pagePath: "pages/user/profile",
      text: "我的",
      iconPath: "static/tabbar/user.png",
      selectedIconPath: "static/tabbar/user-active.png"
    }
  ]
};
const sitemapLocation = "sitemap.json";
const App = {
  pages,
  window,
  tabBar,
  sitemapLocation
};
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$u = common_vendor.uView.$u;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
