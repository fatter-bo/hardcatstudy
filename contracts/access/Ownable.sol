// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import "../utils/Context.sol";

/// @title 是否是合约拥有者基类
/// @author 
/// @notice 
/// @dev 
abstract contract Ownable is Context {
    address private _owner;

    // 移交权限事件
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev 构造函数,合约的创建者设置为owner
     */
    constructor (address addr) {
        _owner = addr;
        if (addr != address(0)) {
            emit OwnershipTransferred(address(0), _owner);
        }
    }

    /**
     * @dev 返回拥有者
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev 如果不是owner就报错
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev 清除拥有者,永远不可再设置
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev 移交拥有者
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
