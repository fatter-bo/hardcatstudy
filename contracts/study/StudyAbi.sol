// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

contract StudyAbi {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
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

    function testUint(uint8 _num1, uint32 _num2) public
        
        pure
        returns (bytes memory, bytes memory)
    {
        return (abi.encode(_num1), abi.encodePacked(_num2));
    }

    function testBytes() public pure returns (bytes memory, bytes memory) {
        bytes memory _bts = 'Hello,world!';
        return (abi.encodePacked(_bts), abi.encode(_bts));
    }
}
