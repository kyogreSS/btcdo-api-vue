const root = {}

root.name = 'InputAPIKey'


root.data = function () {
  return {
    apiKey: this.$store.state.apiKey,
    secretKey: this.$store.state.secretKey,
  }
}
root.computed = {}
root.computed.inputAlready = function () {
  if (this.apiKey && this.secretKey) {
    return '已登录'
  }
  return '请输入API KEY'
}

root.watch = {}
root.watch.apiKey = function (newVal, oldVal) {
  this.$store.commit('setApiKey', newVal)
}
root.watch.secretKey = function (newVal, oldVal) {
  this.$store.commit('setSecretKey', newVal)
}

root.methods = {}

export default root
