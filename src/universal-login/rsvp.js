import { Contract, utils } from 'ethers'
import { universalLoginSdk } from '.'
import {
  ETHER_NATIVE_TOKEN,
  OPERATION_CALL
} from '../../node_modules/@universal-login/commons'
import { EMPTY_ADDRESS } from '../api/utils'

export const getDeposit = async (contractAddress, abi, provider) => {
  const contract = new Contract(contractAddress, abi, provider)
  const tokenAddress = await contract.tokenAddress()
  if (tokenAddress && tokenAddress !== EMPTY_ADDRESS) {
    return 0
  } else {
    return contract.deposit()
  }
}

export const registerToEvent = async (
  applicationWallet,
  contractAddress,
  abi,
  deposit
) => {
  const registerData = new utils.Interface(abi).functions.register.encode([])
  const registerMessage = {
    gasToken: ETHER_NATIVE_TOKEN.address,
    operationType: OPERATION_CALL,
    to: contractAddress,
    from: applicationWallet.contractAddress,
    gasLimit: utils.bigNumberify('1000000'),
    gasPrice: utils.bigNumberify('9000000'),
    data: registerData,
    value: deposit
  }
  const { waitToBeMined } = await universalLoginSdk.execute(
    registerMessage,
    applicationWallet.privateKey
  )
  const messageStatus = await waitToBeMined()
  return messageStatus.transactionHash
}
