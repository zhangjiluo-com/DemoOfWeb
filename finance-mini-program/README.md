# 融金小助手

1. 客户经理可以新建 更新 删除 TA 记录的客户资料
2. 客户经理可以分享 TA 的客户的资料 给其他人进行阅读浏览
   同时默认不会分享出客户的关键信息 比如身份证号码，联系方式，联系地址等

1) 登录功能 okay
2) 编辑个人客户经理资料 okay
3) 客户经理信息展示功能 okay
4) 分享功能 okay
5) 分享客户资料授权管理 okay
6) 分享客户资料授权作用 okay

1. user 用户表 用户相关信息 专柜用户等级 name 性别
   id
   username
   password
   name
   avatarUrl
   gender

2. o_auth 第三方表 第三方信息 open_id access_token name avatarUrl
   openType
   openId
   accessToken
   name
   avatarUrl
   gender

3. customer_manager 客户经理表 作为客户经理的相关信息 name 职位 公司 等级 经验 性别
   name
   job
   corp
   points
   gender
4. customer 客户表 X
5. customer_info 客户资料表 客户经理记录的客户资料
6. feedback 反馈建议表 用户对平台的反馈建议
7. customer_manager_products 客户经理产品表

个人中心页面：

1. 产品列表页面
