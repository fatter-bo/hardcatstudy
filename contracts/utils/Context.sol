// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

/*
 * @dev 返回msg数据的基类
 *
 * 不能构造,只能被继承
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}
