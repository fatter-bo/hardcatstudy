import { exec } from 'child_process';
import { log, BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { ERC20 } from '../generated/ConfigAddress/ERC20'

export function ReplaceLine(filename: string, srcStr: string, dstStr: string): void {
    let cmdStr = "sed -i -e   's/" + srcStr + "/" + dstStr + "/g' " + filename
    console.log(cmdStr);
    exec(cmdStr, function (err, stdout, stderr) { });
}

export function getTokenSymbol(tokenAddress: Address): string {
  
    let contract = ERC20.bind(tokenAddress)
  
    // try types string and bytes32 for symbol
    let symbolValue = 'unknown'
    let symbolResult = contract.try_symbol()
    if (symbolResult.reverted != true) {
      symbolValue = symbolResult.value
    }
  
    return symbolValue
  }

export function getTokenDecimals(tokenAddress: Address): number {
  
    let contract = ERC20.bind(tokenAddress)
  
    // try types string and bytes32 for symbol
    let symbolValue = 18
    let symbolResult = contract.try_decimals()
    if (symbolResult.reverted != true) {
      symbolValue = symbolResult.value
    }
  
    return symbolValue
  }