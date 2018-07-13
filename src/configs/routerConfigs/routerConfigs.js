const root = {}
root.mode = 'history'
root.fallback = true
root.base = '/'

root.routes = []


root.routes.push({
  path: '/',
  caseSensitive: true,
  component: resolve => require(['@/components/vue/Index.vue'], resolve),
  children: [
    {
      path: '',
      redirect: 'tradingHall',
      caseSensitive: true,
      meta: {},
    },
    {
      path: 'tradingHall',
      name: 'tradingHall',
      meta: {},
      caseSensitive: true,
      component: resolve => require(['@/components/vue/TradingHall'], resolve)
    },
  ]
})


export default root

