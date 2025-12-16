import regeneratorRuntime from "../../utils/regenerator-runtime";



/**
 * 自己编写到产品到状态： 1. 未发布 2. 已发布 3. 已过期
 */

Component({
  data: {
    statusEmun: {
      UNPBLISHED: '未发布',
      PBLISHED: '已发布',
      EXPIRED: '已过期'
    },
    list: [
      {
        name: '新新贷款',
        cover: '',
        brife: '这是一个个特别到贷款产品',
        createAt: '2019-12-12 09:12 ',
        owner: '张三',
        status: 'UNPBLISHED'
      },
      {
        name: '新新贷款',
        cover: '11',
        brife: '这是一个个特别到贷款产品',
        createAt: '2019-12-12 09:12 ',
        owner: '张三',
        status: 'UNPBLISHED'
      }
    ]
  },

  getStatusName (status) {
    return this.statusEmun[status]
  }
});

