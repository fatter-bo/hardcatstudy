import { ethers } from 'hardhat';
import { StudyAbi } from '../typechain/StudyAbi';
import { StudyCaller } from '../typechain/StudyCaller';
import { Contract } from 'ethers';
import { AbiCoder } from '@ethersproject/abi';

let main = async () => {
    const [owner,user] = await ethers.getSigners();

    console.log('owner balance:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

    let StudyAbiFactory = await ethers.getContractFactory('StudyAbi');
    let instance = (await StudyAbiFactory.connect(owner).deploy()) as StudyAbi;
    let StudyCallerFactory = await ethers.getContractFactory('StudyCaller');
    let instanceStudyCaller = (await StudyCallerFactory.connect(owner).deploy()) as StudyCaller;
    await instanceStudyCaller.callTest(instance.address);

    console.log('xxxxxx:', (await (await instance.set(2)).wait(1)).gasUsed);
    console.log('instance.get:', await instance.get());
    console.log('instance.abiEncode:', await instance.abiEncode());
    console.log('instance.abiEncode:', await instance.abiEncode1());
    console.log('instance.abiEncode:', await instance.abiEncode2(2));
    console.log('instance.testUint:', await instance.testUint(1, 2));
    console.log('instance.testBytes:', await instance.testBytes());
    console.log('instance.testAddress:', await instance.testAddress(instance.address));
    console.log('instance.testAddress:', await instance.testAddress(owner.address));
    await owner.sendTransaction({value:ethers.utils.parseEther("1.1"),to:instance.address});
    console.log('instance.getBalance:0:', owner.address, (await instance.getBalance(owner.address)).toString());
    console.log('instance.getBalance:0:', instance.address,(await instance.getBalance(instance.address)).toString());
    //console.log('instance.getBalance:', instance.address,ethers.utils.parseEther("1.1").toString());
    //console.log('instance.sendValue:', await instance.sendValue(owner.address, ethers.utils.parseEther("1")));
    //console.log('instance.sendValue:', await instance.sendValue(owner.address, ethers.utils.parseEther("1")));
    await instance.sendValue(owner.address, ethers.utils.parseEther("1"));
    console.log('instance.getBalance:1:', owner.address, (await instance.getBalance(owner.address)).toString());
    console.log('instance.getBalance:1:', instance.address,(await instance.getBalance(instance.address)).toString());
    //await instance.sendValue(owner.address, ethers.utils.parseEther("1"));
    console.log("xxxxxxx");
    console.log('instance.getSignature:', await instance.getSignature());
    //await instance.sendEth(owner.address);
    //console.log('instance.sendEth1:', await (await instance.sendEth1()).wait())
    //console.log('instance.data:', await instance.datalen(), await instance.data());
    console.log('instance.getBalance:2:', owner.address, (await instance.getBalance(owner.address)).toString());
    console.log('instance.getBalance:2:', instance.address,(await instance.getBalance(instance.address)).toString());
    console.log('instance.r:', instance.address,(await instance.r()).toString());
    console.log('instance.f:', instance.address,(await instance.f()).toString());
};

main();
