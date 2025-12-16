import regeneratorRuntime from "../../utils/regenerator-runtime";
import $ from "../../utils/wx-api";
import { getCustomerDataById } from "../../services/index";

Component({
  properties: {
    id: {
      type: String
    }
  },
  data: {
    formConfig: [
      {
        key: "identityId",
        config: {
          type: "input",
          label: "身份证号：",
          extra: {
            isView: true,
            type: "idcard",
            maxLength: 18,
            placeholder: "身份证号可推算年龄、性别等"
          }
        }
      },
      {
        key: "address",
        config: {
          type: "address",
          label: "现居地址：",
          extra: {
            isView: true
          }
        }
      },
      {
        key: "censusRegister",
        config: {
          type: "address",
          label: "户籍地址：",
          extra: {
            isView: true
          }
        }
      },
      {
        key: "note",
        config: {
          type: "textarea",
          label: "备注：",
          extra: {
            isView: true,
            maxLength: 80,
            placeholder: "备注"
          }
        }
      },
      {
        key: "fileList",
        config: {
          type: "uploader",
          label: "附件：",
          extra: {
            viewWidth: 90,
            isView: true
          }
        }
      }
    ]
  },
  lifetimes: {
    async attached() {
      const { id } = this.data;
      try {
        await $.showLoading();

        const data = await getCustomerDataById(id);

        wx.setNavigationBarTitle({
          title: data.name
        });

        this.setData({
          data
        });
      } catch (error) {
        wx.showToast({
          title: "请求异常，请稍后再试",
          icon: "none"
        });
      } finally {
        wx.hideLoading();
      }
    }
  },
  methods: {
    onTapButton() {
      $.navigateTo({
        url: `/pages/customer-data/index?id=${this.data.id}`
      });
    },
    call({
      currentTarget: {
        dataset: { phone: phoneNumber }
      }
    }) {
      wx.makePhoneCall({
        phoneNumber
      });
    }
  }
});
