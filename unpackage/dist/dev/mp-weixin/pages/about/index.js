"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  _component_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.p({
      name: "phone",
      size: "40",
      color: "#2979ff"
    }),
    c: common_vendor.p({
      name: "email",
      size: "40",
      color: "#2979ff"
    }),
    d: common_vendor.p({
      name: "home",
      size: "40",
      color: "#2979ff"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-415a4f9d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/about/index.js.map
