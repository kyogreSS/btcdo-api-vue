const root = {}
root.name = 'TradingHall'

/*---------------------------- 组件 ----------------------------*/

root.components = {
  'TradingHallHeader': resolve => require(['../vue/TradingHallHeader'], resolve),
  'TradingHallDepth': resolve => require(['../vue/TradingHallDepth'], resolve),
  'TradingHallMining': resolve => require(['../vue/TradingHallMining'], resolve),
  'TradeHallMarket': resolve => require(['../vue/TradeHallMarket'], resolve),
  'TradeHallAccounts': resolve => require(['../vue/TradeHallAccounts'], resolve),
  'TradeHallLatestDeal': resolve => require(['../vue/TradeHallLatestDeal'], resolve),
}

/*---------------------------- 数据 ----------------------------*/
root.data = function () {
  return {
    marketList: [],
    symbolList: [],
    depthData: {},
    symbolMap: new Map(),
    symbolMapChange: 1,
    marketListSet: new Set(),
    marketListSetChange: 1,
    symbolObj: {},
    symbolObjChange: 1,
    priceObj: {},
    priceObjChange: 1,
    topic_tick: [],
  }
}

/*---------------------------- 生命周期 ----------------------------*/

root.created = function () {

  this.init()

  this.initSocket(this.symbol)

}


/*---------------------------- 计算 ----------------------------*/

root.computed = {}

root.computed.apiKey = function () {
  return this.$store.state.apiKey
}
root.computed.secretKey = function () {
  return this.$store.state.secretKey
}


// 选择的币对
root.computed.symbol = function () {
  return this.$store.state.symbol
}


root.watch = {}

root.watch.symbolObjChange = function (newVal, oldVal) {
  this.symbolObj && this.symbolObj.symbols && this.symbolObj.symbols.forEach(v => {
    this.setMarketList(v.quoteName)
    this.setSymbolMap(v)
  })
}

root.watch.priceObjChange = function (newVal, oldVal) {
  Object.keys(this.priceObj).forEach(v => {
    this.setMarketList(v.split('_')[1])
    this.setSymbolMap({
      name: v,
      currentPrice: this.priceObj[v][4],
      volume: this.priceObj[v][5],
      riseAndFall: this.$globalFunc.accSub(this.priceObj[v][4], this.priceObj[v][1]),
      highestPrice: this.priceObj[v][2],
      minimumPrice: this.priceObj[v][3],
    })
  })
}

root.watch.symbolMapChange = function (newVal, oldVal) {
  this.symbolList = [...this.symbolMap.values()]
}

root.watch.marketListSetChange = function (newVal, oldVal) {
  this.marketList = [...this.marketListSet]
}

root.watch.symbol = function (newVal, oldVal) {
  this.$socket.emit('unsubscribe', {symbol: oldVal});
  this.$socket.emit('subscribe', {symbol: newVal});
  this.initDepthData()
}


/*---------------------------- 方法 ----------------------------*/
root.methods = {}
root.methods.init = async function () {
  await this.initSymbols()
  await this.sleep(200)
  await this.initPrice()
  await this.sleep(200)
  await this.initDepthData()
}

// 初始化币对
root.methods.initSymbols = function () {
  return this.$api.getSymbols().then(({data}) => {
    typeof data === 'string' && (data = JSON.parse(data))
    this.symbolObj = Object.assign(this.symbolObj, data)
    this.symbolObjChange++
    if (this.symbolObjChange > 100) this.symbolObjChange = 1
  }).catch(err => {

  })
}
// 初始化价格  [时间戳，开，高，低，收，量]
root.methods.initPrice = function () {
  return this.$api.getAllSymbolTransactionInfo().then(({data}) => {
    typeof data === 'string' && (data = JSON.parse(data))
    this.priceObj = Object.assign(this.priceObj, data)
    this.priceObjChange++
    if (this.priceObjChange > 100) this.priceObjChange = 1
  }).catch(err => {

  })
}

// 初始化深度
root.methods.initDepthData = function () {
  return this.$api.getSpecifiedTradeDepth(this.symbol).then(({data}) => {
    typeof data === 'string' && (data = JSON.parse(data))
    this.depthData = data
  }).catch(err => {

  })
}


// 初始化socket
root.methods.initSocket = function (newSymbol, oldSymbol) {
  // 订阅某个币对的信息
  this.$socket.emit('unsubscribe', {symbol: oldSymbol});
  this.$socket.emit('subscribe', {symbol: newSymbol});


  // 接收所有币对实时价格
  this.$socket.on({
    key: 'topic_prices', bind: this, callBack: (data) => {
      this.priceObj = Object.assign(this.priceObj, data)
      this.priceObjChange++
      if (this.priceObjChange > 100) this.priceObjChange = 1
    }
  })

  // 获取所有币对价格
  this.$socket.on({
    key: 'topic_tick', bind: this, callBack: (message) => {
      if (message instanceof Array) {
        this.setSymbolMap({name: message[0].symbol, currentPrice: message[0].price})
        this.topic_tick = message
        return
      }
      this.setSymbolMap({name: message.symbol, currentPrice: message.price})
      this.topic_tick.unshift(message)
    }
  })

  // 获取深度图信息 左侧列表
  this.$socket.on({
    key: 'topic_snapshot', bind: this, callBack: (data) => {
      typeof data === 'string' && (data = JSON.parse(data))
      this.depthData = data
    }
  })
}


// symbolMap修改
root.methods.setSymbolMap = function (info) {
  let name = info.name
  if (!name) return
  let symbolObj = this.symbolMap.get(name)
  !symbolObj && this.symbolMap.set(name, symbolObj = {})
  symbolObj.name = name || symbolObj.name // 币种名称
  symbolObj.startTime = info.startTime || symbolObj.startTime // 开放时间
  symbolObj.endTime = info.endTime || symbolObj.endTime // 结束时间
  symbolObj.quoteMinimum = info.quoteMinimum || symbolObj.quoteMinimum // 最小精度
  symbolObj.quoteScale = info.quoteScale || symbolObj.quoteScale // 最小精度
  symbolObj.baseScale = info.baseScale || symbolObj.baseScale // 最小精度
  symbolObj.baseMinimum = info.baseMinimum || symbolObj.baseMinimum // 深度
  symbolObj.currentPrice = info.currentPrice || symbolObj.currentPrice // 时价
  symbolObj.volume = info.volume || symbolObj.volume // 成交量
  symbolObj.riseAndFall = info.riseAndFall || symbolObj.riseAndFall // 涨跌幅
  symbolObj.highestPrice = info.highestPrice || symbolObj.highestPrice // 最高价
  symbolObj.minimumPrice = info.minimumPrice || symbolObj.minimumPrice //最低价
  this.symbolMapChange++
  if (this.symbolMapChange > 100) this.symbolMapChange = 1
}


// 设置市场信息
root.methods.setMarketList = function (info) {
  if (!info) return
  this.marketListSet.add(info)

  this.marketListSetChange++
  if (this.marketListSetChange > 100) this.marketListSetChange = 1
}

// 等待
root.methods.sleep = function (time) {
  return this.$api.sleep(time)
}


export default root
