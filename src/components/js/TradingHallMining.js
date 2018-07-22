const root = {}

root.name = 'TradingHallMining'


root.components = {
  'InputAPIKey': resolve => require(['../vue/InputAPIKey'], resolve),
  'TradeForHandOperation': resolve => require(['../vue/TradeForHandOperation'], resolve),
  'TradeForMining': resolve => require(['../vue/TradeForMining'], resolve),
}



export default root
