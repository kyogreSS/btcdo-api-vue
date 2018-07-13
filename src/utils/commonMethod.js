import httpMethod from './httpMethod'

export default class {
  constructor() {

  }

  getAccounts({params, apiKey, secretKey, query} = {}) {
    return httpMethod('GET_ACCOUNTS', {params, apiKey, secretKey, query})
  }



}
