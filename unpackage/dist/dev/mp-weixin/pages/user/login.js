"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      form: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    ...common_vendor.mapMutations(["setUserInfo"]),
    async handleLogin() {
      try {
        const userInfo = {
          id: 1,
          phone: this.form.phone,
          nickname: "测试用户"
        };
        this.setUserInfo(userInfo);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        common_vendor.index.switchTab({
          url: "/pages/user/profile"
        });
      } catch (error) {
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "none"
        });
      }
    },
    goToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/user/register"
      });
    }
  }
};
if (!Array) {
  const _component_u_input = common_vendor.resolveComponent("u-input");
  const _component_u_form_item = common_vendor.resolveComponent("u-form-item");
  const _component_u_form = common_vendor.resolveComponent("u-form");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  (_component_u_input + _component_u_form_item + _component_u_form + _component_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o(($event) => $data.form.phone = $event),
    c: common_vendor.p({
      placeholder: "请输入手机号",
      modelValue: $data.form.phone
    }),
    d: common_vendor.p({
      label: "手机号"
    }),
    e: common_vendor.o(($event) => $data.form.password = $event),
    f: common_vendor.p({
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.form.password
    }),
    g: common_vendor.p({
      label: "密码"
    }),
    h: common_vendor.sr("uForm", "6163e5ce-0"),
    i: common_vendor.p({
      model: $data.form
    }),
    j: common_vendor.o($options.handleLogin),
    k: common_vendor.p({
      type: "primary"
    }),
    l: common_vendor.o($options.goToRegister)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6163e5ce"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/login.js.map
