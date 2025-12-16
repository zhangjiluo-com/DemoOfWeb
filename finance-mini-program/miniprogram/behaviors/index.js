import regeneratorRuntime from "../utils/regenerator-runtime";
import { store, setStore, watchStore, offWatchStore } from "../utils/store";

export const login = Behavior({
  lifetimes: {
    attached() {
      if (!store.ifFirstLoginPageReady) {
        setStore({
          ifFirstLoginPageReady: true
        });
      }
    }
  }
});

export const storeData = Behavior({
  data: {
    store
  },
  lifetimes: {
    attached() {
      const watcher = () => this.setData({ store });
      this.storeDataWatcher = watcher;
      watchStore(watcher);
    },
    detached() {
      offWatchStore(this.storeDataWatcher);
    }
  }
});
