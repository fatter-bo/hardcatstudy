// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import "./IERC20Minimal.sol";
/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 is IERC20Minimal{
    /**
     * @dev 返回代币名称
     */
    function name() external view returns (string memory);

    /**
     * @dev 返回代币符号,比如USDT
     */
    function symbol() external view returns (string memory);

    /**
     * @dev 返回代币精度
     */
    function decimals() external view returns (uint8);
    /**
     * @dev 返回总发行量
     */
    function totalSupply() external view returns (uint256);
}
