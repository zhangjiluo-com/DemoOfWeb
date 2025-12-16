import regeneratorRuntime from "../../utils/regenerator-runtime";
import { storeData } from "../../behaviors/index";
import { updateUserCustomerManager } from "../../services/index";
import { store, setStore } from "../../utils/store";
import {
  getValueByPath,
  getPathExtension,
  circleCheck,
  getDateTimeString
} from "../../utils/index";

Component({
  behaviors: [storeData],

  properties: {
    id: {
      type: String
    }
  },

  data: {
    formConfig: [
      {
        key: "avatarUrl",
        config: {
          type: "uploader",
          label: "头像",
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
          label: "姓名",
          extra: {
            maxLength: 8
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
        key: "company",
        config: {
          type: "input",
          label: "公司",
          extra: {
            maxLength: 10
          }
        }
      },
      {
        key: "job",
        config: {
          type: "input",
          label: "职称",
          extra: {
            maxLength: 10
          }
        }
      }
    ]
  },

  methods: {
    async uploadForm(form) {
      // 1. 检查表单 并且过滤表单
      const stainPaths = circleCheck(form, (obj, key) => {
        const el = obj[key];
        if (el === undefined || el === NaN) {
          delete obj[key];
        } else if (typeof el === "string" && el.indexOf("wxfile:") === 0) {
          delete obj[key];
          return true;
        }
      });

      console.log(JSON.stringify(stainPaths, null, 2));
      // 2. 上传文件
      const total = stainPaths.length;
      if (total !== 0) {
        let updatedCount = 0;
        await Promise.all(
          stainPaths.map(async ({ value, key, path }) => {
            const obj = getValueByPath(form, path.slice(0, -key.length - 1));

            console.log(3123123, getPathExtension(value));

            const { fileID } = await wx.cloud.uploadFile({
              filePath: value,
              cloudPath: `${store.user._id}/${getDateTimeString().replace(
                /\D/g,
                ""
              )}/${("" + Math.random()).slice(2)}.${getPathExtension(value)}`
            });

            obj[key] = fileID;
            if (++updatedCount < total) {
              wx.showLoading({
                title: `已完成 ${Math.floor((updatedCount / total) * 100)} %`
              });
            }
          })
        );
      }

      console.log(JSON.stringify(form, null, 2));
    },
    async bindsubmit(event) {
      const form = event.detail.value;
      // return console.log(JSON.stringify(form, null, 2));
      try {
        wx.showLoading({
          title: "更新中"
        });
        await this.uploadForm(form);
        console.log(JSON.stringify(form, null, 2));

        const customerManager = await updateUserCustomerManager(form);
        store.user.customerManager = customerManager;
        await setStore();
      } catch (error) {
        console.log(error);
        wx.showToast({
          icon: "none",
          title: "更新失败，请稍后再试"
        });
      } finally {
        wx.showToast({
          title: "更新成功"
        });
        setTimeout(wx.navigateBack, 8e2);
      }
    }
  }
});
