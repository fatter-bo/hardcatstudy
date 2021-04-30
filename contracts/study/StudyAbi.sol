// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Address.sol';

contract StudyAbi {
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

    function abiEncode1() public pure returns (bytes memory) {
        return abi.encode('1'); // 计算1的ABI编码
    }

    function abiEncode2(uint256 x) public pure returns (bytes memory) {
        return abi.encode(x); // 计算1的ABI编码
    }

    function testUint(uint8 _num1, uint32 _num2)
        public
        pure
        returns (
            bytes memory,
            bytes memory,
            bytes memory
        )
    {
        return (abi.encode(_num1), abi.encodePacked(_num1), abi.encodePacked(_num2));
    }

    function testBytes() public pure returns (bytes memory, bytes memory) {
        bytes memory _bts = 'Hello,world!';
        return (abi.encodePacked(_bts), abi.encode(_bts));
    }
}

contract StudyCaller {
    function callTest(StudyAbi test) public returns (bool) {
        (bool success, ) = address(test).call(abi.encodeWithSignature('nonExistingFunction()'));
        require(success || true);
        address payable testPayable = payable(address(test));

        // If someone sends Ether to that contract,
        // the transfer will fail, i.e. this returns false here.
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
