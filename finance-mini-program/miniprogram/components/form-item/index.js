Component({
  externalClasses: ["label-class", "value-class"],

  behaviors: ["wx://form-field"],

  properties: {
    config: {
      type: Object
    },
    value: {
      type: [String, Object, Array, Number, Boolean]
    }
  },

  methods: {
    input(event) {
      console.log("日你妈腾讯", event);
      this.setData(
        {
          value: event.detail
        },
        () => {
          this.triggerEvent("input", this.data.value);
        }
      );
    }
  }
});
