// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

/**
 * @dev 数学函数,检查溢出情况
 *      如果出现溢出就回滚
 */
library SafeMath {
    /**
     * @dev 返回时包括一个bool值,标注是否溢出
     *
     */
    function tryAdd(uint256 x, uint256 y) internal pure returns (bool, uint256) {
        uint256 z = x + y;
        if (z < x) return (false, 0);
        return (true, z);
    }

    /**
     * @dev 返回时包括一个bool值,标注是否溢出
     *
     */
    function trySub(uint256 x, uint256 y) internal pure returns (bool, uint256) {
        if (y > x) return (false, 0);
        return (true, x - y);
    }

    /**
     * @dev 返回时包括一个bool值,标注是否溢出
     *
     */
    function tryMul(uint256 x, uint256 y) internal pure returns (bool, uint256) {
        if (x == 0) return (true, 0);
        uint256 z = x * y;
        if (z / x != y) return (false, 0);
        return (true, z);
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 x, uint256 y) internal pure returns (bool, uint256) {
        if (y == 0) return (false, 0);
        return (true, x / y);
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 x, uint256 y) internal pure returns (bool, uint256) {
        if (y == 0) return (false, 0);
        return (true, x % y);
    }

    /// @notice Returns x + y, 如果溢出就回滚
    /// @param x The augend
    /// @param y The addend
    /// @return z The sum of x and y
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        return add(x,y,"SafeMath: add uint256 overflow");
    }
    function add(uint256 x, uint256 y,string memory errorMessage) internal pure returns (uint256 z) {
        require((z = x + y) >= x,errorMessage);
    }

    /// @notice Returns x + y, 如果溢出就回滚
    /// @param x The augend
    /// @param y The addend
    /// @return z The sum of x and y
    function add(int256 x, int256 y) internal pure returns (int256 z) {
        return add(x,y,"SafeMath: add int256 overflow");
    }
    function add(int256 x, int256 y, string memory errorMessage) internal pure returns (int256 z) {
        require((z = x + y) >= x == (y >= 0),errorMessage);//技巧相当高,确实省gas
    }

    /// @notice Returns x - y, 如果溢出就回滚
    /// @param x The minuend
    /// @param y The subtrahend
    /// @return z The difference of x and y
    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        return sub(x,y,"SafeMath: sub uint256  overflow");
    }
    function sub(uint256 x, uint256 y, string memory errorMessage) internal pure returns (uint256 z) {
        require((z = x - y) <= x,errorMessage);
    }

    /// @notice Returns x - y, 如果溢出就回滚
    /// @param x The minuend
    /// @param y The subtrahend
    /// @return z The difference of x and y
    function sub(int256 x, int256 y) internal pure returns (int256 z) {
        return sub(x,y,"SafeMath: sub int256  overflow");
    }
    function sub(int256 x, int256 y, string memory errorMessage) internal pure returns (int256 z) {
        require((z = x - y) <= x == (y >= 0),errorMessage);//技巧相当高,确实省gas
    }

    /// @notice Returns x * y, 如果溢出就回滚
    /// @param x The multiplicand
    /// @param y The multiplier
    /// @return z The product of x and y
    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        return mul(x,y,"SafeMath: mul uint256  overflow");
    }
    function mul(uint256 x, uint256 y, string memory errorMessage) internal pure returns (uint256 z) {
        require(x == 0 || (z = x * y) / x == y,errorMessage);
    }

    /// @notice Returns x % y, 如果溢出就回滚
    /// @param x The multiplicand
    /// @param y The multiplier
    /// @return z The product of x and y
    function div(uint256 x, uint256 y) internal pure returns (uint256) {
        return div (x ,y , "SafeMath: div uint256 by zero");
    }
    function div(uint256 x, uint256 y, string memory errorMessage) internal pure returns (uint256) {
        require(y > 0, errorMessage);
        return x / y;
    }

    /// @notice Returns x % y, 如果溢出就回滚
    /// @param x The multiplicand
    /// @param y The multiplier
    /// @return z The product of x and y
    function mod(uint256 x, uint256 y) internal pure returns (uint256) {
        return mod(x, y, "SafeMath: mod uint256  overflow");
    }
    function mod(uint256 x, uint256 y, string memory errorMessage) internal pure returns (uint256) {
        require(y > 0, errorMessage);
        return x % y;
    }
}
