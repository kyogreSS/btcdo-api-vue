const root = {}

root.name = 'TradeForHandOperation'


/*---------------------------- 组件 ----------------------------*/

root.components = {
  'Loading': resolve => require(['../vue/Loading'], resolve),
  'TradeForHandOperationDetail': resolve => require(['../vue/TradeForHandOperationDetail'], resolve),

}


export default root
