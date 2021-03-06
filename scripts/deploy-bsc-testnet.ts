import { exec } from 'child_process';
import { ethers,network } from 'hardhat';
import { ConfigAddress } from '../typechain/ConfigAddress';
import { StudyInc } from '../typechain/StudyInc';
import { Contract } from 'ethers';
//import { TransactionReceipt } from 'web3-eth';
import { AbiCoder } from 'web3-eth-abi';
import { ACCOUNT_PRIVATE_KEY_BSC_TESTNET } from '../.privatekey';
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const abi:AbiCoder = require('web3-eth-abi');
let main = async () => {
    let owner = new ethers.Wallet(ACCOUNT_PRIVATE_KEY_BSC_TESTNET, ethers.provider);

    console.log('deploy account:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

    const ConfigAddressFactory = await ethers.getContractFactory('ConfigAddress');
    const instance = (await ConfigAddressFactory.connect(owner).deploy()) as ConfigAddress;
    //const instance = (await ConfigAddressFactory.connect(owner).attach('0x76f601f92A58536001a9Ca69261c194B3111Fa8A')) as ConfigAddress;

    console.log('ConfigAddress address:', instance.address)
    let cmdStr = "sed -i -e   's/address.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/address: \"" + instance.address + "\" #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});
    cmdStr = "sed -i -e   's/network:.*#replace/network: bsc #replace/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});

    let ret = await instance.connect(owner).upsert(
        instance.address,
        instance.address,
        instance.address,
        instance.address,
        instance.address,
        "https://rinkeby.etherscan.io",
        "https://rinkeby.etherscan.io",
        network.name,ethers.provider._network.chainId);
    let blockNumber = ret.blockNumber ? ret.blockNumber : (await ret.wait()).blockNumber
    if(blockNumber){
        cmdStr = "sed -i -e   's/startBlock.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/startBlock: " + blockNumber + " #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
        exec(cmdStr, function (err, stdout, stderr) { });
    }
    //???????????????????????????????????????
    await instance.connect(owner).upsert(
        "0x36A7c8347427AF09EC97e2119066e03093386689",
        "0xC6A7ea939048807593dD5cB4e736973aACDDF99d",
        "0x77de68B5d48481c88dB7caD2e01321b6349d8D7b",
        "0xDa62F0397d7a88e7b146Edc4B7AFb502D6F02B83",
        "0x2391e1d99E37FA98Ac3c68914706AF77056953E8",
        "https://rinkeby.infura.io/v3/undefined",
        "https://rinkeby.etherscan.io",
        'Rinkeby Test NetWork',4,{from:owner.address});
};

main();
