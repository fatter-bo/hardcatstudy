// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20Minimal {

    /**
     * @dev 返回账户余额
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev 将代币从调用者{msg.sender}转到目标地址
     *
     * 返回操作是否成功
     *
     * 需要触发 {Transfer} 事件
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev 查询授信接口
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev 调用者给spender授信额度
     *
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * 基于授信的转币,不能超过授信额度
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev 转账事件
     *
     * {value}可以是0
     */
    event Transfer(address indexed from, address indexed to, uint256 amount);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}
