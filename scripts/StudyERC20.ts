import { ethers } from 'hardhat';
import { ERC20 } from '../typechain/ERC20';
import { StudyInc } from '../typechain/StudyInc';
import { Contract } from 'ethers';
//import { TransactionReceipt } from 'web3-eth';
import { AbiCoder } from 'web3-eth-abi';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { TransactionResponse } from '@ethersproject/abstract-provider';

const abi: AbiCoder = require('web3-eth-abi');
let main = async () => {
  const [owner, user] = await ethers.getSigners();

  console.log('StudyAbi:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

  let ERC20Factory = await ethers.getContractFactory('ERC20');
  let StudyIncFactory = await ethers.getContractFactory('StudyInc');
  let instance = (await ERC20Factory.connect(owner).deploy('erc20 token', 'EC', 18)) as ERC20;
  const contract = ERC20Factory.attach(instance.address);
  //contract.filters.transfer(owner.address);
  console.log(
    'ERC20 balance:',
    owner.address,
    ethers.utils.formatEther((await instance.balanceOf(owner.address)).toString())
  );
  //let receipt:TransactionReceipt = await (await instance.faucet(ethers.utils.parseEther('1'))).wait();
  let receipt = await (await instance.faucet(ethers.utils.parseEther('1'))).wait();
  let event = (receipt['events'] as Array<any>)[0];
  console.log(event['eventSignature']);
  //abi.decodeLog([event["eventSignature"]],event["data"],event["topics"]);

  console.log(
    'ERC20 balance:',
    owner.address,
    ethers.utils.formatEther((await instance.balanceOf(owner.address)).toString())
  );
  let instanceInc = (await StudyIncFactory.connect(owner).deploy()) as StudyInc;
  receipt = await (await instanceInc.faucet(instance.address)).wait();
  let events = receipt['events'] as Array<any>;
  events.forEach((element) => {
    console.log(element['topics']);
  });
  console.log(
    'ERC20 totalSupply:',
    instance.address,
    ethers.utils.formatEther((await instance.totalSupply()).toString())
  );
  console.log(
    'ERC20 balance:',
    instance.address,
    ethers.utils.formatEther((await instance.balanceOf(instance.address)).toString())
  );
  console.log(
    'ERC20 balance:',
    instanceInc.address,
    ethers.utils.formatEther((await instance.balanceOf(instanceInc.address)).toString())
  );
  console.log(
    'ERC20 balance:',
    owner.address,
    ethers.utils.formatEther((await instance.balanceOf(owner.address)).toString())
  );
  console.log('msg.sender:', await instanceInc.owner(), owner.address);
  owner.provider?.on(ethers.utils.id('Transfer(address,address,uint256)'), (ret: any) => {
    console.log('xxx:', ret);
  });
};

main();
