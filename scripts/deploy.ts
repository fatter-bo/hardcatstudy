import { exec } from 'child_process';
import { config, ethers,network } from 'hardhat';
import { ConfigAddress } from '../typechain/ConfigAddress';
import { ERC20 } from '../typechain/ERC20';
import { Contract } from 'ethers';
//import { TransactionReceipt } from 'web3-eth';
import { AbiCoder } from 'web3-eth-abi';
import { ReplaceLine } from './boutils';
import { getTokensByNetwork } from './tokens';
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { TransactionResponse } from "@ethersproject/abstract-provider";

const abi:AbiCoder = require('web3-eth-abi');
let main = async () => {
    const [owner,user] = await ethers.getSigners();

    console.log('deploy account:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

    const ConfigAddressFactory = await ethers.getContractFactory('ConfigAddress');
    //const instance = (await ConfigAddressFactory.connect(owner).attach("0x030AC19Ae1AFa0ec7E25f18c6Db6cC8e5331b721"))as ConfigAddress;//0x83f238F8a8F557dEdE7aE201434f5FB3bC2dE1F9
    //console.log('ConfigAddress address:', instance.address)
    const instance = (await ConfigAddressFactory.connect(owner).deploy()) as ConfigAddress;
    ReplaceLine('scripts/deploy.ts',
    'attach.*\\/\\/0x83f238F8a8F557dEdE7aE201434f5FB3bC2dE1F9',
    'attach("' + instance.address + '"))as ConfigAddress;\\/\\/0x83f238F8a8F557dEdE7aE201434f5FB3bC2dE1F9'
);

    console.log('ConfigAddress address:', instance.address)

    let cmdStr = "sed -i -e   's/address.*#0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/address: \"" + instance.address + "\" #0x3BCC716d7F478E4eec25647f0A9098E734FF1d32/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});
    cmdStr = "sed -i -e   's/network:.*#replace/network: mainnet #replace/g'  subgraph.yaml"
    exec(cmdStr, function(err,stdout,stderr){});

    let ret = await instance.upsert(
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
    // */

    let tokens = getTokensByNetwork(network.name);
    if (tokens != null) {
        for (let index = 0; index < tokens.length; index++) {
            const element = tokens[index];
            await instance.upsertGameToken(instance.address, element.symbol, element.address);
        }
    }
    const ERC20Factory = await ethers.getContractFactory('ERC20');
    let instanceERC20 = (await ERC20Factory.connect(owner).deploy("ganache BOST","BOST",18)) as ERC20;
    console.log('ERC20 address:', instanceERC20.address)
    await instance.upsertGameToken(instance.address,"BOST",instanceERC20.address);
    instanceERC20 = (await ERC20Factory.connect(owner).deploy("ganache BOST2","BOST2",18)) as ERC20;
    console.log('ERC20 address:', instanceERC20.address)
    await instance.upsertGameToken(instance.address,"BSDT1",instanceERC20.address);
    instanceERC20 = (await ERC20Factory.connect(owner).deploy("ganache BOST2","BOST2",18)) as ERC20;
    console.log('ERC20 address:', instanceERC20.address)
    await instance.upsertGameToken(instance.address,"BSDT2",instanceERC20.address);
    instanceERC20 = (await ERC20Factory.connect(owner).deploy("ganache BOST3","BOST3",18)) as ERC20;
    console.log('ERC20 address:', instanceERC20.address)
    await instance.upsertGameToken(instance.address,"BSDT3",instanceERC20.address);
    instanceERC20 = (await ERC20Factory.connect(owner).deploy("ganache BOST4","BOST4",18)) as ERC20;
    console.log('ERC20 address:', instanceERC20.address)
    await instance.upsertGameToken(instance.address,"BSDT4",instanceERC20.address);
    // */
    console.log('upsertGameToken address:', await instance.getGameToken(instance.address,"BSDT2"))

};

main();
