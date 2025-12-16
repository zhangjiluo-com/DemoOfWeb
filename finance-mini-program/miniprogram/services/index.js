import regeneratorRuntime, { async } from "../utils/regenerator-runtime";
import { store, watchStore, setStore } from "../utils/store";
import { circleCheck, getDateTimeString, getValueByPath } from "../utils/index";
import $ from "../utils/wx-api";

export const getUserCustomerDataList = async () => {
  console.log("获取用户的所有的客户资料");
  const { data } = await wx.cloud
    .database()
    .collection("customer_data")
    .where({
      userId: store.user._id
    })
    .orderBy("createAt", "desc")
    .get();
  return data;
};

export const uploadDocumentFiles = async (form, stainPaths, docId) => {
  const total = stainPaths.length;
  if (total !== 0) {
    let updatedCount = 0;
    wx.showLoading({
      title: "开始上传文件"
    });
    await Promise.all(
      stainPaths.map(async ({ value, key, path }, index) => {
        const obj = getValueByPath(form, path.slice(0, -key.length - 1));

        const { fileID } = await wx.cloud.uploadFile({
          filePath: value,
          cloudPath: `${store.user._id}/${docId}/${getDateTimeString().replace(
            /\D/g,
            ""
          )}_${index}.${obj.ext}`
        });

        obj[key] = fileID;
        if (++updatedCount < total) {
          await $.showLoading({
            title: `已完成 ${Math.floor((updatedCount / total) * 100)} %`
          });
        } else {
          await updateCustomerDataById(docId, form);
        }
      })
    );
  }
};

export const addUserCustomerData = async params => {
  console.log("添加用户客户资料");
  params.createAt = getDateTimeString();
  params.userId = store.user._id;
  console.log(params);
  const res = await wx.cloud
    .database()
    .collection("customer_data")
    .add({
      data: params
    });
  return res._id;
};

export const getCustomerDataById = async docId => {
  const { data } = await wx.cloud
    .database()
    .collection("customer_data")
    .where({
      userId: store.user._id,
      _id: docId
    })
    .limit(1)
    .get();

  return data[0];
};

export const updateCustomerDataById = async (id, data) => {
  console.log(id, JSON.stringify(data, null, 2));
  data.updateAt = getDateTimeString();
  const res = await wx.cloud
    .database()
    .collection("customer_data")
    .doc(id)
    .update({
      data
    });
  console.log(res);
  return;
};

export const deleteCustomerDataById = async docId => {
  const doc = wx.cloud
    .database()
    .collection("customer_data")
    .doc(docId);

  const { data } = await doc.get();

  const stainList = circleCheck(
    data,
    (obj, key) =>
      typeof obj[key] === "string" && obj[key].indexOf("cloud://") === 0
  );

  await wx.cloud.deleteFile({ fileList: stainList.map(({ value }) => value) });

  await doc.remove();

  return docId;
};

export const doLogin = async userInfoData => {
  const { result } = await wx.cloud.callFunction({
    name: "login",
    data: userInfoData.userInfo
  });
  console.log(result);

  return result;
};

export const updateUserCustomerManager = params => {
  return wx.cloud
    .callFunction({
      name: "updateUserCustomerManager",
      data: params
    })
    .then(res => res.result);
};

export const addFeedback = params => {
  params.userId = store.user._id;
  return wx.cloud
    .database()
    .collection("feedback")
    .add({
      data: params
    });
};
