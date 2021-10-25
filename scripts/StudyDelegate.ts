import { network, ethers, tracer } from 'hardhat';
import { StudyDelegate } from '../typechain/StudyDelegate';
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

  console.log('StudyAbi:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

  let StudyDelegateFactory = await ethers.getContractFactory('StudyDelegate');
  let StudyIncFactory = await ethers.getContractFactory('StudyInc');
  let instance = (await StudyDelegateFactory.connect(owner).deploy()) as StudyDelegate;
  //let instance = (await StudyDelegateFactory.deploy()) as StudyDelegate;
  //tracer.nameTags[instance.address] = 'x';
  console.log('StudyDelegate addr:', instance.address);
  let instanceInc = (await StudyIncFactory.connect(owner).deploy()) as StudyInc;
  //await instanceInc.inc();
  //await instance.set(1);
  await instance.inc_call(instanceInc.address);
  console.log('instance.x:', (await instance.y()).toString());
  console.log(
    'instanceInc.x:',
    instanceInc.address,
    await instanceInc.thisaddr(),
    (await instanceInc.x()).toString(),
    (await instanceInc.y()).toString()
  );
  await instance.inc_call(instanceInc.address);
  console.log('instance.x:', await instance.y());
  console.log(
    'instanceInc.x:',
    instanceInc.address,
    await instanceInc.thisaddr(),
    (await instanceInc.x()).toString(),
    (await instanceInc.y()).toString()
  );
  console.log('instanceInc.x:', await instanceInc.thisaddr(), (await instanceInc.x()).toString());
  await instanceInc.inc_delegatecall1(22);
  console.log('instanceInc.x:', await instanceInc.thisaddr(), (await instanceInc.x()).toString());
  await instanceInc.inc(23);
  console.log('instanceInc.x:', await instanceInc.thisaddr(), (await instanceInc.x()).toString());
  await instance.inc_delegatecall(instanceInc.address);
  // await instance.delegatecall_me(instanceInc.address);
  console.log('instance.x:', (await instance.y()).toString());
  console.log(
    'instanceInc.x:',
    instanceInc.address,
    await instanceInc.thisaddr(),
    (await instanceInc.x()).toString(),
    (await instanceInc.y()).toString()
  );
  console.log('instance.encode:', await instance.encode());
  console.log('instance.keccak:', await instance.keccak());
  console.log('xxxxxxxxxxxxxxxxxxxxxx:', (await instanceInc.x()).toString(), (await instance.y()).toString());
  await instance.functionCall(instanceInc.address, 'errerr');
  console.log('xxxxxxxxxxxxxxxxxxxxxx:', (await instanceInc.x()).toString(), (await instance.y()).toString());
  // console.log(
  //   'xxxxxxxxxxxxxxxxxxxxxx:',
  //   owner.address,
  //   instance.address,
  //   (await (await instance.getAddress(instanceInc.address)).wait()).events
  // );
};

main();
