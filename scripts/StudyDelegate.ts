import { ethers } from 'hardhat';
import { StudyDelegate } from '../typechain/StudyDelegate';
import { StudyInc } from '../typechain/StudyInc';
import { Contract } from 'ethers';
import { AbiCoder } from '@ethersproject/abi';

let main = async () => {
    const [owner,user] = await ethers.getSigners();

    console.log('StudyAbi:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

    let StudyDelegateFactory = await ethers.getContractFactory('StudyDelegate');
    let StudyIncFactory = await ethers.getContractFactory('StudyInc');
    let instance = (await StudyDelegateFactory.connect(owner).deploy()) as StudyDelegate;
    let instanceInc = (await StudyIncFactory.connect(owner).deploy()) as StudyInc;
    //await instanceInc.inc();
    await instance.inc_call(instanceInc.address);
    console.log('instance.x:', await instance.y());
    console.log('instanceInc.x:', await instanceInc.x(), await instanceInc.y());
    await instance.inc_call(instanceInc.address);
    console.log('instance.x:', await instance.y());
    console.log('instanceInc.x:', await instanceInc.x(), await instanceInc.y());
    await instance.inc_delegatecall(instanceInc.address);
    console.log('instance.x:', await instance.y());
    console.log('instanceInc.x:', await instanceInc.x(), await instanceInc.y());
    console.log('instance.encode:', await instance.encode());
    console.log('instance.keccak:', await instance.keccak());
};

main();
