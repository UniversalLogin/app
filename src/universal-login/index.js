import UniversalLoginSdk from '@universal-login/sdk'

export const universalLoginSdk = new UniversalLoginSdk(
  // TODO: GET NETWORK FROM CONFIG
  'https://relayer-rinkeby.herokuapp.com',
  'https://rinkeby.infura.io'
)

// TOOD: Localstorage for saving connected / created wallet
