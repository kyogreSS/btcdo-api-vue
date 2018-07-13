import CommonMethod from './commonMethod'

const NetworkConfigs = {}
NetworkConfigs.install = function (Vue) {

  Vue.prototype.$api = Vue.$api = new CommonMethod()
}

export default NetworkConfigs
