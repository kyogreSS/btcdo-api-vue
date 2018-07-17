const root = {}

root.name = 'TradingHallHeader'


/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}
/*---------------------------- props ----------------------------*/
root.props = {}

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

root.data = function () {
  return {}
}

/*---------------------------- 计算 ----------------------------*/

root.computed = {}

root.computed.symbol = function () {
  return this.$store.state.symbol
}

root.computed.selectSymbolObj = function () {
  let ans = {}
  this.symbolList.forEach(v => {
    if (v.name === this.symbol) {
      ans = v
    }
  })
  return ans
}

root.methods = {}


root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}



export default root
