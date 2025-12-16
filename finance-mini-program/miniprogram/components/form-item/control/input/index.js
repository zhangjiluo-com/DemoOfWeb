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
  methods: {
    input(event) {
      this.triggerEvent("input", event.detail.value);
    }
  }
});
