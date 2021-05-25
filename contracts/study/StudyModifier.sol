// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Address.sol';

import 'hardhat/console.sol';

contract StudyModifer {
    uint256 private _locked = 1;
    modifier lock() {
        require(_locked == 1, 'locked');
        console.log('_locked beg:', _locked);
        _locked = 0;
        _;
        console.log('_locked end:', _locked);
        _locked = 1;
    }

    function testModifierOk() public lock {
        console.log('testModifierOk');
    }

    function testModifierErr() public lock {
        console.log('testModifierErr');
        testModifierOk();
    }
}
