import { UpsertConfig } from '../generated/ConfigAddress/ConfigAddress'
import { ConfigAddress } from '../generated/schema'
import { Bytes } from '@graphprotocol/graph-ts'

export function handleUpsertConfig(event: UpsertConfig): void {
  let id = event.params.factoryAddress.toHex();
  let config = ConfigAddress.load(id)
  if (config == null) {
    config = new ConfigAddress(id)
  }
  config.factoryAddress = event.params.factoryAddress
  config.routerAddress = event.params.routerAddress
  config.usdtToken = event.params.usdtToken
  config.wethToken = event.params.wethToken
  config.blockUrl = event.params.blockUrl
  config.save()
}