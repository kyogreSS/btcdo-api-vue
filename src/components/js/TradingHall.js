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

// 币种处理数据
root.computed.symbolMap = function () {
  return this.$store.state.symbolMap
}
root.computed.symbolMapChange = function () {
  return this.$store.state.symbolMapChange
}
// 市场列表处理数据
root.computed.marketListSet = function () {
  return this.$store.state.marketListSet
}
root.computed.marketListSetChange = function () {
  return this.$store.state.marketListSetChange
}

// 币种原始数据
root.computed.symbolObj = function () {
  return this.$store.state.symbolObj
}

root.computed.symbolObjChange = function () {
  return this.$store.state.symbolChange
}


// 价格原始数据
root.computed.priceObj = function () {
  return this.$store.state.priceObj
}
root.computed.priceObjChange = function () {
  return this.$store.state.priceChange
}

// 选择的币对
root.computed.symbol = function () {
  return this.$store.state.symbol
}

// 深度图
root.computed.storeDepthData = function () {
  return this.$store.state.depthData
}
// 深度图变化
root.computed.depthDataChange = function () {
  return this.$store.state.depthDataChange
}

root.watch = {}
root.watch.symbolObjChange = function (newVal, oldVal) {
  this.symbolObj && this.symbolObj.symbols && this.symbolObj.symbols.forEach(v => {
    this.$store.commit('setMarketList', v.quoteName)
    this.$store.commit('setSymbolMap', v)
  })
}

root.watch.priceObjChange = function (newVal, oldVal) {
  Object.keys(this.priceObj).forEach(v => {
    this.$store.commit('setMarketList', v.split('_')[1])
    this.$store.commit('setSymbolMap', {
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
    this.$store.commit('changeSymbolObj', data)
    console.warn('this is symbol', data)
  }).catch(err => {

  })
}
// 初始化价格  [时间戳，开，高，低，收，量]
root.methods.initPrice = function () {
  return this.$api.getAllSymbolTransactionInfo().then(({data}) => {
    typeof data === 'string' && (data = JSON.parse(data))
    this.$store.commit('changePriceObj', data)
  }).catch(err => {
  })
}

// 初始化深度
root.methods.initDepthData = function () {
  return this.$api.getSpecifiedTradeDepth(this.symbol).then(({data}) => {
    typeof data === 'string' && (data = JSON.parse(data))
    this.$store.commit('changeDepthData', data)
    this.$store.commit('setBuyOrders', data.buyOrders)
    this.$store.commit('setSaleOrders', data.saleOrders)
    // console.warn('this is data', data)
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
    key: 'topic_prices', bind: this, callBack: (message) => {
      this.$store.commit('changePriceObj', message)
    }
  })

  // 获取所有币对价格
  this.$socket.on({
    key: 'topic_tick', bind: this, callBack: (message) => {
      this.$store.commit('setSymbolMap', {name: message.symbol, currentPrice: message.price})
    }
  })

  // 获取深度图信息 左侧列表
  this.$socket.on({
    key: 'topic_snapshot', bind: this, callBack: (data) => {
      typeof data === 'string' && (data = JSON.parse(data))
      this.$store.commit('changeDepthData', data)
      this.depthData = data
      // this.$store.commit('setBuyOrders', data.buyOrders)
      // this.$store.commit('setSaleOrders', data.saleOrders)
    }
  })

}


root.methods.sleep = function (time) {
  return this.$api.sleep(time)
}


export default root
