import regeneratorRuntime from "./utils/regenerator-runtime";
import { checkLogin } from "./func/index";
import { setStore } from "./utils/store";

App({
  async onLaunch() {
    if (!wx.cloud) {
      return wx.showToast({
        title: "当前微信版本过低",
        icon: "none",
        mask: true,
        duration: 900000
      });
    }
    await this.initCloud();
  },

  async initCloud() {
    try {
      wx.showLoading({
        title: "登录中，请稍等"
      });

      console.log("初始化云开发");
      wx.cloud.init({
        // env: "financial-developmen",
        traceUser: true
      });

      console.log("初始化完成");

      await checkLogin();
    } catch (error) {
      console.log(3923, error);
      if (!(error && error.ifNoToast)) {
        wx.showToast({
          title: "系统异常，请稍后再试",
          icon: "none"
        });
      }
    }
    setStore({
      ifCloudReady: true
    });
    wx.hideLoading();
  },
  onError(error) {
    console.log("未捕获", error);
  }
});
