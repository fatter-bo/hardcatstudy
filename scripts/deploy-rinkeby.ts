import { exec } from 'child_process';
import { ethers,network,tasks } from 'hardhat';
//import { tenderly } from '@tenderly/hardhat-tenderly';
import { ConfigAddress } from '../typechain/ConfigAddress';
import { ACCOUNT_PRIVATE_KEY_RINKEBY } from '../.privatekey';
import { StudyInc } from '../typechain/StudyInc';
import { ExchangeCore,CyberBlock2077,ERC721Test } from '../typechain';
import { Contract } from 'ethers';
//import { TransactionReceipt } from 'web3-eth';
import { AbiCoder } from 'web3-eth-abi';
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const abi:AbiCoder = require('web3-eth-abi');
let main = async () => {
    let owner = new ethers.Wallet(ACCOUNT_PRIVATE_KEY_RINKEBY, ethers.provider);

    console.log('deploy account:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));
    const ExchangeCore = await ethers.getContractFactory("ExchangeCore");
    const exchange = await ExchangeCore.connect(owner).deploy();

    await exchange.connect(owner).deployed();
    console.log("ExchangeCore deployed to:", exchange.address);
    var blockTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;
    //const CyberBlock2077Factory = await ethers.getContractFactory("CyberBlock2077");
    //let instanceCyberBlock2077 = await CyberBlock2077Factory.connect(owner).deploy('Cyber_ID', 'Cyber_ID', 256, blockTimeStamp, { gasLimit: 5000000 });
    //await instanceCyberBlock2077.connect(owner).deployed();
    //console.log("CyberBlock2077 deployed to:", instanceCyberBlock2077.address);
    //const ERC721Factory = await ethers.getContractFactory("ERC721Test");
    //let instanceERC721 = await ERC721Factory.connect(owner).deploy("PLANT","PLANT", { gasLimit: 5000000 });
    //await instanceERC721.connect(owner).deployed();
    //console.log("ERC721 deployed to:", instanceERC721.address);

    const ConfigAddressFactory = await ethers.getContractFactory('ConfigAddress');
    const instance = (await ConfigAddressFactory.connect(owner).deploy()) as ConfigAddress;
    //const instance = (await ConfigAddressFactory.connect(owner).attach('0x8711286Bd02d0DB35a273347655ffC794E063d31')) as ConfigAddress;
    let cmdStr = "sed -i -e   's/address.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/address: \"" + instance.address + "\" #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});
    cmdStr = "sed -i -e   's/network:.*#replace/network: rinkeby #replace/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});

    console.log('ConfigAddress address:', instance.address)
    let ret = await instance.upsert(
        instance.address,
        instance.address,
        instance.address,
        instance.address,
        instance.address,
        "https://rinkeby.etherscan.io/",
        "https://rinkeby.etherscan.io/",
        network.name,ethers.provider._network.chainId);
    let blockNumber = ret.blockNumber ? ret.blockNumber : (await ret.wait()).blockNumber
    if(blockNumber){
        cmdStr = "sed -i -e   's/startBlock.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/startBlock: " + blockNumber + " #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
        exec(cmdStr, function (err, stdout, stderr) { });
    }

    //方便目前测试已经部署的业务
    await instance.upsert(
        "0x36A7c8347427AF09EC97e2119066e03093386689",
        "0xC6A7ea939048807593dD5cB4e736973aACDDF99d",
        "0x77de68B5d48481c88dB7caD2e01321b6349d8D7b",
        "0xDa62F0397d7a88e7b146Edc4B7AFb502D6F02B83",
        "0x2391e1d99E37FA98Ac3c68914706AF77056953E8",
        "https://rinkeby.infura.io/v3/undefined",
        "https://rinkeby.etherscan.io",
        'Rinkeby Test NetWork',4);

};

main();
