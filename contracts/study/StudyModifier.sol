// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Address.sol';

import 'hardhat/console.sol';

contract StudyModifer {
    uint256 private _locked = 1;
    uint256[] public list;

    constructor() {
        for (uint256 index = 0; index < 100; index++) {
            list.push(index);
        }
    }

    modifier lock() {
        require(_locked == 1, 'locked');
        console.log('_locked beg:', _locked);
        _locked = 0;
        _; //这里相当于调用函数的函数体,上面和下面部分被插入到函数体里执行
        console.log('_locked end:', _locked);
        _locked = 1;
    }

    function testModifierOk() public payable lock {
        uint256 index = 0;
        for (index = 0; index < list.length; index++) {
            index++;
        }
        delete list;
        list.push(index);
        // payable(address(this)).call{value: 1}('');
        console.log('testModifierOk:', list.length, msg.value);
    }

    function testModifierErr() public payable lock {
        console.log('testModifierErr:', payable(address(this)).balance);
        payable(address(msg.sender)).call{value: 1}('');
        console.log('testModifierErr:', payable(address(this)).balance);
        // payable(address(msg.sender)).transfer(1);
        // testModifierOk();
    }

    // function testList() public returns (uint256[] memory list) {
    //     list.push(1);
    // }
}
