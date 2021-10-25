import { network, ethers, tracer } from 'hardhat';
import { StudyModifer } from '../typechain/StudyModifer';
import { ACCOUNT_PRIVATE_KEY_BSC_TESTNET, ACCOUNT_PRIVATE_KEY_RINKEBY } from '../.privatekey';
import { StudyInc } from '../typechain/StudyInc';
//import { Contract } from 'ethers';
//import { AbiCoder } from '@ethersproject/abi';

let main = async () => {
  let owner;
  if (network.name == 'bsctestnet') {
    owner = new ethers.Wallet(ACCOUNT_PRIVATE_KEY_BSC_TESTNET, ethers.provider);
  } else if (network.name == 'rinkeby') {
    owner = new ethers.Wallet(ACCOUNT_PRIVATE_KEY_RINKEBY, ethers.provider);
  } else {
    //其他网络的部署账号配置
    [owner] = await ethers.getSigners();
  }

  let StudyModifierFactory = await ethers.getContractFactory('StudyModifer');
  let instance = (await StudyModifierFactory.connect(owner).deploy()) as StudyModifer;
  console.log('StudyModifer addr:', instance.address);
  console.log('StudyModifer addr:', (await instance.estimateGas['testModifierOk()']()).toNumber());
  console.log('StudyModifer addr:', (await instance.estimateGas['testModifierErr()']()).toNumber());

  await instance.testModifierOk({ value: ethers.utils.parseEther('1') });
  await instance.testModifierErr();
  console.log('instance balacne:', (await ethers.provider.getBalance(instance.address)).toString());
};

main();
