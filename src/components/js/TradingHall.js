const root = {}
root.name = 'TradingHall'

root.components = {
  'TradingHallHeader': resolve => require(['../vue/TradingHallHeader'], resolve),
  'TradingHallDepth': resolve => require(['../vue/TradingHallDepth'], resolve),
}

root.created = function () {
  this.$http.send('GET_CURRENCY').then(({data}) => {
    console.warn('data', data)
  })

}

export default root
