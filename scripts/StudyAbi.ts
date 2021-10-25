import { ethers } from 'hardhat';
import { StudyAbi } from '../typechain/StudyAbi';
import { StudyCaller } from '../typechain/StudyCaller';
import { Contract } from 'ethers';
import { AbiCoder } from '@ethersproject/abi';

let main = async () => {
  const [owner, user] = await ethers.getSigners();

  console.log('owner balance:', owner.address, ethers.utils.formatEther((await owner.getBalance()).toString()));

  let StudyAbiFactory = await ethers.getContractFactory('StudyAbi');
  let instance = (await StudyAbiFactory.connect(owner).deploy()) as StudyAbi;
  let StudyCallerFactory = await ethers.getContractFactory('StudyCaller');
  let instanceStudyCaller = (await StudyCallerFactory.connect(owner).deploy()) as StudyCaller;
  await instanceStudyCaller.callTest(instance.address);

  // console.log('xxxxxx:', (await (await instance.set(2)).wait(1)).gasUsed);
  console.log('instance.get:', await instance.get(), ethers.utils.id('get()'));
  console.log('instance.abiEncode:', await instance.abiEncode());
  // console.log('instance.abiEncode1:', await instance.abiEncode1(12, 13), ethers.utils.id('abiEncode1(uint8)'));
  let encodeData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256'], [111111, 0xffffffffffffe]);
  // console.log(
  //   'instance.tradevCommon:',
  //   await instance.tradevCommon(100, 100, 68, instance.interface.encodeFunctionData('tradevCommon1', [encodeData]))
  // );
  await instance.tradevCommon(
    100,
    100,
    68,
    instance.interface.encodeFunctionData('tradevCommon1', [
      '0xf6274f66000000000000000000000000452289d254b95e9b63da79091123328d2381975d00000000000000000000000057ab1ec28d129707052df4df418d58a2d46d5f51000000000000000000000000000000000000000000000000000ffffffffffffe000000000000000000000000000000000000000000000028181dfc3c01d2997400000000000000000000000000000000000000000000000000000000000000000000000000000000000000006eb3f5d9b8f83fef7411709e0dfb42da9d4a85da000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f8c816a31daef932b9f8afc3fcaa62a557ba2f7000000000000000000000000000000000000000000000000000000000000003d0000000000000000000000000000000000000000000000000000000061712abd20f10d9db42351c3d71884a653afd331a2afa7350424282e538515fbffb7a0bc0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001c53acf761b76212a21314d13e4f27fdaaaf071baae735866d8a0a97ee99a06e922b2c5bcae7d1b56dd86c4d5af79a414ee0dbdd489967ec62cbe8317979473499000000000000000000000000000000000000000000000000000fffffffffffff',
    ])
  );
  console.log('instance.abiEncode:', await instance.abiEncode2(2));
  // console.log('instance.testUint:', await instance.testUint(1, 2));
  console.log('instance.testBytes:', await instance.testBytes());
  console.log('instance.testAddress:', await instance.testAddress(instance.address));
  console.log('instance.testAddress:', await instance.testAddress(owner.address));
  await owner.sendTransaction({ value: ethers.utils.parseEther('1.1'), to: instance.address });
  console.log('instance.getBalance:0:', owner.address, (await instance.getBalance(owner.address)).toString());
  console.log('instance.getBalance:0:', instance.address, (await instance.getBalance(instance.address)).toString());
  //console.log('instance.getBalance:', instance.address,ethers.utils.parseEther("1.1").toString());
  //console.log('instance.sendValue:', await instance.sendValue(owner.address, ethers.utils.parseEther("1")));
  //console.log('instance.sendValue:', await instance.sendValue(owner.address, ethers.utils.parseEther("1")));
  await instance.sendValue(owner.address, ethers.utils.parseEther('1'));
  console.log('instance.getBalance:1:', owner.address, (await instance.getBalance(owner.address)).toString());
  console.log('instance.getBalance:1:', instance.address, (await instance.getBalance(instance.address)).toString());
  //await instance.sendValue(owner.address, ethers.utils.parseEther("1"));
  console.log('xxxxxxx');
  console.log('instance.getSignature:', await instance.getSignature());
  //await instance.sendEth(owner.address);
  //console.log('instance.sendEth1:', await (await instance.sendEth1()).wait())
  //console.log('instance.data:', await instance.datalen(), await instance.data());
  console.log('instance.getBalance:2:', owner.address, (await instance.getBalance(owner.address)).toString());
  console.log('instance.getBalance:2:', instance.address, (await instance.getBalance(instance.address)).toString());
  console.log('instance.r:', instance.address, (await instance.r()).toString());
  console.log('instance.f:', instance.address, (await instance.f()).toString());
};

main();
