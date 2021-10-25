// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Address.sol';
import 'hardhat/console.sol';

library LibBytes {
    using LibBytes for bytes;

    function readBytes4(bytes memory b, uint256 index) internal pure returns (bytes4 result) {
        // Arrays are prefixed by a 32 byte length field
        index += 32;

        // Read the bytes4 from array memory
        assembly {
            result := mload(add(b, index))
            // Solidity does not require us to clean the trailing bytes.
            // We do it anyway
            result := and(result, 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000)
        }
        return result;
    }
}

contract StudyAbi {
    struct U8U8 {
        uint8 u0;
        uint8 u1;
    }
    using LibBytes for bytes;
    using Address for address;
    using Address for address payable;
    uint256 storedData;

    uint256 public r = 0;
    uint256 public f = 0;

    receive() external payable {
        r = msg.value;
    }

    fallback() external payable {
        //如果调用不存在的函数就报错
        require(false);
        f = msg.value;
    }

    constructor() payable {}

    //address payable addr;
    function sendEth(address payable addr) public payable returns (bool) {
        address payable testPayable = payable(address(addr));
        (bool success, ) = testPayable.call{value: 1}('');
        addr.sendValue(1);
        require(success, 'sendEth err');
        return true;
        //testPayable.transfer(0.001 ether);
    }

    function deletegateCall() public payable returns (uint256) {}

    function sendEth1() public payable returns (uint256, bool) {
        (bool success, bytes memory retdata) =
            address(this).call(abi.encodeWithSignature('sendEth(address)', payable(msg.sender)));
        address self = address(this);
        data = self.functionCallWithValue(abi.encodeWithSelector(0x76a54c60, payable(msg.sender)), 1, 'dddd');
        data = self.functionDelegateCall(abi.encodeWithSelector(0x76a54c60, payable(msg.sender)), 'dddd');

        (success, ) = self.call{value: 10}(abi.encode(0x76a54c60, msg.sender));
        //bytes4 methodId = bytes4(keccak256("increaseAge(string,uint256)"));
        require(success, 'sendEth1 err');
        datalen = retdata.length;
        return (retdata.length, abi.decode(retdata, (bool)));
    }

    function getSignature() public pure returns (bytes memory) {
        //return abi.encodeWithSelector(0x76a54c60,payable(msg.sender));
        //selfdestruct(payable(msg.sender));
        //return address(this).code;
        return abi.encode('sendEth(address)');
    }

    function getSendEth1Signature() public returns (bytes memory) {
        (bool success, ) = address(this).call(abi.encodeWithSelector(0xcfbb8639));
        require(success, 'getSendEth1Signature');
        return abi.encodeWithSignature('sendEth1()');
    }

    bytes public data;
    uint256 public datalen;

    function testAddress(address addr) public view returns (string memory ret) {
        if (addr.isContract()) {
            ret = 'contract';
        } else {
            ret = 'not contract';
        }
    }

    function getBalance(address payable to) public view returns (uint256) {
        return to.balance;
    }

    function sendValue(address payable to, uint256 mad) public returns (bool) {
        Address.sendValue(to, mad);
        return true;
    }

    function sendValue1(address to, uint256 mad) public returns (bool) {
        payable(to).sendValue(mad);
        return true;
    }

    event ChangeX(address to, uint256 x);
    event ChangeY(uint256 x);

    function set(address to, uint256 x) public {
        storedData = x;
        emit ChangeX(to, x);
        sety(x);
    }

    function sety(uint256 y) public {
        storedData = y;
        emit ChangeY(y);
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function abiEncode() public pure returns (bytes memory) {
        //abi.encode(1);  // 计算1的ABI编码
        return abi.encodeWithSignature('set(uint256)', 1); //计算函数set(uint256) 及参数1 的ABI 编码
    }

    function abiEncode1(uint8 u8, uint8 u81) public returns (bytes memory) {
        console.log('xxxx:', msg.data.length, u8, uint32(bytes4(msg.data.readBytes4(0))));

        // bytes calldata test = msg.data[0:4];
        // address(this).delegatecall(test);
        bytes memory selector = new bytes(msg.data.length);
        for (uint256 i = 0; i < msg.data.length; i++) {
            selector[i] = msg.data[i];
        }

        // address addr = address(bytes20(msg.data[0:20]));
        // uint8 i = abi.decode(selector, (uint8));
        // console.log('xxxx:', i);
        // bytes memory selector = new bytes(4);
        // for (uint256 i = 0; i < 4; i++) {
        //     selector[i] = msg.data[i];
        // }
        // address(this).delegatecall(selector);
        // (bytes4 selector1, U8U8 memory uu1) = abi.decode(msg.data, (bytes4, U8U8));
        // ( uint8 uu0, uint8 uu1) = abi.decode(msg.data[4:], ( uint8, uint8));
        console.log('U8U8:');
        bytes memory data = msg.data;
        ( U8U8 memory uu1) = abi.decode(msg.data[4:], ( U8U8));
        bytes memory data2 = abi.encodePacked(uu1.u0);
        console.log('U8U8:', uu1.u0, uu1.u1,data2.length);
        ( uint8 u8) = abi.decode(msg.data[4:], ( uint8));
        console.log('uint8:', u8);
        U8U8 memory uu = U8U8({u0: u81, u1: u8});
        bytes memory encode = abi.encodeWithSelector(this.abiEncode1.selector, uu);
        console.log('U8U8:', encode.length, u8, uint32(bytes4(data.readBytes4(0))));
        // (bytes4 selector2, U8U8 memory uu2) = abi.decode(encode, (bytes4, U8U8));
        uint256 add0 = contentAddress(encode);
        //  memCopy32(add0+encode.length-32,add0+encode.length-64);
        // address(this).delegatecall(encode);
        uint256 add1 = contentAddress(data);
         memCopy32(add1+data.length-32,add0+data.length-64);
         bytes memory input = abi.encode(15);
         uint256 inputAddress;
         uint256 dataAddress;
                     assembly {
                dataAddress := add(data, 32)
                     }
                      dataAddress = dataAddress + data.length-32;
                     assembly {
                inputAddress := add(input, 32)
                mstore(dataAddress, mload(inputAddress))
                     }

        address(this).delegatecall(data);
        // address(this).delegatecall(msg.data);
        return abi.encode('1'); // 计算1的ABI编码
    }
    function memCopy32(uint256 dst,uint256 src) public pure {
        assembly {
            mstore(dst, mload(src))
        }  
    }
        function contentAddress(bytes memory input)
        internal
        pure
        returns (uint256 memoryAddress)
    {
        assembly {
            memoryAddress := add(input, 32)
        }
        return memoryAddress;
    }
    function tradevCommon1(bytes calldata dataheader) public returns (uint256 amountOut) {
        console.log("tradevCommon0:",gasleft(),dataheader.length);
        (uint256 out1,uint256 out2) = abi.decode(dataheader, (uint256,uint256));
        console.log("tradevCommon1:",out1,dataheader.length);
        console.log("tradevCommon2:",out2,dataheader.length);
                    //改变输入值
            bytes memory data = dataheader[4:dataheader.length];
            uint256 dataAddress;
            assembly {
                dataAddress := add(data, 32)
            }
            // dataAddress = dataAddress + 4; //把前四个字节的函数去掉
            //从后往前处理性价比更高
        console.log("tmp1:",gasleft(),dataAddress,dataAddress + dataheader.length - 32);
            for (uint256 i = dataAddress + dataheader.length - 32; i > 32; i -= 32) {
                uint256 tmp;
                assembly {
                    tmp := mload(i)
                }
                //这个数字是ts里能表达出来的最大数字-1
                if (tmp == 0xFFFFFFFFFFFFE) {
                    assembly {
                        mstore(i, 1111)
                    tmp := mload(i)
                    }
        console.log("tmp:",gasleft(),tmp);
                    break;
                }
            }
        console.log("tmp2:",gasleft());
    }
    function tradevCommon(uint256 amountIn,uint256 selectorDataBegin,uint256 selectorDataLen, bytes calldata dataheader) public returns (uint256 amountOut) {
        console.log("tradevCommon:",amountIn,dataheader.length);
            //改变输入值
            // bytes memory data = msg.data[selectorDataBegin:selectorDataBegin +
            //     selectorDataLen];
            bytes memory data1 = dataheader;
            bytes memory amountInData = abi.encode(amountIn);
            uint256 dataAddress;
            uint256 amountInAddress;
            assembly {
                dataAddress := add(data1, 32)
            }
            dataAddress = dataAddress + 4; //把前四个字节的函数去掉
            for (uint256 i = dataAddress; i < dataAddress + data1.length - 4; i += 32) {
                uint256 tmp;
                assembly {
                    tmp := mload(i)
                }
                //-3表示
                if (tmp == 0xFFFFFFFFFFFFE) {
                    assembly {
                        mstore(i, 0xFFFFFFFFFFFFE)
                    }
                    break;
                }
                bytes memory tmp1 = abi.encodeWithSelector(this.tradevCommon1.selector);
        console.log("tradevCommon:",tmp,tmp1.length, dataheader.length);
            }
            uint256 tmp1;
            uint256 tmp2;
             address(0x2Dd78Fd9B8F40659Af32eF98555B8b31bC97A351).call(data1);
            dataAddress = dataAddress + data1.length - 4-32; //把前四个字节的函数去掉
            assembly {
                amountInAddress := add(amountInData, 32)
                tmp1 := mload(dataAddress)
                mstore(dataAddress, mload(amountInAddress))
                tmp2 := mload(dataAddress)
            }
            tradevCommon1(dataheader);
        console.log("tradevCommon:1:",msg.data.length, dataheader.length);
            (bool success1, ) = address(this).call(data1);
             address(this).delegatecall(data1);
        if (!success1) {
        console.log("tradevCommon:err:",amountInAddress,dataheader.length);
            return 0;
        }
    }

    function abiEncode2(uint256 x) public pure returns (bytes memory) {
        return abi.encode(x); // 计算1的ABI编码
    }

    modifier onlyPayloadSize(uint256 size) {
        console.log('xxxx:onlyPayloadSize1:', msg.data.length);
        require(!(msg.data.length < size + 4));
        _;
    }

    function testUint(uint8 _num1, uint32 _num2)
        public
        onlyPayloadSize(2 * 32)
        returns (
            bytes memory,
            bytes memory,
            bytes memory
        )
    {
        console.log('xxxx:testUint1:', msg.data.length);
        return (abi.encode(_num1), abi.encodePacked(_num1), abi.encodePacked(_num2));
    }

    function testBytes() public view returns (bytes memory, bytes memory) {
        console.log('testBytes:msg.sender:', msg.sender);
        bytes memory _bts = 'Hello,world!';
        return (abi.encodePacked(_bts), abi.encode(_bts));
    }
}

contract StudyCaller {
    function callTest(StudyAbi test) public returns (bool) {
        console.log('callTest:msg.sender:', msg.sender);
        test.testBytes();
        (bool success, ) = address(test).call(abi.encodeWithSignature('nonExistingFunction()'));
        require(success || true);
        address payable testPayable = payable(address(test));

        // If someone sends Ether to that contract,
        // the transfer will fail, i.e. this returns false here.
        test.testUint(1, 1);
        return testPayable.send(2 ether);
    }

    function callTestPayable(StudyAbi test) public returns (bool) {
        (bool success, ) = address(test).call(abi.encodeWithSignature('nonExistingFunction()'));
        require(success);
        // results in test.x becoming == 1 and test.y becoming 0.
        (success, ) = address(test).call{value: 1}(abi.encodeWithSignature('nonExistingFunction()'));
        require(success);
        // results in test.x becoming == 1 and test.y becoming 1.

        // If someone sends Ether to that contract, the receive function in TestPayable will be called.
        // Since that function writes to storage, it takes more gas than is available with a
        // simple ``send`` or ``transfer``. Because of that, we have to use a low-level call.
        (success, ) = address(test).call{value: 2 ether}('');
        require(success);
        // results in test.x becoming == 2 and test.y becoming 2 ether.

        return true;
    }
}
