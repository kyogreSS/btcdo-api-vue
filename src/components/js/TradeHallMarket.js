const root = {}

root.name = 'TradeHallMarket'


root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}

root.data = function () {
  return {
    marketInfoMap: new Map(),
    marketListSet: new Set(),

  }
}

root.created = function () {
  this.init()
}

root.computed = {}
root.computed.apiKey = function () {
  return this.$store.state.apiKey
}
root.computed.secretKey = function () {
  return this.$store.state.secretKey
}
root.computed.marketList = function () {
  return [...this.marketListSet]
}
root.computed.marketInfo = function () {
  return [...this.marketInfoMap.values()]
}

root.methods = {}
root.methods.init = function () {
  this.$api.getSymbols({apiKey: this.apiKey, secretKey: this.secretKey}).then(({data}) => {
    console.warn('this is data', data)
    typeof data === 'string' && (data = JSON.parse(data))
    data && data.symbols && data.symbols.forEach(v => {
      this.marketListSet.add(v.quoteName)
      this.marketInfoMap.set(v.name, {
        name: v.name,
        currentPrice: v.currentPrice,
        volume: v.volume
      })
    })
  })


}


export default root
