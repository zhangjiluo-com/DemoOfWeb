import regeneratorRuntime from "../../utils/regenerator-runtime";
import { storeData } from "../../behaviors/index";
import { checkLogin } from "../../func/index";
import { store } from "../../utils/store";

Component({
  behaviors: [storeData],

  data: {
    actionList: [
      {
        url: "/pages/setting/index",
        icon: "../../images/setting.png",
        title: "设置"
      }
    ],
    gridList: [
      {
        type: "page",
        prarms: "/pages/products/index",
        icon: "../../images/product.png",
        title: "产品列表"
      },
      {
        type: "",
        prarms: "/pages/edit-product/index",
        icon: "../../images/product.png",
        title: "添加产品"
      }
    ]
  },

  methods: {
    onGridClick(event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.gridList[index];
      if (item.type === "page") {
        wx.navigateTo({
          url: item.prarms
        });
      } else {
        wx.showToast({
          title: "专柜功能，后续开放",
          icon: "none"
        });
      }
    },
    async onTapAvatar() {
      await checkLogin();
      wx.navigateTo({
        url: `/pages/user-information/index?id=${store.user._id}`
      });
    },
    onTapLevel() {
      wx.showToast({
        icon: "none",
        title: "专柜功能，后续开放"
      });
    }
  }
});
