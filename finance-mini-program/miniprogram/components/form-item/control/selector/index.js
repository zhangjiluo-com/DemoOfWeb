const existingOptions = {
  gender: {
    range: ["女", "男", "未知"],
    placeholder: "请选择性别"
  }
};

Component({
  externalClasses: ["value-class"],

  properties: {
    value: {
      type: String
    },
    extra: {
      type: Object
    }
  },

  attached() {
    const { optionsCode } = this.properties.extra;
    const options = existingOptions[optionsCode];
    if (optionsCode && options) {
      this.setData(options);
    }
  },

  methods: {
    input(event) {
      this.triggerEvent("input", +event.detail.value);
    }
  }
});
