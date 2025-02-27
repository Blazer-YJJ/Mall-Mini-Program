"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectMode: false,
      showEditPopup: false,
      showRegionPicker: false,
      editingAddress: {
        id: null,
        name: "",
        phone: "",
        province: "",
        city: "",
        district: "",
        address: "",
        isDefault: false
      }
    };
  },
  computed: {
    ...common_vendor.mapState(["addressList"])
  },
  onLoad(options) {
    if (options.select) {
      this.selectMode = true;
    }
    if (this.addressList.length === 0) {
      this.initMockData();
    }
  },
  methods: {
    ...common_vendor.mapMutations(["setAddressList"]),
    initMockData() {
      const mockAddressList = [
        {
          id: 1,
          name: "张三",
          phone: "13800138000",
          province: "广东省",
          city: "深圳市",
          district: "南山区",
          address: "科技园南路XX号",
          isDefault: true
        },
        {
          id: 2,
          name: "李四",
          phone: "13900139000",
          province: "广东省",
          city: "广州市",
          district: "天河区",
          address: "天河路XX号",
          isDefault: false
        }
      ];
      this.setAddressList(mockAddressList);
    },
    addAddress() {
      this.editingAddress = {
        id: null,
        name: "",
        phone: "",
        province: "",
        city: "",
        district: "",
        address: "",
        isDefault: false
      };
      this.showEditPopup = true;
    },
    editAddress(address) {
      this.editingAddress = JSON.parse(JSON.stringify(address));
      this.showEditPopup = true;
    },
    saveAddress() {
      if (!this.editingAddress.name) {
        common_vendor.index.showToast({
          title: "请输入收货人姓名",
          icon: "none"
        });
        return;
      }
      if (!this.editingAddress.phone) {
        common_vendor.index.showToast({
          title: "请输入手机号码",
          icon: "none"
        });
        return;
      }
      if (!this.editingAddress.province) {
        common_vendor.index.showToast({
          title: "请选择所在地区",
          icon: "none"
        });
        return;
      }
      if (!this.editingAddress.address) {
        common_vendor.index.showToast({
          title: "请输入详细地址",
          icon: "none"
        });
        return;
      }
      const newAddressList = [...this.addressList];
      if (this.editingAddress.isDefault) {
        newAddressList.forEach((item) => {
          item.isDefault = false;
        });
      }
      if (this.editingAddress.id) {
        const index = newAddressList.findIndex((item) => item.id === this.editingAddress.id);
        if (index > -1) {
          newAddressList[index] = this.editingAddress;
        }
      } else {
        const newId = newAddressList.length > 0 ? Math.max(...newAddressList.map((item) => item.id)) + 1 : 1;
        newAddressList.push({
          ...this.editingAddress,
          id: newId
        });
      }
      this.setAddressList(newAddressList);
      this.showEditPopup = false;
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
    },
    confirmRegion(e) {
      const { province, city, area } = e;
      this.editingAddress.province = province.label;
      this.editingAddress.city = city.label;
      this.editingAddress.district = area.label;
    },
    showActionSheet(address, index) {
      common_vendor.index.showActionSheet({
        itemList: ["编辑", "删除", address.isDefault ? "取消默认" : "设为默认"],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              this.editAddress(address);
              break;
            case 1:
              this.deleteAddress(index);
              break;
            case 2:
              this.toggleDefault(index);
              break;
          }
        }
      });
    },
    deleteAddress(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该地址吗？",
        success: (res) => {
          if (res.confirm) {
            const newAddressList = [...this.addressList];
            newAddressList.splice(index, 1);
            this.setAddressList(newAddressList);
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    toggleDefault(index) {
      const newAddressList = [...this.addressList];
      const isCurrentDefault = newAddressList[index].isDefault;
      if (isCurrentDefault) {
        newAddressList[index].isDefault = false;
      } else {
        newAddressList.forEach((item, i) => {
          item.isDefault = i === index;
        });
      }
      this.setAddressList(newAddressList);
    },
    selectAddress(address) {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      if (prevPage && prevPage.$vm) {
        prevPage.$vm.selectedAddress = address;
      }
      common_vendor.index.navigateBack();
    }
  }
};
if (!Array) {
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _component_u_empty = common_vendor.resolveComponent("u-empty");
  const _component_u_button = common_vendor.resolveComponent("u-button");
  const _component_u_input = common_vendor.resolveComponent("u-input");
  const _component_u_form_item = common_vendor.resolveComponent("u-form-item");
  const _component_u_switch = common_vendor.resolveComponent("u-switch");
  const _component_u_form = common_vendor.resolveComponent("u-form");
  const _component_u_popup = common_vendor.resolveComponent("u-popup");
  const _component_u_picker = common_vendor.resolveComponent("u-picker");
  (_component_u_icon + _component_u_empty + _component_u_button + _component_u_input + _component_u_form_item + _component_u_switch + _component_u_form + _component_u_popup + _component_u_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.addressList.length > 0
  }, _ctx.addressList.length > 0 ? {
    b: common_vendor.f(_ctx.addressList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.phone),
        c: item.isDefault
      }, item.isDefault ? {} : {}, {
        d: common_vendor.t(item.province),
        e: common_vendor.t(item.city),
        f: common_vendor.t(item.district),
        g: common_vendor.t(item.address),
        h: "741c9688-0-" + i0,
        i: common_vendor.o(($event) => $options.showActionSheet(item, index), index),
        j: index,
        k: common_vendor.o(($event) => $data.selectMode ? $options.selectAddress(item) : $options.editAddress(item), index)
      });
    }),
    c: common_vendor.p({
      name: "more-dot-fill",
      color: "#ccc",
      size: "40"
    })
  } : {
    d: common_vendor.p({
      text: "暂无收货地址",
      mode: "address"
    })
  }, {
    e: common_vendor.o($options.addAddress),
    f: common_vendor.p({
      type: "primary"
    }),
    g: common_vendor.t($data.editingAddress.id ? "编辑地址" : "新增地址"),
    h: common_vendor.o(($event) => $data.showEditPopup = false),
    i: common_vendor.p({
      name: "close"
    }),
    j: common_vendor.o(($event) => $data.editingAddress.name = $event),
    k: common_vendor.p({
      placeholder: "请输入收货人姓名",
      modelValue: $data.editingAddress.name
    }),
    l: common_vendor.p({
      label: "收货人"
    }),
    m: common_vendor.o(($event) => $data.editingAddress.phone = $event),
    n: common_vendor.p({
      placeholder: "请输入手机号码",
      modelValue: $data.editingAddress.phone
    }),
    o: common_vendor.p({
      label: "手机号码"
    }),
    p: $data.editingAddress.province
  }, $data.editingAddress.province ? {
    q: common_vendor.t($data.editingAddress.province),
    r: common_vendor.t($data.editingAddress.city),
    s: common_vendor.t($data.editingAddress.district)
  } : {}, {
    t: common_vendor.p({
      name: "arrow-right",
      color: "#ccc"
    }),
    v: common_vendor.o(($event) => $data.showRegionPicker = true),
    w: common_vendor.p({
      label: "所在地区"
    }),
    x: common_vendor.o(($event) => $data.editingAddress.address = $event),
    y: common_vendor.p({
      placeholder: "请输入详细地址",
      modelValue: $data.editingAddress.address
    }),
    z: common_vendor.p({
      label: "详细地址"
    }),
    A: common_vendor.o(($event) => $data.editingAddress.isDefault = $event),
    B: common_vendor.p({
      modelValue: $data.editingAddress.isDefault
    }),
    C: common_vendor.p({
      label: "设为默认地址"
    }),
    D: common_vendor.sr("uForm", "741c9688-5,741c9688-3"),
    E: common_vendor.p({
      model: $data.editingAddress
    }),
    F: common_vendor.o($options.saveAddress),
    G: common_vendor.p({
      type: "primary"
    }),
    H: common_vendor.o(($event) => $data.showEditPopup = $event),
    I: common_vendor.p({
      mode: "bottom",
      ["border-radius"]: "16",
      modelValue: $data.showEditPopup
    }),
    J: common_vendor.o($options.confirmRegion),
    K: common_vendor.o(($event) => $data.showRegionPicker = $event),
    L: common_vendor.p({
      mode: "region",
      modelValue: $data.showRegionPicker
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-741c9688"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/address.js.map
