const root = {}


let uuidV1 = require('uuid/v1')


// api key
root.defaultApiKey = 'your api key'
// api secret key
root.defaultSecretKey = 'your api secret key'


// 请求方法
root.baseMethod = 'GET'
// 域名
root.baseHost = 'https://api.btcdo.com'
// 发送地址
root.apiUrl = 'api.btcdo.com'
// 请求端口
root.basePort = ''
// 请求参数
root.baseQuery = {}
// 请求路径
root.basePathname = '/v1/user/accounts'


// api 方法
root.apiMethod = 'HmacSHA256'
// api 版本
root.apiVersion = 1
// api 时间 在fetch方法中可以生成，这里记录下使用方法
root.apiTime = new Date().getTime()
// api 独立Id 在fetch方法中可以生成，这里记录下使用方法
root.apiUniqueId = uuidV1()

// 请求超时时间，默认5000
root.timeout = 5000


export default root
