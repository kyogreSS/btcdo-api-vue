const root = {}
root.name = 'TradeForHandOperationDetail'

/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}

/*---------------------------- props ----------------------------*/
root.props = {}
root.props.type = {
  type: String,
  required: true
}

/*---------------------------- 数据 ----------------------------*/

root.data = function () {
  return {
    price: '',
    amount: '',
    range: 0,
    fireBDB: 'true',
  }
}

/*---------------------------- 生命周期 ----------------------------*/

root.created = function () {

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

root.computed.symbol = function () {
  return this.$store.state.symbol
}
root.computed.symbolOne = function () {
  return this.$store.state.symbol.split('_')[0]
}
root.computed.symbolTwo = function () {
  return this.$store.state.symbol.split('_')[1]
}
root.computed.symbolOneAvailable = function () {
  // console.warn(')
  return this.$store.state.accountsMap && this.$store.state.accountsMap.get(this.symbolOne) && this.$store.state.accountsMap.get(this.symbolOne).available || 0
}

root.computed.symbolTwoAvailable = function () {
  return this.$store.state.accountsMap && this.$store.state.accountsMap.get(this.symbolTwo) && this.$store.state.accountsMap.get(this.symbolTwo).available || 0
}

/*---------------------------- 观察 ----------------------------*/
root.watch = {}


/*---------------------------- 方法 ----------------------------*/
root.methods = {}
root.methods.inputRange = function () {
  if (this.type === 'sale') {
    this.amount = this.toFixed(this.$globalFunc.accMul(this.symbolOneAvailable, this.$globalFunc.accDiv(Math.max(Math.min(this.range, 100), 0), 100)), 8)
  }
  if (this.type === 'buy') {
    this.amount = this.toFixed(this.$globalFunc.accMul(this.$globalFunc.accDiv(this.symbolTwoAvailable, this.price || 1), this.$globalFunc.accDiv(Math.max(Math.min(this.range, 100), 0), 100)), 8)
  }
}

root.methods.inputAmount = function () {
  if (this.type === 'sale') {
    this.range = this.toFixed(Math.min(this.$globalFunc.accDiv(this.amount, this.symbolOneAvailable), 1) * 100, 0)
  }
  if (this.type === 'buy') {
    this.range = this.toFixed(Math.min(this.$globalFunc.accDiv(this.amount, this.$globalFunc.accDiv(this.symbolTwoAvailable, this.price || 1)), 1) * 100, 0)
  }
}

root.methods.commit = function () {
  if (!this.amount || !this.price) return
  if (this.type === 'sale') {
    this.$api.createSaleOrder(this.price, this.amount, this.symbol, this.fireBDB, {
      apiKey: this.apiKey,
      secretKey: this.secretKey
    })
  }
  if (this.type === 'buy') {
    this.$api.createBuyOrder(this.price, this.amount, this.symbol, this.fireBDB, {
      apiKey: this.apiKey,
      secretKey: this.secretKey
    })
  }
}


root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}


export default root
