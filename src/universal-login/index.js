import { ETHER_NATIVE_TOKEN } from '@universal-login/commons'
import UniversalLoginSdk from '@universal-login/sdk'
import * as LocalStorage from '../api/localStorage'
import { utils, Wallet } from 'ethers'

export const universalLoginSdk = new UniversalLoginSdk(
  // TODO: GET NETWORK FROM CONFIG
  'https://relayer-kovan.herokuapp.com',
  'https://kovan.infura.io/v3/b3026fc5137a4bd18e5d5906ed49f77d',
  {
    observedTokensAddresses: [
      ETHER_NATIVE_TOKEN.address,
      '0x5f81e2afde8297f90b3f9179f8f3ea172f3155a8'
    ]
  }
)

const STORAGE_KEY = 'universalLoginWallet'

export const saveApplicationWallet = wallet => {
  const publicKey = new Wallet(wallet.privateKey).address
  LocalStorage.setItem(STORAGE_KEY, {
    privateKey: wallet.privateKey,
    contractAddress: wallet.contractAddress,
    name: wallet.name,
    publicKey
  })
}

export const getApplicationWallet = () => {
  return LocalStorage.getItem(STORAGE_KEY)
}

let USING_UNIVERSAL_LOGIN = false

export const isUsingUniversalLogin = () => USING_UNIVERSAL_LOGIN

export const useUniversalLogin = () => (USING_UNIVERSAL_LOGIN = true)

export const signString = (stringToSign, privateKey) => {
  const signingKey = new utils.SigningKey(privateKey)
  const hash = utils.hexlify(utils.toUtf8Bytes(stringToSign))
  const signature = signingKey.signDigest(
    utils.hashMessage(utils.arrayify(hash))
  )
  return utils.joinSignature(signature)
}

export { getDeposit, registerToEvent, approveToken } from './rsvp'
