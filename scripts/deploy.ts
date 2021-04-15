import { exec } from 'child_process';
import { ethers } from 'hardhat';
import { ConfigAddress } from '../typechain/ConfigAddress';
import { StudyInc } from '../typechain/StudyInc';
import { Contract } from 'ethers';
//import { TransactionReceipt } from 'web3-eth';
import { AbiCoder } from 'web3-eth-abi';
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const abi:AbiCoder = require('web3-eth-abi');
let main = async () => {
    const [owner,user] = await ethers.getSigners();

    console.log('deploy account:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

    const ConfigAddressFactory = await ethers.getContractFactory('ConfigAddress');
    const instance = (await ConfigAddressFactory.connect(owner).deploy()) as ConfigAddress;

    console.log('ConfigAddress address:', instance.address)
    let cmdStr = "sed -i -e   's/address.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/address: \"" + instance.address + "\" #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});

    instance.upsert(instance.address,instance.address,instance.address,instance.address,"test");
};

main();
