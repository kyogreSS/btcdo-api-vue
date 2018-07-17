const root = {}
root.name = 'TradingHall'

root.components = {
  'TradingHallHeader': resolve => require(['../vue/TradingHallHeader'], resolve),
  'TradingHallDepth': resolve => require(['../vue/TradingHallDepth'], resolve),
  'TradingHallMining': resolve => require(['../vue/TradingHallMining'], resolve),
  'TradeHallMarket': resolve => require(['../vue/TradeHallMarket'], resolve),
  'TradeHallAccounts': resolve => require(['../vue/TradeHallAccounts'], resolve),
  'TradeHallLatestDeal': resolve => require(['../vue/TradeHallLatestDeal'], resolve),
}

root.created = function () {

  // this.init()

}


/*---------------------------- 方法 ----------------------------*/
root.methods = {}
root.methods.init = async function () {

  let apiKey = ''
  let secretKey = ''
  let ans = await this.$api.getLatelyBuyAndSalePrice('BDB_ETH', {apiKey, secretKey})

  console.warn('this is ans', ans)


}


export default root
