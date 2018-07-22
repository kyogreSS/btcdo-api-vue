export default async function ($api, $store, $cookies) {

  // do someThing

  let user_symbol = $cookies.get('user_symbol_cookie')
  user_symbol && $store.commit('setSymbol', user_symbol)


}
