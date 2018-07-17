const root = {}
root.name = 'TradingHallDepth'


/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}
/*---------------------------- props ----------------------------*/
root.props = {}

root.props.depthData = {
  type: Object,
  required: true
}

root.props.symbolList = {
  type: Array,
  required: true
}


/*---------------------------- 数据 ----------------------------*/

root.data = function () {
  return {}
}

/*---------------------------- 生命周期 ----------------------------*/

root.created = function () {

}

/*---------------------------- 计算 ----------------------------*/

root.computed = {}
// 选择币对
root.computed.symbol = function () {
  return this.$store.state.symbol
}

// 卖单
root.computed.buyOrder = function () {
  return this.depthData.buyOrders && this.depthData.buyOrders.slice(0, 12)
}

// 买单
root.computed.saleOrder = function () {
  return this.depthData.sellOrders && this.depthData.sellOrders.slice(0, 12)
}


// 深度
root.computed.deep = function () {
  let ans = {}
  this.symbolList.forEach(v => {
    if (v.name === this.symbol) {
      ans = v
    }
  })
  return this.$globalFunc.accMul(ans.baseMinimum || 0, 100000)
}


/*---------------------------- 方法 ----------------------------*/

root.methods = {}

// 深度计算
root.methods.computedDeep = function (amount) {

  return Math.max(100 - Math.min(this.toFixed(this.$globalFunc.accDiv(amount, this.deep || 100000) || 100, 4) * 100), 0) || 0
}

root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}

export default root
