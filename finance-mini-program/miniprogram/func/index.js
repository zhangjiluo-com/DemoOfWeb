import regeneratorRuntime, { async } from "../utils/regenerator-runtime";
import { store, setStore, watchStore } from "../utils/store";
import { doLogin, getUser } from "../services/index";
import $ from "../utils/wx-api";

function getTopPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export const getUserInfo = async (component = getTopPage()) => {
  const { authSetting } = await $.getSetting();
  console.log("获取用户信息");
  if (authSetting["scope.userInfo"]) {
    return $.getUserInfo();
  } else {
    return new Promise((resolve, reject) => {
      console.log("fasdfa", component);
      wx.hideLoading();
      component.setData({
        loginCbs: {
          resolve,
          reject
        }
      });
    });
  }
};

export function getAutoLoginData() {
  return new Promise((resolve, reject) => {
    console.log("watch store");
    watchStore(({ ifFirstLoginPageReady }) => {
      console.log(ifFirstLoginPageReady);
      return (
        ifFirstLoginPageReady &&
        (getUserInfo()
          .then(data => {
            console.log("获取到的用户信息userinfo：", data);
            resolve(data);
          })
          .catch(reject),
        true)
      );
    });
  });
}

export function checkLogin() {
  if (!store.ifLoggedIn) {
    console.log("检查登录");
    return getAutoLoginData()
      .then(doLogin)
      .then(user =>
        setStore({
          ifLoggedIn: true,
          user
        })
      )
      .catch(error => {
        console.log("Error:", error);
      });
  }
}

export function onceLogin() {
  return new Promise(resolve =>
    watchStore(state => state.ifLoggedIn && (resolve(state), true))
  );
}
