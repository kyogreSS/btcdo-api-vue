const store = {}

store.state = {}

store.state.test = ''

// api key
store.state.apiKey = ''

// api secret key
store.state.secretKey = ''

// 币对symbol
store.state.symbolMap = new Map()


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
// 设置
store.mutations.setSymbolMap = (state, name, info) => {
  let symbolObj = state.symbolMap.get(name)
  !symbolObj && state.symbolMap.set(name, symbolObj = {})

  symbolObj.name = name || symbolObj.name
  symbolObj.currentPrice = info.currentPrice || symbolObj.currentPrice
  symbolObj.volume = info.volume || symbolObj.volume
  symbolObj.startTime = info.startTime || symbolObj.startTime
  symbolObj.endTime = info.endTime || symbolObj.endTime


}


/**
 * 异步修改state
 * @type {{}}
 */
store.actions = {}

store.getters = {}


export default store
