const cloud = require("wx-server-sdk");

// console.log("env", process.env["TCB_ENV"]);

async function getOAuthInfo(openId) {
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

async function createUser(data) {
  console.log("创建用户", data);
  // 1. 创建用户表记录
  const id = await addUser(data);
  data.userId = id;
  await Promise.all([
    // 2. 创建授权表记录
    addUserAuth(data),
    // 3. 创建客户经理表记录
    addCustomerManager(data)
  ]);
  return id;
}

async function addUser(params) {
  console.log("添加用户", params);

  const data = {
    name: params.nickName,
    avatarUrl: params.avatarUrl,
    gender: params.gender
  };
  const { _id } = await cloud
    .database()
    .collection("user")
    .add({ data });

  return _id;
}

async function addUserAuth(params) {
  console.log("添加用户授权", params);
  const data = {
    userId: params.userId,
    identityType: "WECHAT",
    identifier: params.openId,
    credential: params.iv,
    status: 1
  };
  const result = await cloud
    .database()
    .collection("user_auth")
    .add({ data });
  return result;
}

async function addCustomerManager(params) {
  console.log("添加客户经理", params);
  const data = {
    userId: params.userId,
    name: params.nickName,
    wechatNickName: params.nickName,
    company: "",
    avatarUrl: params.avatarUrl,
    gender: params.gender,
    job: ""
  };
  const result = await cloud
    .database()
    .collection("customer_manager")
    .add({ data });
  return result;
}

async function getUserAndCustomerManager(userId) {
  const user = await getUser(userId);
  const customerManager = await getCustomerManager(userId);
  user.customerManager = customerManager;
  return user;
}

async function getUser(userId) {
  console.log("获取用户", userId);
  // 1.
  const { data } = await cloud
    .database()
    .collection("user")
    .where({
      _id: userId
    })
    .limit(1)
    .get();
  return data[0];
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

async function updateCustomerManager(userId, params) {
  await cloud
    .database()
    .collection("customer_manager")
    .where({
      userId
    })
    .update({
      data: params
    });
}

function clearData(cloud) {
  return Promise.all(
    ["user_auth", "user", "customer_manager"].map(dbname =>
      cloud
        .database()
        .collection(dbname)
        .where({})
        .get()
        .then(({ data }) =>
          Promise.all(
            data.map(item =>
              cloud
                .database()
                .collection(dbname)
                .doc(item._id)
                .remove()
            )
          )
        )
    )
  );
}

exports.main = async event => {
  if (!event.avatarUrl || !event.nickName) {
    throw new Error("用户小程序版本不是最新");
  }
  console.log("main", event);
  if (!process.env.TCB_ENV || process.env.TCB_ENV === "local") {
    process.env.TCB_ENV = "financial-developmen";
  }
  cloud.init({
    env: process.env.TCB_ENV
  });

  // await clearData(cloud);

  const WXContext = cloud.getWXContext();
  event.openId = WXContext.OPENID;

  // 校验数据是否合法 okay
  // 登陆方式为微信小程序 okay

  // 1. 检查用户是否已经注册
  const userAuth = await getOAuthInfo(WXContext.OPENID);

  let userId = userAuth && userAuth.userId;

  // 2. 未注册进行用户注册
  if (!userId) {
    userId = await createUser(event);
  } else {
    // 更新accessToken
    // 更新客户经理信息下微信相关信息
    await updateCustomerManager(userId, {
      wechatNickName: event.nickName
    });
  }
  const user = await getUserAndCustomerManager(userId);

  console.log("user", user);
  return user;
};
