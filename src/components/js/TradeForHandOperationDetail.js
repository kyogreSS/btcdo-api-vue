const root = {}
root.name = 'TradeForHandOperationDetail'

/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
}

/*---------------------------- props ----------------------------*/
root.props = {}
root.props.type = {
  type: String,
  required: true
}

/*---------------------------- 数据 ----------------------------*/

root.data = function () {
  return {
    price: '',
    amount: '',
    range: 0,
    fireBDB: 'true',
    dismissSecs: 2,
    dismissCountDown: 0,
    message: '',
    variant: 'primary',
    committing: false,
  }
}

/*---------------------------- 生命周期 ----------------------------*/

root.created = function () {

}

/*---------------------------- 计算 ----------------------------*/
root.computed = {}


root.computed.apiKey = function () {
  return this.$store.state.apiKey
}
root.computed.secretKey = function () {
  return this.$store.state.secretKey
}
root.computed.isLogin = function () {
  return this.$store.state.apiKey && this.$store.state.secretKey
}

root.computed.symbol = function () {
  return this.$store.state.symbol
}
root.computed.symbolOne = function () {
  return this.$store.state.symbol.split('_')[0]
}
root.computed.symbolTwo = function () {
  return this.$store.state.symbol.split('_')[1]
}
root.computed.symbolOneAvailable = function () {
  // console.warn(')
  return this.$store.state.accountsMap && this.$store.state.accountsMap.get(this.symbolOne) && this.$store.state.accountsMap.get(this.symbolOne).available || 0
}

root.computed.symbolTwoAvailable = function () {
  return this.$store.state.accountsMap && this.$store.state.accountsMap.get(this.symbolTwo) && this.$store.state.accountsMap.get(this.symbolTwo).available || 0
}

/*---------------------------- 观察 ----------------------------*/
root.watch = {}


/*---------------------------- 方法 ----------------------------*/
root.methods = {}
root.methods.inputRange = function () {
  if (this.type === 'sale') {
    this.amount = this.toFixed(this.$globalFunc.accMul(this.symbolOneAvailable, this.$globalFunc.accDiv(Math.max(Math.min(this.range, 100), 0), 100)), 8)
  }
  if (this.type === 'buy') {
    this.amount = this.toFixed(this.$globalFunc.accMul(this.$globalFunc.accDiv(this.symbolTwoAvailable, this.price || 1), this.$globalFunc.accDiv(Math.max(Math.min(this.range, 100), 0), 100)), 8)
  }
}

root.methods.inputAmount = function () {
  if (this.amount === '') {
    this.range = 0
    return
  }
  if (this.type === 'sale') {
    this.range = this.toFixed(Math.min(this.$globalFunc.accDiv(this.amount, this.symbolOneAvailable), 1) * 100, 0)
  }
  if (this.type === 'buy') {
    this.range = this.toFixed(Math.min(this.$globalFunc.accDiv(this.amount, this.$globalFunc.accDiv(this.symbolTwoAvailable, this.price || 1)), 1) * 100, 0)
  }
}

root.methods.commit = function () {
  if (this.committing) return
  if (!this.amount || !this.price) {
    this.message = '请输入价格或数量'
    this.showAlert(4)
    return
  }
  this.committing = true
  let apiMethod = this.type === 'sale' ? 'createSaleOrder' : 'createBuyOrder'
  this.$api[apiMethod](this.price, this.amount, this.symbol, this.fireBDB, {
    apiKey: this.apiKey,
    secretKey: this.secretKey
  }).then(res => {
    this.message = '挂单成功'
    this.showAlert(3)
    this.committing = false
    this.$eventBus.notify({key: 'getAccounts'})
  }).catch(err => {
    this.message = '挂单失败'
    this.showAlert(4)
    this.committing = false
  })


}


root.methods.countDownChanged = function (dismissCountDown) {
  this.dismissCountDown = dismissCountDown
}
root.methods.showAlert = function (type) {
  switch (type) {
    case 1:
      this.variant = 'primary';
      break;
    case 2:
      this.variant = 'secondary';
      break;
    case 3:
      this.variant = 'success';
      break;
    case 4:
      this.variant = 'danger';
      break;
    case 5:
      this.variant = 'warning';
      break;
    case 6:
      this.variant = 'info';
      break;
    case 7:
      this.variant = 'light';
      break;
    case 8:
      this.variant = 'dark';
      break;
    default:
      this.variant = 'primary';
  }

  this.dismissCountDown = this.dismissSecs
}


root.methods.toFixed = function (num, acc = 8) {
  return this.$globalFunc.accFixed(num, acc)
}


export default root
