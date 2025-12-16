import regeneratorRuntime from "../../utils/regenerator-runtime";
import $ from "../../utils/wx-api";

import { login } from "../../behaviors/index";

Component({
  behaviors: [login],

  properties: {
    loginCbs: {
      type: Object,
      observer() {
        this.setData({
          ifLoginBoxShow: true
        });
      }
    }
  },

  data: {
    ifLoginBoxShow: false,
    statusBarHeight: 20
  },

  lifetimes: {
    async attached() {
      const { statusBarHeight } = await $.getSystemInfo();
      this.setData({ statusBarHeight });
    }
  },

  methods: {
    onTapLoginBoxCancel() {
      this.setData({
        ifLoginBoxShow: false
      });
      this.data.loginCbs.reject({ ifNoToast: true });
    },

    async onGetUserInfo(event) {
      const data = event.detail;
      if (data.userInfo) {
        console.log("获取到的用户信息", data);
        this.setData({
          ifLoginBoxShow: false
        });
        this.data.loginCbs.resolve(data);
      }
    }
  }
});
