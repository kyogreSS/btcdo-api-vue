import httpMethod from './httpMethod'
import {Decimal} from 'decimal.js'

export default class {
  constructor() {

  }

  getAccounts({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ACCOUNTS', {params, apiKey, secretKey, query})
  }


  // 获取充值记录 参数 currency为币种，如 'ETH'
  getDepositRecord(currency, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_DEPOSIT_RECORD', {urlFragment: `/${currency}`, params, apiKey, secretKey, query})
  }


  // 获取所有币种信息
  getCurrencyInfo({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_CURRENCY', {params, apiKey, secretKey, query})
  }


  // 获取指定币种信息 参数 currency为币种，如 'ETH'
  getSpecifiedCurrencyInfo(currency, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_CURRENCY', {urlFragment: `/${currency}`, params, apiKey, secretKey, query})
  }


  // 获取错误信息
  getErrorCode({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ERROR_CODE', {params, apiKey, secretKey, query})
  }


  // 获取所有交易对
  getSymbols({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_SYMBOL', {params, apiKey, secretKey, query})
  }


  // 获取指定交易对 参数symbol为交易对 交易币种_计价币种 例：BDB_ETH
  getSpecifiedSymbol(symbol, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_SYMBOL', {urlFragment: `/${symbol}`, params, apiKey, secretKey, query})
  }


  // 获取系统时间
  getSystemTime({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_SYSTEM_TIME', {params, apiKey, secretKey, query})
  }


  // 获取指定交易对行情数据 参数 symbol为交易对 交易币种_计价币种 例：BDB_ETH
  // type为行情类型，字符串，分别为：
  // K_1_SEC：秒K（最近1小时）
  // K_1_MIN：分钟K(最近24小时）
  // K_1_HOUR：小时K（最近30天）
  // K_1_DAY：日K
  getSpecifiedSymbolTradeInfo(symbol, type, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_SPECIFIED_SYMBOL_TRADE_INFO', {
      urlFragment: `/${symbol}/${type}`,
      params,
      apiKey,
      secretKey,
      query
    })
  }


  // 获取指定交易对深度 参数symbol为交易对 交易币种_计价币种 例：BDB_ETH
  getSpecifiedTradeDepth(symbol, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_SPECIFIED_TRADE_DEPTH', {urlFragment: `/${symbol}`, params, apiKey, secretKey, query})
  }


  // 获取所有交易对成交信息
  getAllSymbolTransactionInfo({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ALL_SYMBOL_TRANSACTION_INFO', {params, apiKey, secretKey, query})
  }


  // 获取最近交易记录（默认100条记录）
  getLatelyTransactionRecord({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ORDERS', {params, apiKey, secretKey, query})
  }


  // 创建订单（挂买单、挂卖单、挂撤买单、挂撤卖单）
  // amount	float	NO	数量（限价买/卖单必输）
  // customFeatures	int	NO	订单特性 65536：燃烧DBD(使用BDB抵扣手续费)
  // orderType	String	YES	订单类型 BUY_LIMIT：限价买单； SELL_LIMIT：限价卖单； CANCEL_BUY_LIMIT：限价买单撤单； CANCEL_SELL_LIMIT：限价卖单撤单
  // price	float	NO	价格（限价买/卖单必输）
  // symbol	String	YES	交易对
  // targetOrderId	Long	NO	原订单ID（撤销订单必输）
  createOrder({
                amount,
                customFeatures = 65536,
                orderType,
                price,
                symbol,
                targetOrderId,
              }, {apiKey, secretKey, query} = {}, openWarn = true) {

    if (!orderType) {
      openWarn && console.warn('请输入订单类型！可输入的类型有：BUY_LIMIT：限价买单 SELL_LIMIT：限价卖单 CANCEL_BUY_LIMIT：限价买单撤单 CANCEL_SELL_LIMIT：限价卖单撤单')
      return 'type wrong'
    }
    if ((orderType === 'SELL_LIMIT' || orderType === 'BUY_LIMIT') && (!price || !amount)) {
      openWarn && console.warn('挂单请输入价格和数量')
      return 'no limit'
    }
    if ((orderType === 'CANCEL_BUY_LIMIT' || orderType === 'CANCEL_SELL_LIMIT') && (!targetOrderId)) {
      openWarn && console.warn('撤单请输入订单ID')
      return 'no order id'
    }
    customFeatures !== 65536 && openWarn && console.warn('此笔交易不开启BDB燃烧')
    return httpMethod('POST_ORDERS', {
      params: {
        amount,
        customFeatures,
        orderType,
        price,
        symbol,
        targetOrderId,
      },
      apiKey,
      secretKey,
      query
    })
  }


  // 获取订单详情信息 参数orderId为订单编号
  getOrderInfo(orderId, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ORDERS', {urlFragment: `/${orderId}`, params, apiKey, secretKey, query})
  }


  // 获取订单撮合信息 参数orderId为订单编号
  getMatchesOrderInfo(orderId, {params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ORDERS', {
      urlFragment: `/${orderId}/matches`,
      params,
      apiKey,
      secretKey,
      query
    })
  }


  // 等待n毫秒，配合await使用
  sleep(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time)
    })
  }


  // 挂买单  参数按顺序为 价格 数量 币对 是否燃烧BDB
  createBuyOrder(price, amount, symbol, fireBDB = true, {apiKey, secretKey, query} = {}) {
    return this.createOrder({
      price,
      amount,
      symbol,
      customFeatures: fireBDB && 65536 || 0,
      orderType: 'BUY_LIMIT'
    }, {apiKey, secretKey, query})
  }


  // 挂卖单 参数按顺序为 价格 数量 币对 是否燃烧BDB
  createSaleOrder(price, amount, symbol, fireBDB = true, {apiKey, secretKey, query} = {}) {
    return this.createOrder({
      price,
      amount,
      symbol,
      customFeatures: fireBDB && 65536 || 0,
      orderType: 'SELL_LIMIT'
    }, {apiKey, secretKey, query})
  }


  // 撤买单 参数按顺序为 订单ID 币对
  cancelBuyOrder(targetOrderId, symbol, {apiKey, secretKey, query} = {}) {
    return this.createOrder({
      targetOrderId,
      symbol,
      orderType: 'CANCEL_BUY_LIMIT',
    }, {apiKey, secretKey, query})
  }


  // 撤卖单 参数按顺序为 订单ID 币对
  cancelSaleOrder(targetOrderId, symbol, {apiKey, secretKey, query} = {}) {
    return this.createOrder({
      targetOrderId,
      symbol,
      orderType: 'CANCEL_SELL_LIMIT',
    }, {apiKey, secretKey, query})
  }


  // 找到当前未成交的卖单 参数分别为 币对 开始编号 查询个数 均为可选参数，如果不指定，默认查所有币种的100条数据 返回数组 [{id:'订单id',symbol:'订单币对',status:'订单状态',type:'订单类型'}]
  async findSaleOrder({symbol, params, apiKey, secretKey, query} = {}) {
    let ans = []
    await this.getLatelyTransactionRecord({params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.orders && data.orders.forEach((v, i) => {
        if ((symbol ? v.symbol === symbol : true) && v.status !== 'PARTIAL_CANCELLED' && v.status !== 'FULLY_CANCELLED' && v.status !== 'FULLY_FILLED' && v.type === 'SELL_LIMIT') {
          ans.push({
            id: v.id,
            symbol: v.symbol,
            status: v.status,
            type: v.type
          })
        }
      })
    })
    return ans
  }


  // 找到当前未成交的卖单 参数分别为 币对 开始编号 查询个数 均为可选参数，如果不指定，默认查所有币种的100条数据 返回数组 [{id:'订单id',symbol:'订单币对',status:'订单状态',type:'订单类型'}]
  async findSaleOrder({symbol, params, apiKey, secretKey, query} = {}) {
    let ans = []
    await this.getLatelyTransactionRecord({params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.orders && data.orders.forEach((v, i) => {
        if ((symbol ? v.symbol === symbol : true) && v.status !== 'PARTIAL_CANCELLED' && v.status !== 'FULLY_CANCELLED' && v.status !== 'FULLY_FILLED' && v.type === 'SELL_LIMIT') {
          ans.push({
            id: v.id,
            symbol: v.symbol,
            status: v.status,
            type: v.type
          })
        }
      })
    })
    return ans
  }


  // 找到当前未成交的买单 参数分别为 币对 开始编号 查询个数 均为可选参数，如果不指定，默认查所有币种的100条数据 返回数组 [{id:'订单id',symbol:'订单币对',status:'订单状态',type:'订单类型'}]
  async findBuyOrder({symbol, params, apiKey, secretKey, query} = {}) {
    let ans = []
    await this.getLatelyTransactionRecord({params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.orders && data.orders.forEach((v, i) => {
        if ((symbol ? v.symbol === symbol : true) && v.status !== 'PARTIAL_CANCELLED' && v.status !== 'FULLY_CANCELLED' && v.status !== 'FULLY_FILLED' && v.type === 'BUY_LIMIT') {
          ans.push({
            id: v.id,
            symbol: v.symbol,
            status: v.status,
            type: v.type
          })
        }
      })
    })
    return ans
  }


  // 找到当前未成交的所有订单 参数分别为 币对 开始编号 查询个数 均为可选参数，如果不指定，默认查所有币种的100条数据 返回数组 [{id:'订单id',symbol:'订单币对',status:'订单状态',type:'订单类型'}]
  async findAllOrder({symbol, params, apiKey, secretKey, query} = {}) {
    let ans = []
    await this.getLatelyTransactionRecord({params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.orders && data.orders.forEach((v, i) => {
        if ((symbol ? v.symbol === symbol : true) && v.status !== 'PARTIAL_CANCELLED' && v.status !== 'FULLY_CANCELLED' && v.status !== 'FULLY_FILLED') {
          ans.push({
            id: v.id,
            symbol: v.symbol,
            status: v.status,
            type: v.type
          })
        }
      })
    })
    return ans
  }


  // 撤销一列订单 参数为撤销的订单数组 [{id:'订单id',symbol:'订单币对',type:'订单类型'}] 返回布尔值 是否撤销成功
  async cancelAppointedOrder(orderArr, {params, apiKey, secretKey, query} = {}) {
    let cancelReady = true
    await Promise.all(orderArr.map((v, i) => {
      if (v.type === 'BUY_LIMIT') {
        return this.cancelBuyOrder(v.id, v.symbol, {params, apiKey, secretKey, query})
      }
      if (v.type === 'SELL_LIMIT') {
        return this.cancelSaleOrder(v.id, v.symbol, {params, apiKey, secretKey, query})
      }
    })).then(res => {

    }).catch(err => {
      cancelReady = false
    })
    return cancelReady
  }


  // 撤销所有订单 返回布尔值 是否全撤成功
  async cancelAllOrder({params, apiKey, secretKey, query} = {}) {
    let cancelOrderArr = await this.findAllOrder({params, apiKey, secretKey, query})
    return this.cancelAppointedOrder(cancelOrderArr, {params, apiKey, secretKey, query})
  }


  // 获取最高的买单价格和最低的卖单价格 返回一个数组 [价格最高的买单 价格最低的卖单]
  async getLatelyBuyAndSalePrice(symbol, {params, apiKey, secretKey, query} = {}) {
    let lastBuy, lastSale
    await this.getSpecifiedTradeDepth(symbol, {params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      lastBuy = data.buyOrders.sort((a, b) => b.price - a.price).shift()
      lastSale = data.sellOrders.sort((a, b) => a.price - b.price).shift()
    })
    return [lastBuy, lastSale]
  }


  // 获取我的账户某个币种的信息 返回一个数组 [可用金额 冻结金额]
  async getSpecifiedAccount(currency, {params, apiKey, secretKey, query} = {}) {
    let myCurrencyAvailable = new Decimal(0),
      myCurrencyFrozen = new Decimal(0)
    await this.getAccounts({params, apiKey, secretKey, query}).then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.accounts && data.accounts.forEach((v, i) => {
        if (v.currency == currency) {
          if (v.type === 'SPOT_AVAILABLE') {
            myCurrencyAvailable = myCurrencyAvailable.plus(new Decimal(v.balance))
          }
          if (v.type === 'SPOT_FROZEN') {
            myCurrencyFrozen = myCurrencyFrozen.plus(new Decimal(v.balance))
          }
        }
      })
    })
    return [myCurrencyAvailable.toString(), myCurrencyFrozen.toString()]
  }


  // 加法
  accAdd(num1, num2) {
    return Decimal.add(num1, num2).toString()
  }

  // 乘法
  accMul(num1, num2) {
    return Decimal.mul(num1, num2).toString()
  }

  // 减法
  accSub(num1, num2) {
    return Decimal.sub(num1, num2).toString()
  }

  // 除法
  accDiv(num1, num2) {
    return Decimal.div(num1, num2).toString()
  }

  // 取平均数
  getAverage(num1, num2) {
    return (Decimal.add(num1, num2).div(2)).toString()
  }


}

