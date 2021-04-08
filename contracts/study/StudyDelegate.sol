// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "../utils/Address.sol";

contract StudyInc {
    uint public x;
    uint public y;
    function inc(uint i)public {
       x = i; 
       y = 2*i; 
    }
    function getxy() public view returns(uint,uint) {
        return (x,y);
    }
}

contract StudyDelegate {
    uint public x;
    uint public y;
    function inc_call(address addr) public {
        (uint addx,uint addy) = staticcall(addr);
        addx += addy + 1;
       //(bool sucess,) = addr.call(bytes4(keccak256("inc()")));
       (bool sucess,) = addr.call(abi.encodeWithSelector(bytes4(keccak256("inc(uint256)")),addx));
       require(sucess);
    }
    function inc_delegatecall(address addr) public {
        (uint addx,uint addy) = staticcall(addr);
        addx += addy + 1;
       //(bool sucess,) = addr.callcode(bytes4(keccak256("inc()")));
       (bool sucess,) = addr.delegatecall(abi.encodeWithSelector(bytes4(keccak256("inc(uint256)")),addx));
       require(sucess);
    }
    function staticcall(address addr) public view returns(uint, uint){
       //(bool sucess,) = addr.callcode(bytes4(keccak256("inc()")));
       (bool sucess,bytes memory retdata) = addr.staticcall(abi.encodeWithSelector(bytes4(keccak256("getxy()"))));
       require(sucess);
       return abi.decode(retdata,(uint,uint));
    }
    function encode() public pure returns(bytes memory){
        //return abi.encodeWithSelector(bytes4(keccak256("inc(uint256)")), 2);
        return abi.encode(bytes4(keccak256("inc(uint256)")),2);
    }
    function keccak() public pure returns(bytes32){
        return keccak256("inc()");
    }
}