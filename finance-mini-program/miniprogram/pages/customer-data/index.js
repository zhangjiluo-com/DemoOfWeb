import regeneratorRuntime from "../../utils/regenerator-runtime";
import $ from "../../utils/wx-api";
import { circleCheck } from "../../utils/index";
import {
  getCustomerDataById,
  addUserCustomerData,
  uploadDocumentFiles,
  updateCustomerDataById
} from "../../services/index";
import { trigger } from "../../utils/event";
import { checkLogin } from "../../func/index";

Component({
  properties: {
    id: {
      type: String
    }
  },

  data: {
    form: {
      fileList: []
    },
    formConfig: [
      {
        key: "avatarUrl",
        config: {
          type: "uploader",
          label: "客户头像",
          extra: {
            maxLength: 1,
            ifUrlValue: true,
            ifSingleFile: true,
            ifHideTitle: true,
            defaultType: "IMAGE",
            viewWidth: 120,
            viewHeight: 120,
            accept: "IMAGE"
          }
        }
      },
      {
        key: "name",
        config: {
          type: "input",
          label: "客户姓名",
          extra: {
            maxLength: 8
          }
        }
      },
      {
        key: "identityId",
        config: {
          type: "input",
          label: "身份证号",
          extra: {
            type: "idcard",
            maxLength: 18,
            placeholder: "身份证号可推算年龄、性别等"
          }
        }
      },
      {
        key: "phone",
        config: {
          type: "input",
          label: "联系电话",
          extra: {
            type: "number",
            maxLength: 18
          }
        }
      },
      {
        key: "age",
        config: {
          type: "input",
          label: "年龄",
          extra: {
            type: "digit",
            maxLength: 4
          }
        }
      },
      {
        key: "demandMoney",
        config: {
          type: "input",
          label: "资金需求",
          extra: {
            type: "number",
            maxLength: 10
          }
        }
      },
      {
        key: "gender",
        config: {
          type: "selector",
          label: "性别",
          extra: {
            optionsCode: "gender"
          }
        }
      },
      {
        key: "address",
        config: {
          type: "address",
          label: "现居地址"
        }
      },
      {
        key: "censusRegister",
        config: {
          type: "address",
          label: "户籍地址"
        }
      },
      {
        key: "note",
        config: {
          type: "textarea",
          label: "备注",
          extra: {
            maxLength: 80,
            placeholder: "备注"
          }
        }
      },
      {
        key: "fileList",
        config: {
          type: "uploader",
          label: "附件"
        }
      }
    ]
  },

  lifetimes: {
    async attached() {
      const { id } = this.data;
      if (id) {
        try {
          await $.showLoading();

          const data = await getCustomerDataById(id);
          console.log(232, data);
          this.setData({
            form: data
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
    }
  },

  methods: {
    async bindsubmit(event) {
      console.log(this.options);
      console.log("检查登录");
      await checkLogin();

      const form = event.detail.value;

      console.log(JSON.stringify(form, null, 2));

      if (!form.name) {
        return $.showToast({
          title: "请至少填写客户姓名",
          icon: "none"
        });
      }
      $.showLoading();

      try {
        // 1. 检查表单 并且过滤表单
        const stainPaths = circleCheck(form, (obj, key) => {
          const el = obj[key];
          if (el === undefined || el === NaN || el === null) {
            delete obj[key];
          } else if (typeof el === "string" && el.indexOf("wxfile:") === 0) {
            delete obj[key];
            return true;
          }
        });

        // 2. 判断是否是新建
        let { id } = this.data;
        if (id) {
          await updateCustomerDataById(id, form);
        } else {
          id = await addUserCustomerData(form);
          this.setData({
            id
          });
        }
        console.log(423342);

        await uploadDocumentFiles(form, stainPaths, id);

        trigger("reload-home");
        wx.showToast({
          title: "完成"
        });
        setTimeout(wx.navigateBack, 8e2);
      } catch (error) {
        console.log(error);
        wx.showToast({
          title: "添加失败，请稍后再试",
          icon: "none"
        });
      } finally {
        wx.hideLoading();
      }
    },

    input(event) {
      if (event.currentTarget.dataset.key === "identityId") {
        const yearStr = event.detail.slice(6, 10);
        const monthStr = event.detail.slice(10, 12);
        const genderStr = event.detail.slice(16, 17);
        const year = yearStr.length === 4 ? +yearStr : false;
        const month = monthStr.length === 2 ? +monthStr : false;
        const gender = genderStr % 2;
        if (year) {
          const now = new Date();
          const nowYear = now.getFullYear();
          const nowMonth = now.getMonth() + 1;
          const age = nowYear - year + (month ? (nowMonth - month) / 12 : 0);
          if (age > 0 && age < 99) {
            this.setData({
              "form.identityId": event.detail,
              "form.age": age
            });
          }
        }
        if (genderStr && !isNaN(gender)) {
          this.setData({
            "form.identityId": event.detail,
            "form.gender": gender
          });
        }
      }
    }
  }
});
