import { VERSION } from "../../config";

Component({
  data: {
    iconUrl: "../../images/financial.png",
    list: [
      {
        code: "version",
        title: "当前版本",
        text: VERSION
      },
      {
        code: "contact",
        title: "联系我们",
        text: "flykiro@gmail.com"
      }
    ],
    contributors: [
      {
        type: "TECHNICAL",
        name: "Kiro"
      }
    ]
  },

  methods: {
    onTapItem(event) {
      const { ifText } = event.target.dataset;
      if (ifText) {
        const { index } = event.currentTarget.dataset;
        const item = this.data.list[index];
        if (item.code === "contact") {
          wx.setClipboardData({
            data: item.text,
            success() {
              wx.showToast({
                title: "复制成功"
              });
            },
            fail() {
              wx.showToast({
                title: "复制失败，请重试"
              });
            }
          });
        }
      }
    }
  }
});
