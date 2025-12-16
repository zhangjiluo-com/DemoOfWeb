import regeneratorRuntime from "../utils/regenerator-runtime";
const watcherList = [];

export const store = {
  ifFirstLoginPageReady: false,
  ifFristCheckLoginOver: false,
  ifCloudReady: false,
  ifLoggedIn: false,
  needUpdatePages: {}
};

const offWatchStoreAsync = fx => setTimeout(() => offWatchStore(fx));

const call = async (state, fx) => {
  const result = await fx(state, () => offWatchStoreAsync(fx));
  result === true && offWatchStoreAsync(fx);
};

export const watchStore = fx => {
  console.log("监听 Store");
  watcherList.push(fx);
  call(store, fx);
};

export const offWatchStore = watcherFx => {
  const index = watcherList.findIndex(fx => watcherFx === fx);
  watcherList.splice(index, 1);
};

export const setStore = state => {
  return new Promise((resolve, reject) => {
    try {
      Object.assign(store, state);
      console.log("setStore", store);
      resolve(state);
      watcherList.forEach(call.bind(this, state));
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  store,
  setStore,
  watchStore,
  offWatchStore
};
