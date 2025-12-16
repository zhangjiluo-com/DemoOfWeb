Component({
  externalClasses: ["value-class"],

  properties: {
    value: {
      type: Object
    },
    extra: {
      type: Object
    }
  },

  lifetimes: {
    attached() {
      if (!this.data.value) {
        this.triggerEvent("input", {
          selector: [],
          detail: ""
        });
      }
    }
  },

  methods: {
    inputRegion(event) {
      this.triggerEvent("input", {
        selector: event.detail.value,
        detail: this.data.value.detail
      });
    },
    inputDetail(event) {
      this.triggerEvent("input", {
        detail: event.detail.value,
        selector: this.data.value.selector
      });
    }
  }
});
