// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Address.sol';

import 'hardhat/console.sol';

contract StudyInc {
    using Address for address;
    uint256 public x;
    uint256 public y;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    fallback() external {}

    event Inc(uint256);

    function inc(uint256 i) public {
        x = i;
        y = 2 * i;
        emit Inc(x);
    }

    function getxy() public view returns (uint256, uint256) {
        console.log('sssssssss:', x, y);
        return (x, y);
    }

    function faucet(address addr) public returns (address) {
        if (false) {
            (bool success, bytes memory retdata) =
                addr.staticcall(abi.encodeWithSelector(bytes4(keccak256('faucet(uint256)')), 1.1 ether));
            if (!success) {
                return address(0);
            }
            return abi.decode(retdata, (address));
        } else {
            (bool success, bytes memory retdata) =
                addr.call(abi.encodeWithSelector(bytes4(keccak256('faucet(uint256)')), 1.1 ether));
            //(bool success,bytes memory retdata) = addr.delegatecall(abi.encodeWithSelector(bytes4(keccak256("faucet(uint256)")),1.1 ether));
            if (!success) {
                return address(0);
            }
            return abi.decode(retdata, (address));
        }
    }

    event GetAddress(address indexed addr);

    function getAddress() public returns (address) {
        emit GetAddress(msg.sender);
        return msg.sender;
    }
}

contract StudyDelegate {
    using Address for address;
    uint256 public x;
    uint256 public y;

    function functionCall(address addr, string memory errorMessage) public {
        x++;
        y = 2 * x;
        addr.functionCall(abi.encodeWithSelector(bytes4(keccak256('inc1(uint256)')), 11 ether), errorMessage);
    }

    function faucet(address addr) public returns (address) {
        if (true) {
            (, bytes memory retdata) =
                addr.staticcall(abi.encodeWithSelector(bytes4(keccak256('faucet(uint256)')), 1.1 ether));
            return abi.decode(retdata, (address));
        } else {
            (, bytes memory retdata) = addr.call(abi.encodeWithSelector(bytes4(keccak256('inc(uint256)')), 1.1 ether));
            return abi.decode(retdata, (address));
        }
    }

    function inc_call(address addr) public {
        console.log('sssssssss:inc_call:', addr);
        (uint256 addx, uint256 addy) = staticcall(addr);
        addx += addy + 1;
        //(bool sucess,) = addr.call(bytes4(keccak256("inc()")));
        (bool sucess, ) = addr.call(abi.encodeWithSelector(bytes4(keccak256('inc(uint256)')), addx));
        require(sucess);
    }

    function inc_delegatecall(address addr) public {
        (uint256 addx, uint256 addy) = staticcall(addr);
        addx += addy + 1;
        //(bool sucess,) = addr.callcode(bytes4(keccak256("inc()")));
        (bool sucess, ) = addr.delegatecall(abi.encodeWithSelector(bytes4(keccak256('inc(uint256)')), addx));
        require(sucess);
    }

    function staticcall(address addr) public view returns (uint256, uint256) {
        //(bool sucess,) = addr.callcode(bytes4(keccak256("inc()")));
        (bool sucess, bytes memory retdata) = addr.staticcall(abi.encodeWithSelector(bytes4(keccak256('getxy()'))));
        require(sucess);
        return abi.decode(retdata, (uint256, uint256));
    }

    function encode() public pure returns (bytes memory) {
        //return abi.encodeWithSelector(bytes4(keccak256("inc(uint256)")), 2);
        return abi.encode(bytes4(keccak256('inc(uint256)')), 2);
    }

    function keccak() public pure returns (bytes32) {
        return keccak256('inc()');
    }

    function getAddress(address addr) public returns (address) {
        if (false) {
            (bool success, bytes memory retdata) =
                addr.staticcall(abi.encodeWithSelector(bytes4(keccak256('faucet(uint256)')), 1.1 ether));
            if (!success) {
                return address(0);
            }
            return abi.decode(retdata, (address));
        } else {
            (bool success, bytes memory retdata) = addr.call(abi.encodeWithSelector(bytes4(keccak256('getAddress()'))));
            //(bool success,bytes memory retdata) = addr.delegatecall(abi.encodeWithSelector(bytes4(keccak256("faucet(uint256)")),1.1 ether));
            if (!success) {
                return address(0);
            }
            return abi.decode(retdata, (address));
        }
    }
}
