const store = {}

store.state = {}

store.state.test = ''

// api key
store.state.apiKey = ''

// api secret key
store.state.secretKey = ''

// 币对symbol
store.state.symbolMap = new Map()
store.state.symbolMapChange = 1

// 市场种类
store.state.marketListSet = new Set()
store.state.marketListSetChange = 1

// 币对类型原始对象
store.state.symbolObj = {}
store.state.symbolChange = false

// 币对原始类型价格
store.state.priceObj = {}
store.state.priceChange = false

// 选择币对
store.state.symbol = 'BDB_ETH'

// 深度数据
store.state.depthData = {}
// 深度数据变化
store.state.depthDataChange = 1

// 深度买单
store.state.buyOrders = []
// 深度卖单
store.state.saleOrders = []
/**
 * 同步修改state
 * @type {{}}
 */
store.mutations = {}
store.mutations.testFunc = (state, info) => {
  state.test = info
}
// 设置ApiKey
store.mutations.setApiKey = (state, info) => {
  state.apiKey = info
}
// 设置secretKey
store.mutations.setSecretKey = (state, info) => {
  state.secretKey = info
}

// 设置市场信息
store.mutations.setMarketList = (state, info) => {
  if (!info) return
  state.marketListSet.add(info)
  state.marketListSetChange = Math.min(state.marketListSetChange + 1, 100)

}

// 设置币对信息，包含最新价等
store.mutations.setSymbolMap = (state, info = {}) => {
  let name = info.name
  if (!name) return
  let symbolObj = state.symbolMap.get(name)
  !symbolObj && state.symbolMap.set(name, symbolObj = {})
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
  state.symbolMapChange = Math.min(state.symbolMapChange + 1, 100)
}


// 修改币对原始类型对象
store.mutations.changeSymbolObj = (state, info) => {
  state.symbolObj = Object.assign(state.symbolObj, info)
  state.symbolChange = !state.symbolChange
}

// 修改币对原始价格对象
store.mutations.changePriceObj = (state, info) => {
  state.priceObj = Object.assign(state.priceObj, info)
  state.priceChange = !state.priceChange
}

// 选择币对
store.mutations.setSymbol = (state, info) => {
  state.symbol = info
}

// 深度图变化
store.mutations.changeDepthData = (state, info) => {
  console.warn('this is info', info)

  state.depthData = info
  state.depthDataChange = Math.min(state.depthDataChange + 1, 100)
}


// 深度买单
store.mutations.setBuyOrders = (state, info) => {
  state.buyOrders = info
}
// 深度卖单
store.state.setSaleOrders = (state, info) => {
  state.saleOrders = info
}


/**
 * 异步修改state
 * @type {{}}
 */
store.actions = {}

store.getters = {}


export default store
