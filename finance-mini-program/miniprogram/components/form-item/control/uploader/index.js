import regeneratorRuntime from "../../../../utils/regenerator-runtime";
import { formatFileData } from "../../../../utils/index";
import $ from "../../../../utils/wx-api";

Component({
  externalClasses: ["value-class"],

  properties: {
    value: {
      type: [String, Object, Array],
      observer() {
        const { value, extra } = this.data;
        const { ifUrlValue, ifSingleFile, defaultType } = extra || {};
        console.log(JSON.stringify(value, null, 2));
        let files;
        if (!value) {
          files = [];
        } else if (ifSingleFile) {
          files = [value];
        } else {
          files = value;
        }

        if (ifUrlValue) {
          files = files.map(url => formatFileData({ url }, defaultType));
        }

        this.setData({
          files
        });
      }
    },
    extra: {
      type: Object,
      value: {}
    }
  },

  data: {
    files: [],
    type: "IMAGE"
  },

  methods: {
    updateFiles(files) {
      let value = files;
      const { ifUrlValue, ifSingleFile } = this.data.extra || {};
      if (ifUrlValue) {
        value = files.map(file => file.url);
      }
      if (ifSingleFile) {
        value = value[0];
      }
      this.triggerEvent("input", value);
    },

    async onAddFile(event) {
      const { tapIndex } = await $.showActionSheet({
        itemList: ["选择相册图片", "拍摄照片", "微信会话列表选择"]
      });
      let res;
      if (tapIndex === 0) {
        res = await $.chooseImage({
          sizeType: ["original"],
          sourceType: ["album"]
        });
      } else if (tapIndex === 1) {
        res = await $.chooseImage({
          sizeType: ["original"],
          sourceType: ["camera"]
        });
      } else if (tapIndex === 2) {
        res = await $.chooseMessageFile({
          count: 100
        });
      }

      const fileList = res.tempFiles.map(file => formatFileData(file));
      this.updateFiles(this.data.files.concat(fileList));
    },

    async onDeleteItem({
      currentTarget: {
        dataset: { index }
      }
    }) {
      const { files } = this.data;
      files.splice(index, 1);
      this.updateFiles(files);
    },

    async onPreviewItem({
      currentTarget: {
        dataset: { index }
      }
    }) {
      console.log(index);
      const { files } = this.data;
      const current = files[index];
      const { type, url } = current;
      if (type === "IMAGE") {
        const urls = files
          .filter(({ type }) => type === "IMAGE")
          .map(({ url }) => url);

        wx.previewImage({
          urls,
          current: url
        });
      } else if (type === "DOCUMENT") {
        let filePath = url;
        const isCloud = url.indexOf("cloud:") === 0;
        const isHttp = url.indexOf("http") === 0;
        if (isCloud || isHttp) {
          wx.showLoading({
            title: "下载中"
          });
          let res;
          if (isCloud) {
            res = await wx.cloud.downloadFile({
              fileID: url
            });
          } else {
            res = await $.downloadFile({
              url
            });
          }
          filePath = res.tempFilePath;
          wx.hideLoading();
        }
        wx.openDocument({
          filePath
        });
      }
    }
  }
});
