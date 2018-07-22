const store = {}

store.state = {}

store.state.test = ''

// api key
store.state.apiKey = ''

// api secret key
store.state.secretKey = ''

// 选择币对
store.state.symbol = 'BDB_ETH'

// 账户信息
store.state.accountsMap = new Map()
store.state.accountsChange = 1


/**
 * 同步修改state
 * @type {{}}
 */
store.mutations = {}

// 设置ApiKey
store.mutations.setApiKey = (state, info) => {
  state.apiKey = info
}
// 设置secretKey
store.mutations.setSecretKey = (state, info) => {
  state.secretKey = info
}

// 选择币对
store.mutations.setSymbol = (state, info) => {
  state.symbol = info
}

// 账户信息
store.mutations.setAccounts = (state, info) => {
  state.accountsMap = info
  state.accountsChange++ > 100 && (state.accountsChange = 1)
}


/**
 * 异步修改state
 * @type {{}}
 */
store.actions = {}

store.getters = {}


export default store
