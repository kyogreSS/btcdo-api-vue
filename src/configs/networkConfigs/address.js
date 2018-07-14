const address = {}

address.TEST_RUL = {url: '/apis/', method: 'get', timeout: null, responseType: null}  //demo
address.GET_ACCOUNTS = {url: '/apis/v1/user/accounts', pathname: '/v1/user/accounts', method: 'get'}  //获取账户信息
address.GET_CURRENCY = {url: '/apis/v1/common/currencies', pathname: '/v1/common/currencies', method: 'get'}  //获取币种信息
address.GET_DEPOSIT_RECORD = {url: '/apis/v1/user/deposits', pathname: '/v1/user/deposits', method: 'get'}  //获取充值记录
address.GET_ERROR_CODE = {url: '/apis/v1/common/errorCodes', pathname: '/v1/common/errorCodes', method: 'get'}  //获取错误信息
address.GET_SYMBOL = {url: '/apis/v1/common/symbols', pathname: '/v1/common/symbols', method: 'get'} //获取所有交易币对
address.GET_SYSTEM_TIME = {url: '/apis/v1/common/timestamp', pathname: '/v1/common/timestamp', method: 'get'}//获取系统时间
address.GET_SPECIFIED_SYMBOL_TRADE_INFO = {url: '/apis/v1/market/bars', pathname: '/v1/market/bars', method: 'get'} //获取指定交易对行情数据
address.GET_SPECIFIED_TRADE_DEPTH = {url: '/apis/v1/market/depth', pathname: '/v1/market/depth', method: 'get'}//获取指定交易对深度 参数symbol为交易对
address.GET_ALL_SYMBOL_TRANSACTION_INFO = {url: '/apis/v1/market/prices', pathname: '/v1/market/prices', method: 'get'}// 获取所有交易对成交信息
address.GET_ORDERS = {url: '/apis/v1/trade/orders', pathname: '/v1/trade/orders', method: 'get'}//订单相关
address.POST_ORDERS = {url: '/apis/v1/trade/orders', pathname: '/v1/trade/orders', method: 'post'}//订单相关



export default address
