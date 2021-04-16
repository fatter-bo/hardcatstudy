import { UpsertConfig } from '../generated/ConfigAddress/ConfigAddress'
import { ERC20Token, ConfigAddress } from '../generated/schema'
import { BigInt, Bytes } from '@graphprotocol/graph-ts'

export function handleUpsertConfig(event: UpsertConfig): void {
  let id = event.params.factoryAddress.toHex();
  let config = ConfigAddress.load(id)
  if (config == null) {
    config = new ConfigAddress(id)
  }
  config.factoryAddress = event.params.factoryAddress
  config.routerAddress = event.params.routerAddress
  let gstToken = ERC20Token.load(event.params.gstToken.toHexString());
  if (gstToken == null) {
    gstToken = new ERC20Token(event.params.gstToken.toHexString());
    gstToken.name = event.params.networkName + " GST"
    gstToken.symbol = "GST"
    gstToken.decimals = BigInt.fromI32(18)
    gstToken.save();
  }
  let wethToken = ERC20Token.load(event.params.wethToken.toHexString());
  if (wethToken == null) {
    wethToken = new ERC20Token(event.params.wethToken.toHexString());
    wethToken.name = event.params.networkName + " WETH"
    wethToken.symbol = "WETH"
    wethToken.decimals = BigInt.fromI32(18)
    wethToken.save();
  }
  let usdtToken = ERC20Token.load(event.params.usdtToken.toHexString());
  if (usdtToken == null) {
    usdtToken = new ERC20Token(event.params.usdtToken.toHexString());
    usdtToken.name = event.params.networkName + " USDT"
    usdtToken.symbol = "USDT"
    usdtToken.decimals = BigInt.fromI32(18)
    usdtToken.save();
  }
  config.gstToken = gstToken.id
  config.wethToken = wethToken.id
  config.usdtToken = usdtToken.id
  config.networkName = event.params.networkName
  config.rpcUrl = event.params.rpcUrl
  config.blockUrl = event.params.blockUrl
  config.chainId = event.params.chainId
  config.save()
}