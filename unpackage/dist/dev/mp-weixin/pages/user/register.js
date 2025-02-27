"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        confirmPassword: "",
        nickname: ""
      }
    };
  },
  methods: {
    async handleRegister() {
      if (this.form.password !== this.form.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次输入的密码不一致",
          icon: "none"
        });
        return;
      }
      try {
        common_vendor.index.showToast({
          title: "注册成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        common_vendor.index.showToast({
          title: "注册失败",
          icon: "none"
        });
      }
    },
    goToLogin() {
      common_vendor.index.navigateBack();
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
    h: common_vendor.o(($event) => $data.form.confirmPassword = $event),
    i: common_vendor.p({
      type: "password",
      placeholder: "请再次输入密码",
      modelValue: $data.form.confirmPassword
    }),
    j: common_vendor.p({
      label: "确认密码"
    }),
    k: common_vendor.o(($event) => $data.form.nickname = $event),
    l: common_vendor.p({
      placeholder: "请输入昵称",
      modelValue: $data.form.nickname
    }),
    m: common_vendor.p({
      label: "昵称"
    }),
    n: common_vendor.sr("uForm", "fd534bf9-0"),
    o: common_vendor.p({
      model: $data.form
    }),
    p: common_vendor.o($options.handleRegister),
    q: common_vendor.p({
      type: "primary"
    }),
    r: common_vendor.o($options.goToLogin)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fd534bf9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/register.js.map
