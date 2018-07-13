const root = {}
root.name = 'TradingHall'

root.components = {
  'TradingHallHeader': resolve => require(['../vue/TradingHallHeader'], resolve),
  'TradingHallDepth': resolve => require(['../vue/TradingHallDepth'], resolve),
}

root.created = function () {

}

export default root
