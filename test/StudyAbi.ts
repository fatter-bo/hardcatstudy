import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { StudyAbi } from '../typechain/StudyAbi';
import { ContractFactory } from 'ethers';
import { exception } from 'node:console';
 import Web3Abi, { AbiCoder } from 'web3-eth-abi'

//import  Web3  from 'web3';
//let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//const abi = new AbiCoder();
// 这里为了正常引入abi,浪费了几个小时,这样写。。。
const abi = (Web3Abi as unknown) as AbiCoder
//let abi : typeof AbiCoder = require('web3-eth-abi');
//let abi : AbiCoder = require('web3-eth-abi');
//let abi = require('web3-eth-abi') as AbiCoder ;
//全局申明
let owner:SignerWithAddress,user:SignerWithAddress;
let StudyAbiFactory:ContractFactory;
describe('StudyAbi contract', function () {
  let instance :StudyAbi;

  before('init address', async () => {
    [owner, user] = await ethers.getSigners();
    StudyAbiFactory = await ethers.getContractFactory('StudyAbi');
  });

  beforeEach('deploy contract', async () => {
    instance = (await StudyAbiFactory.deploy()) as StudyAbi;
    console.log('new instance:', instance.address);
  });

  it('call abiEncode', async function () {
    console.log('xxxxxxx:', await instance['abiEncode()']());
    console.log('xxxxxxx:', await instance.abiEncode());
    let calldata = abi.encodeFunctionSignature('set(uint256)')+abi.encodeParameter('uint256',1).slice(2);
    expect(await instance.abiEncode()).to.equal(calldata);
  });
  it('call abiEncode', async function () {
    console.log('xxxxxxx:', await instance['abiEncode()']());
    console.log('xxxxxxx:', await instance.abiEncode());
    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
