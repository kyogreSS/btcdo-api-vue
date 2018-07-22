const root = {}

root.name = 'TradeHallMarket'

/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}
/*---------------------------- props ----------------------------*/
root.props = {}

root.props.marketList = {
  type: Array,
  required: true
}

root.props.symbolList = {
  type: Array,
  required: true
}

/*---------------------------- 数据 ----------------------------*/

root.data = function () {
  return {
    selectMarket: ''
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
root.computed.computedSelectMarket = function () {
  return this.selectMarket || this.marketList[0]
}
root.computed.computedSymbolList = function () {
  return this.symbolList.filter(value => {
    if (value.name.split('_')[1] === this.computedSelectMarket)
      return value
  })
}

// 选择币对
root.computed.symbol = function () {
  return this.$store.state.symbol
}

/*---------------------------- 监听 ----------------------------*/
root.watch = {}


/*---------------------------- 方法 ----------------------------*/

root.methods = {}
root.methods.init = function () {

}
root.methods.changeSelectMarket = function (market) {
  this.selectMarket = market
}

root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}

root.methods.selectSymbol = function (symbol) {
  this.$store.commit('setSymbol', symbol)
  this.$cookies.set('user_symbol_cookie', symbol, 60 * 60 * 24);

}

export default root
