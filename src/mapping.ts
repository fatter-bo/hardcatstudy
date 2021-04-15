import { NewGravatar, UpdatedGravatar } from '../generated/Gravity/Gravity'
import { UpsertConfig } from '../generated/ConfigAddress/ConfigAddress'
import { Gravatar } from '../generated/schema'
import { ConfigAddress } from '../generated/schema'
import { Bytes } from '@graphprotocol/graph-ts'

export function handleNewGravatar(event: NewGravatar): void {
  let gravatar = new Gravatar(event.params.id.toHex())
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

export function handleUpdatedGravatar(event: UpdatedGravatar): void {
  let id = event.params.id.toHex()
  let gravatar = Gravatar.load(id)
  if (gravatar == null) {
    gravatar = new Gravatar(id)
  }
  gravatar.owner = event.params.owner
  gravatar.displayName = event.params.displayName
  gravatar.imageUrl = event.params.imageUrl
  gravatar.save()
}

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