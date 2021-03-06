import { UpsertConfig,UpsertGameToken } from '../generated/ConfigAddress/ConfigAddress'
import { ERC20Token, ConfigAddress } from '../generated/schema'
import { ERC20 } from '../generated/ConfigAddress/ERC20'
import * as boutils from './boutils'
import { BigInt, ethereum, Bytes, log } from '@graphprotocol/graph-ts'

export function handleUpsertConfig(event: UpsertConfig): void {
  let id = event.params.factoryAddress.toHex();
  log.info("xxxxxxxxxxxxxxxxxx:handleUpsertConfig:"+id,[]);
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
  let config = ConfigAddress.load(id)
  if (config == null) {
    config = new ConfigAddress(id)
    config.gameTokens = []
  }
  config.factoryAddress = event.params.factoryAddress
  config.routerAddress = event.params.routerAddress
  config.gstToken = gstToken.id
  config.wethToken = wethToken.id
  config.usdtToken = usdtToken.id
  config.networkName = event.params.networkName
  config.rpcUrl = event.params.rpcUrl
  config.blockUrl = event.params.blockUrl
  config.chainId = event.params.chainId
  config.save()
}
export function handleUpsertGameToken(event: UpsertGameToken): void {
  let id = event.params.factoryAddress.toHex();
  log.info("xxxxxxxxxxxxxxxxxx:handleUpsertGameToken:",[]);
  var config = ConfigAddress.load(id)
  if (config == null) {
    log.info("please UpsertConfig first: {}", [id]);
    return;
  }
  let tokenId = event.params.tokenAddress.toHexString();
  let tokenName = boutils.getTokenSymbol(event.params.tokenAddress);
  var index = -2; // -1????????????,???ts?????????????????????
  let gameTokens = config.gameTokens; //?????????????????????,?????????????????????,????????????
  for (let i = 0; i < gameTokens.length; i++) {
    let token = ERC20Token.load(gameTokens[i]);
    // ????????????????????????????????????
    if (token != null && token.symbol == event.params.tokenSymbol.toString()) {
      index = i;
      break;
    }
    
  }
  if(index != -2){
    config.gameTokens.slice(index,1);
  }
  let token = ERC20Token.load(event.params.tokenSymbol);
  if (token == null) {
    token = new ERC20Token(event.params.tokenAddress.toHex());
    //TODO ???????????????????????????token??????
    token.name = config.networkName + " " + event.params.tokenSymbol.toString();
    token.symbol = tokenName;//event.params.tokenSymbol.toString();
    token.decimals = boutils.getTokenDecimals(event.params.tokenAddress);
    token.save();
  }
  let tokens = config.gameTokens;
  let len = tokens.length;
  tokens.push(tokenId);
  tokens.sort();
  len = tokens.length;
  //config.unset("gameTokens");
  config.gameTokens = tokens;
  config.save()
  // */
}
export function handleBlock(block: ethereum.Block): void {
  let id = block.hash.toHex()
  log.info("xxxxxxxxxxxxxxxxxx:wwwwwwwww:"+id,[]);
  //let entity = new Block(id)
  //entity.save()
}