import Vue from 'vue'
import uuidV1 from 'uuid/v1'
import crypto from 'crypto-browserify'
import iconv from 'iconv-lite'
import querystring from 'querystring'
import Address from '../configs/networkConfigs/address'

const {
  apiMethod, apiUrl, apiVersion, baseHost, baseMethod, basePathname, basePort, baseQuery, defaultApiKey,
  defaultSecretKey, timeout
} = require('../configs/env/env')

export default function (key, {params, apiKey, secretKey}) {

  let headers = {}
  // 获取时间
  let apiTime = new Date().getTime()
  // 获取uuid
  let apiUniqueId = uuidV1()
  // 请求的query
  let query = Address[key].query
  let sendQuery = querystring.stringify(query)
  apiKey = apiKey || defaultApiKey
  secretKey = secretKey || defaultSecretKey
  // key字符串
  let payload = `${method}\n${apiUrl}\n${pathname}\n${sendQuery}\nAPI-KEY: ${apiKey}\nAPI-SIGNATURE-METHOD: ${apiMethod}\nAPI-SIGNATURE-VERSION: ${apiVersion}\nAPI-TIMESTAMP: ${apiTime}\nAPI-UNIQUE-ID: ${apiUniqueId}\n${params && JSON.stringify(params)}`
  // 生成签名
  let signature = crypto.createHmac('sha256', secretKey).update(iconv.encode(payload, 'utf8')).digest('hex')

  // 对header进行修改
  headers['API-SIGNATURE-METHOD'] = headers['API-SIGNATURE-METHOD'] || apiMethod
  headers['API-SIGNATURE-VERSION'] = headers['API-SIGNATURE-VERSION'] || apiVersion
  headers['API-TIMESTAMP'] = headers['API-TIMESTAMP'] || apiTime
  headers['API-UNIQUE-ID'] = headers['API-UNIQUE-ID'] || apiUniqueId
  headers['API-SIGNATURE'] = headers['API-SIGNATURE'] || signature
  headers['API-KEY'] = headers['API-KEY'] || apiKey
  headers['Content-Type'] = 'application/json'

  return Vue.$http.send(key, {headers, params})

}
