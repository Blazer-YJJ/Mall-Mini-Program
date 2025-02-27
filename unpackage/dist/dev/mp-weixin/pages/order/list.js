"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentStatus: "all",
      statusList: [
        { label: "全部", value: "all" },
        { label: "待付款", value: "pending" },
        { label: "待发货", value: "paid" },
        { label: "待收货", value: "shipped" },
        { label: "已完成", value: "completed" }
      ],
      orderList: []
    };
  },
  onLoad() {
    this.loadOrderList();
  },
  methods: {
    switchStatus(status) {
      this.currentStatus = status;
      this.loadOrderList();
    },
    async loadOrderList() {
      try {
        const mockOrders = [
          {
            id: 1,
            orderNo: "O" + Date.now(),
            status: "pending",
            goodsList: [
              {
                id: 1,
                name: "商品1",
                price: 199,
                count: 1,
                image: "/static/logo.png"
              }
            ],
            totalCount: 1,
            totalAmount: "199.00",
            createTime: "2023-01-01 12:00:00"
          },
          {
            id: 2,
            orderNo: "O" + (Date.now() - 864e5),
            status: "shipped",
            goodsList: [
              {
                id: 2,
                name: "商品2",
                price: 299,
                count: 2,
                image: "/static/logo.png"
              },
              {
                id: 3,
                name: "商品3",
                price: 99,
                count: 1,
                image: "/static/logo.png"
              }
            ],
            totalCount: 3,
            totalAmount: "697.00",
            createTime: "2022-12-30 15:30:00"
          }
        ];
        if (this.currentStatus !== "all") {
          this.orderList = mockOrders.filter((order) => order.status === this.currentStatus);
        } else {
          this.orderList = mockOrders;
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      }
    },
    getStatusText(status) {
      const statusMap = {
        "pending": "待付款",
        "paid": "待发货",
        "shipped": "待收货",
        "completed": "已完成",
        "cancelled": "已取消"
      };
      return statusMap[status] || "未知状态";
    },
    cancelOrder(orderId) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "订单已取消",
              icon: "success"
            });
            this.loadOrderList();
          }
        }
      });
    },
    payOrder(orderId) {
      common_vendor.index.showLoading({
        title: "正在跳转支付"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "success"
        });
        this.loadOrderList();
      }, 1500);
    },
    confirmReceive(orderId) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认已收到商品？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "确认收货成功",
              icon: "success"
            });
            this.loadOrderList();
          }
        }
      });
    },
    viewLogistics(orderId) {
      common_vendor.index.showToast({
        title: "物流信息查询中",
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_empty = common_vendor.resolveComponent("u-empty");
  (_component_u_button + _component_u_empty)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.statusList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: index,
        c: $data.currentStatus === item.value ? 1 : "",
        d: common_vendor.o(($event) => $options.switchStatus(item.value), index)
      };
    }),
    b: $data.orderList.length > 0
  }, $data.orderList.length > 0 ? {
    c: common_vendor.f($data.orderList, (order, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(order.orderNo),
        b: common_vendor.t($options.getStatusText(order.status)),
        c: common_vendor.f(order.goodsList, (goods, goodsIndex, i1) => {
          return {
            a: goods.image,
            b: common_vendor.t(goods.name),
            c: common_vendor.t(goods.price),
            d: common_vendor.t(goods.count),
            e: goodsIndex
          };
        }),
        d: common_vendor.t(order.totalCount),
        e: common_vendor.t(order.totalAmount),
        f: order.status === "pending"
      }, order.status === "pending" ? {
        g: common_vendor.o(($event) => $options.cancelOrder(order.id), index),
        h: "456ecf67-0-" + i0,
        i: common_vendor.p({
          size: "mini"
        })
      } : {}, {
        j: order.status === "pending"
      }, order.status === "pending" ? {
        k: common_vendor.o(($event) => $options.payOrder(order.id), index),
        l: "456ecf67-1-" + i0,
        m: common_vendor.p({
          type: "primary",
          size: "mini"
        })
      } : {}, {
        n: order.status === "shipped"
      }, order.status === "shipped" ? {
        o: common_vendor.o(($event) => $options.confirmReceive(order.id), index),
        p: "456ecf67-2-" + i0,
        q: common_vendor.p({
          type: "primary",
          size: "mini"
        })
      } : {}, {
        r: order.status === "completed"
      }, order.status === "completed" ? {
        s: common_vendor.o(($event) => $options.viewLogistics(order.id), index),
        t: "456ecf67-3-" + i0,
        v: common_vendor.p({
          type: "info",
          size: "mini"
        })
      } : {}, {
        w: index
      });
    })
  } : {
    d: common_vendor.p({
      text: "暂无相关订单",
      mode: "order"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-456ecf67"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/list.js.map
