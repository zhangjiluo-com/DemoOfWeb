import regeneratorRuntime from "../../utils/regenerator-runtime";
import $ from "../../utils/wx-api";
import { addFeedback } from "../../services/index";

Component({
  methods: {
    async onSubmit(event) {
      const data = event.detail.value;
      const { feedback, contact } = data;
      if (!feedback) {
        return wx.showToast({
          title: "请填写您的宝贵建议或反馈！",
          icon: "none"
        });
      } else if (!contact) {
        const { confirm } = await $.showModal({
          content: "确定匿名提交您的内容吗？"
        });
        if (!confirm) {
          return;
        }
      }
      try {
        wx.showLoading({
          title: "提交中"
        });
        await addFeedback(data);
        wx.showToast({
          title: "提交成功，感谢您的支持！"
        });
        setTimeout(wx.navigateBack, 8e2);
      } catch (error) {
        wx.showToast({
          title: "提交失败，请稍后再试"
        });
      }
    }
  }
});
