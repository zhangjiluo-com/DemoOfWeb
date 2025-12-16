const { globalData } = getApp();

Component({
  data: {
    image: "",
    customForm: []
  }

  // selectImage(event) {
  //   const _this = this;
  //   chooseImage({
  //     count: 1,
  //     success(res) {
  //       _this.setData({
  //         image: res.tempFilePaths[0]
  //       });
  //     }
  //   });
  // },

  // longpress(event) {
  //   console.log(event);
  //   if (this.data.image) {
  //     previewImage({
  //       urls: [this.data.image]
  //     });
  //   }
  // },
  // submit({
  //   detail: {
  //     target: {
  //       dataset: { key }
  //     },
  //     value: data
  //   }
  // }) {
  //   if (key === "preview") {
  //     const list = [];
  //     for (const key in data) {
  //       if (key.indexOf("custom-") === 0) {
  //         const [, index, type] = key.split("-");
  //         if (type === "options") {
  //           list[index] = {
  //             ...list[index],
  //             options: data[key]
  //           };
  //         } else {
  //           list[index] = {
  //             ...list[index],
  //             type,
  //             title: data[key]
  //           };
  //         }
  //         delete data[key];
  //       }
  //     }
  //     data.customForm = list;
  //     globalData.productPreview = data;
  //     console.log(JSON.stringify(data, null, 2));

  //     navigateTo({
  //       url: `/pages/product-form/index?type=preview`
  //     });
  //   } else {
  //   }
  // },
  // addCustomForm(event) {
  //   const { customForm } = this.data;
  //   const { dataset } = event.currentTarget;
  //   dataset.typeName = types[dataset.type];
  //   customForm.push(dataset);
  //   this.setData({ customForm });
  // },
  // removeCustomForm(event) {
  //   const { customForm } = this.data;
  //   customForm.splice(event.currentTarget.dataset.index, 1);
  //   this.setData({ customForm });
  // }
});
