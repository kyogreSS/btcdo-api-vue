const root = {}

root.name = 'TradeHallLatestDeal'


/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}

/*---------------------------- props ----------------------------*/
root.props = {}


root.props.topic_tick = {
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


/*---------------------------- 方法 ----------------------------*/
root.methods = {}


root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}

root.methods.formatDateUitl = function (time, formatString = 'hh:mm:ss') {
  return this.$globalFunc.formatDateUitl(time, formatString)
}

export default root
