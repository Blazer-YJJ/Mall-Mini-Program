"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderGoods: [],
      selectedAddress: null,
      paymentMethod: "wechat",
      freight: 10
    };
  },
  computed: {
    ...common_vendor.mapState(["addressList"]),
    goodsAmount() {
      return this.orderGoods.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
    },
    totalAmount() {
      return (parseFloat(this.goodsAmount) + this.freight).toFixed(2);
    }
  },
  onLoad(options) {
    if (options.goods) {
      this.orderGoods = JSON.parse(options.goods);
    } else if (options.goodsId) {
      this.orderGoods = [{
        id: parseInt(options.goodsId),
        name: `商品${options.goodsId}`,
        price: Math.floor(Math.random() * 1e3 + 100),
        image: "/static/logo.png",
        count: 1
      }];
    }
    if (this.addressList.length > 0) {
      this.selectedAddress = this.addressList.find((item) => item.isDefault) || this.addressList[0];
    }
  },
  methods: {
    selectAddress() {
      common_vendor.index.navigateTo({
        url: "/pages/user/address?select=true"
      });
    },
    selectPayment(method) {
      this.paymentMethod = method;
    },
    submitOrder() {
      if (!this.selectedAddress) {
        common_vendor.index.showToast({
          title: "请选择收货地址",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "下单成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/order/list"
          });
        }, 1500);
      }, 2e3);
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_radio = common_vendor.resolveComponent("u-radio");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_icon + _component_u_radio + _component_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.selectedAddress
  }, $data.selectedAddress ? {
    b: common_vendor.t($data.selectedAddress.name),
    c: common_vendor.t($data.selectedAddress.phone),
    d: common_vendor.t($data.selectedAddress.province),
    e: common_vendor.t($data.selectedAddress.city),
    f: common_vendor.t($data.selectedAddress.district),
    g: common_vendor.t($data.selectedAddress.address)
  } : {
    h: common_vendor.p({
      name: "map",
      size: "40"
    })
  }, {
    i: common_vendor.p({
      name: "arrow-right",
      color: "#ccc"
    }),
    j: common_vendor.o((...args) => $options.selectAddress && $options.selectAddress(...args)),
    k: common_vendor.f($data.orderGoods, (item, k0, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.count),
        e: item.id
      };
    }),
    l: common_vendor.p({
      name: "weixin-fill",
      color: "#09BB07",
      size: "40"
    }),
    m: common_vendor.o(($event) => $data.paymentMethod = $event),
    n: common_vendor.p({
      label: "wechat",
      name: "payment",
      modelValue: $data.paymentMethod
    }),
    o: common_vendor.o(($event) => $options.selectPayment("wechat")),
    p: common_vendor.p({
      name: "zhifubao-circle-fill",
      color: "#1296db",
      size: "40"
    }),
    q: common_vendor.o(($event) => $data.paymentMethod = $event),
    r: common_vendor.p({
      label: "alipay",
      name: "payment",
      modelValue: $data.paymentMethod
    }),
    s: common_vendor.o(($event) => $options.selectPayment("alipay")),
    t: common_vendor.t($options.goodsAmount),
    v: common_vendor.t($data.freight),
    w: common_vendor.t($options.totalAmount),
    x: common_vendor.t($options.totalAmount),
    y: common_vendor.o($options.submitOrder),
    z: common_vendor.p({
      type: "primary"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8837ac90"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/create.js.map
