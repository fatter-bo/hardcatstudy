import { expect } from 'chai';
import { ethers, tracer } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { StudyAbi } from '../typechain/StudyAbi';
import { StudyDelegate } from '../typechain/StudyDelegate';
import { StudyInc } from '../typechain/StudyInc';

import { ContractFactory } from 'ethers';
import { exception } from 'node:console';
import Web3Abi, { AbiCoder } from 'web3-eth-abi';

//import  Web3  from 'web3';
//let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
//const abi = new AbiCoder();
// 这里为了正常引入abi,浪费了几个小时,这样写。。。
const abi = (Web3Abi as unknown) as AbiCoder;
//let abi : typeof AbiCoder = require('web3-eth-abi');
//let abi : AbiCoder = require('web3-eth-abi');
//let abi = require('web3-eth-abi') as AbiCoder ;
//全局申明
let owner: SignerWithAddress, user: SignerWithAddress;
let StudyAbiFactory: ContractFactory;
let StudyDelegateFactory: ContractFactory;
let StudyIncFactory: ContractFactory;
describe('StudyAbi contract', function () {
  let instance: StudyAbi;
  let instance1: StudyDelegate;
  let instanceInc: StudyInc;

  before('init address', async () => {
    [owner, user] = await ethers.getSigners();
    StudyAbiFactory = await ethers.getContractFactory('StudyAbi');
    StudyDelegateFactory = await ethers.getContractFactory('StudyDelegate');
    StudyIncFactory = await ethers.getContractFactory('StudyInc');
  });

  beforeEach('deploy contract', async () => {
    instance = (await StudyAbiFactory.deploy()) as StudyAbi;
    instance1 = (await StudyDelegateFactory.connect(owner).deploy()) as StudyDelegate;
    instanceInc = (await StudyIncFactory.connect(owner).deploy()) as StudyInc;
    console.log('new instance:', instance.address);
  });

  it('call abiEncode', async function () {
    console.log('xxxxxxx:', await instance['abiEncode()']());
    console.log('xxxxxxx:', await instance.abiEncode());
    let calldata = abi.encodeFunctionSignature('set(uint256)') + abi.encodeParameter('uint256', 1).slice(2);
    owner.sendTransaction({ from: owner.address, to: user.address, value: ethers.utils.parseEther('1') });
    tracer.nameTags[owner.address] = 'owner';
    tracer.nameTags[user.address] = 'user';
    tracer.nameTags[instance.address] = 'StudyAbi';
    tracer.nameTags[instance1.address] = 'StudyDelegate';
    tracer.nameTags[instanceInc.address] = 'StudyInc';
    await instance1.inc_call(instanceInc.address);
    await instance.set(user.address, 1);
    expect(await instance.abiEncode()).to.equal(calldata);
  });
  it('call abiEncode', async function () {
    console.log('xxxxxxx:', await instance['abiEncode()']());
    console.log('xxxxxxx:', await instance.abiEncode());
    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
