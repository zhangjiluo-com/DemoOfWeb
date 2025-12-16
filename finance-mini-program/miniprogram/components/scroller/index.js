Component({
  options: {
    multipleSlots: true
  },

  properties: {},

  data: {
    scrollTop: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scroll(event) {
      const scrollTop = event.detail.scrollTop;
      if (scrollTop < 0) {
        this.setData({
          scrollTop: -scrollTop
        });
      } else {
        this.setData({
          scrollTop: 0
        });
      }
    }
  }
});
