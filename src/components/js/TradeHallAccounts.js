const root = {}

root.name = 'TradeHallAccounts'


/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}

/*---------------------------- 数据 ----------------------------*/
root.data = function () {
  return {
    currencyMap: new Map(),
    currencyChange: 1,
    currency: [],
    interval: null,
  }
}

/*---------------------------- 生命周期 ----------------------------*/

root.created = function () {
  this.interval && clearInterval(this.interval)
  this.interval = setInterval(this.getAccounts, 7000)
  this.$eventBus.listen(this, 'getAccounts', this.getAccounts)
}

root.beforeDestroy = function () {
  this.interval && clearInterval(this.interval)
  this.$eventBus.unListen(this)
}


/*---------------------------- 计算 ----------------------------*/

root.computed = {}

root.computed.apiKey = function () {
  return this.$store.state.apiKey
}
root.computed.secretKey = function () {
  return this.$store.state.secretKey
}
root.computed.isLogin = function () {
  return this.$store.state.apiKey && this.$store.state.secretKey
}
root.computed.symbolOne = function () {
  return this.$store.state.symbol.split('_')[0]
}
root.computed.symbolTwo = function () {
  return this.$store.state.symbol.split('_')[1]
}

/*---------------------------- 观察 ----------------------------*/

root.watch = {}

root.watch.isLogin = function (newVal, oldVal) {
  if (newVal === '') return
  this.getAccounts()
}

root.watch.currencyChange = function (newVal, oldVal) {
  this.currency = [...this.currencyMap.values()]
  this.$store.commit('setAccounts', this.currencyMap)
}


/*---------------------------- 方法 ----------------------------*/
root.methods = {}

root.methods.getAccounts = function () {
  if (!this.isLogin) return
  this.$api.getAccounts({apiKey: this.apiKey, secretKey: this.secretKey})
    .then(({data}) => {
      typeof data === 'string' && (data = JSON.parse(data))
      data.accounts && data.accounts.forEach(v => {
        let balance = this.currencyMap.get(v.currency)
        !balance && this.currencyMap.set(v.currency, balance = {
          currency: v.currency,
          available: 0,
          frozen: 0,
          total: 0,
        })
        if (v.type === 'SPOT_AVAILABLE') {
          balance.available = v.balance
        }
        if (v.type === 'SPOT_FROZEN') {
          balance.frozen = v.balance
        }
        balance.total = this.$globalFunc.accAdd(balance.frozen, balance.available)
      })
      this.currencyChange++ > 100 && (this.currencyChange = 1)
    }).catch(err => {
    console.warn('请检查输入的API是否正确')
  })
}


root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}


export default root
