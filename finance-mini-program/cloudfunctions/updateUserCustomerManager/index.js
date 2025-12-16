const cloud = require("./node_modules/wx-server-sdk");

async function getUserAuth(openId) {
  console.log("获取用户授权信息", openId);
  const { data } = await cloud
    .database()
    .collection("user_auth")
    .where({
      identifier: openId,
      identityType: "WECHAT"
    })
    .limit(1)
    .get();

  return data[0];
}

async function updateUserCustomerManager(userId, params) {
  const data = {
    userId: params.userId,
    name: params.name,
    wechatNickName: params.nickName,
    company: params.company,
    avatarUrl: params.avatarUrl,
    gender: params.gender,
    job: params.job
  };

  return cloud
    .database()
    .collection("customer_manager")
    .where({
      userId
    })
    .update({
      data
    });
}

async function getCustomerManager(userId) {
  const { data } = await cloud
    .database()
    .collection("customer_manager")
    .where({
      userId
    })
    .limit(1)
    .get();

  return data[0];
}

exports.main = async event => {
  console.log("main", event);
  if (!process.env.TCB_ENV || process.env.TCB_ENV === "local") {
    process.env.TCB_ENV = "financial-developmen";
  }
  cloud.init({
    env: process.env.TCB_ENV
  });

  const { OPENID } = cloud.getWXContext();

  // 获取用户的userId 因为没有会话机制

  const userAuth = await getUserAuth(OPENID);

  // 更新
  await updateUserCustomerManager(userAuth.userId, event);

  // 返回客户经理信息
  const customerManager = await getCustomerManager(userAuth.userId);

  return customerManager;
};
