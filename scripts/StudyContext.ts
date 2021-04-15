import { ethers } from 'hardhat';
import { TestContext } from '../typechain/TestContext';
import { TestContextCall } from '../typechain/TestContextCall';
import { Contract } from 'ethers';
import { AbiCoder } from 'web3-eth-abi';
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TransactionResponse } from "@ethersproject/abstract-provider";

let main = async () => {
    const [owner,user] = await ethers.getSigners();

    console.log('owner.address:', owner.address,ethers.utils.formatEther(await owner.getBalance()).toString());

    let TestContextFactory = await ethers.getContractFactory('TestContext');
    let TestContextCallFactory = await ethers.getContractFactory('TestContextCall');
    let instance = (await TestContextFactory.connect(owner).deploy()) as TestContext;
    let instanceCall = (await TestContextCallFactory.connect(owner).deploy()) as TestContextCall;
    console.log('address:', instance.address,instanceCall.address,owner.address);
    console.log('owner.address:', owner.address,ethers.utils.formatEther(await owner.getBalance()).toString());
    let receipt = await (await instance.msgSender(owner.address)).wait();
    receipt.events && receipt.events.forEach(element => {console.log(element.topics);});
    console.log('owner.address:', owner.address,ethers.utils.formatEther(await owner.getBalance()).toString());
    receipt = await (await instanceCall.callSender(instance.address)).wait();
    receipt.events && receipt.events.forEach(element => {console.log(element.topics);});
    console.log('owner.address:', owner.address,ethers.utils.formatEther(await owner.getBalance()).toString());
};

main();
