import regeneratorRuntime from "../../utils/regenerator-runtime";
import { store, setStore } from "../../utils/store";
import { onceLogin } from "../../func/index";
import { storeData } from "../../behaviors/index";
import {
  getUserCustomerDataList,
  deleteCustomerDataById,
  doLogin
} from "../../services/index";
import { on, off } from "../../utils/event";
import $ from "../../utils/wx-api";

Component({
  behaviors: [storeData],

  properties: {
    shareBy: {
      type: String
    }
  },
  data: {
    customerDataList: []
  },

  lifetimes: {
    async attached() {
      this.onPullDownRefresh();
      on("reload-home", this.initPage, this);
    }
  },

  methods: {
    async onPullDownRefresh() {
      await onceLogin();
      console.log("初始化首页");
      this.initPage();
    },

    onShareAppMessage() {
      return {
        title: "融金小助手",
        path: `/pages/home/index?shareBy=${store.session.openId}`
      };
    },

    async initPage() {
      try {
        await $.showLoading();
        const customerDataList = await getUserCustomerDataList();
        console.log("customerDataList", customerDataList);
        this.setData({
          customerDataList
        });
      } catch (error) {
        console.log(error);
        await $.showToast({
          icon: "none",
          title: "请求异常，请稍后再试"
        });
      } finally {
        $.hideLoading();
        $.stopPullDownRefresh();
      }
    },

    onTapCustomerData(event) {
      const { id } = event.currentTarget.dataset;
      $.navigateTo({
        url: `/pages/customer-data${id ? "-viewer" : ""}/index?id=${id || ""}`
      });
    },

    async onPressCustomerData(event) {
      const { tapIndex } = await $.showActionSheet({
        itemList: ["删除"]
      });
      if (tapIndex === 0) {
        try {
          await $.showLoading();
          await deleteCustomerDataById(event.currentTarget.dataset.id);
          await this.initPage();
        } catch (error) {
          await $.showToast({
            title: "删除失败，请稍后再试",
            icon: "none"
          });
        } finally {
          await $.hideLoading();
        }
      }
    },
    async onTapGetUserInfo(event) {
      const data = event.detail;
      if (data.userInfo) {
        try {
          wx.showLoading({
            title: "登录中"
          });
          const user = await doLogin(data);
          await setStore({
            ifLoggedIn: true,
            user
          });
        } catch (error) {
          wx.showToast({
            icon: "none",
            title: "登录失败，请稍后再试"
          });
        }
        wx.hideLoading();
      }
    }
  }
});
