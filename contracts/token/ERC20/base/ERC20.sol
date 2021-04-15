// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import "../../../utils/Context.sol";
import "./IERC20.sol";
import "../../../utils/math/SafeMath.sol";

/**
 * @dev 实现 {IERC20} interface.
 *
 */
contract ERC20 is Context, IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 public override totalSupply;

    string public override name;
    string public override symbol;
    uint8 public override decimals;

    /**
     * @dev 构造代币
     *
     * 只能初始化时赋值一次不能修改
     */
    constructor (string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), to, amount);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` 非0被授者
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * 基于授信的转币,不能超过授信额度
     *
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        _transfer(from, to, amount);
        _approve(from, _msgSender(), _allowances[from][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    /**
     * @dev 调用者msg.sender增加授权额度给spender
     *
     * 触发事件{Approval}
     *
     * Requirements:
     *
     * - `spender` 非0地址
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    /**
     * @dev 减少调用者对spender的授权额度
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * 触发{Approval}事件,刷新授权额度
     *
     * Requirements:
     *
     * - `spender` 非0地址,必须已经有足够授权额度
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    /**
     * @dev 转账的真正操作,权限判断等都在之前完成
     *
     *
     * @notice 触发事件{Transfer}
     * 数据溢出就回滚
     *
     * - `from` 转出方,非0地址
     * - `to` 转入方,非0地址
     */
    function _transfer(address from, address to, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        // 如果需要加其他限制条件可以实现这个前置函数
        _beforeTokenTransfer(from, to, amount);

        _balances[from] = _balances[from].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[to] = _balances[to].add(amount);
        emit Transfer(from, to, amount);
    }

    /** @dev 铸币函数,会增加总发行量totalSupply
     * the total supply.
     *
     * 触发事件{Transfer} 事件,from=0
     *
     * Requirements:
     *
     * - `to` 非0地址
     */
    function _mint(address to, uint256 amount) internal virtual {
        require(to != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), to, amount);

        totalSupply = totalSupply.add(amount);
        _balances[to] = _balances[to].add(amount);
        emit Transfer(address(0), to, amount);
    }
    modifier ValidAddress(address addr){
        require(addr != address(0), "ERC20: mint to the zero address");
        _;
    }

    /// @notice 水龙头
    function faucet(uint256 amount) public returns(address){
       _mint(_msgSender(), amount); 
       _mint(address(this), amount); 
        emit Transfer(address(this), _msgSender(), amount);
       return _msgSender();
    }

    /**
     * @dev 销毁代币,影响totalSupply
     *
     * 触发{Transfer}事件,to=0
     *
     * Requirements:
     *
     * - `from` 非0地址,必须有足够数量可以销毁
     */
    function _burn(address from, uint256 amount) internal virtual {
        require(from != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(from, address(0), amount);

        _balances[from] = _balances[from].sub(amount, "ERC20: burn amount exceeds balance");
        totalSupply = totalSupply.sub(amount);
        emit Transfer(from, address(0), amount);
    }

    /**
     * @dev 授权接口,是直接奢者,而不是增减
     *
     *
     * 触发{Approval}事件
     *
     * - `owner` 非0地址,这里没有检查是否有足够的代币,因为检查了在使用前也有可能已经被用掉
     *           这里没想好,感觉还是检查的会比较好,不然有会被挖坑的感觉
     * - `spender` 被授权方,非0地址
     */
    function _approve(address owner, address spender, uint256 value) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev 转币操作前可以加一个钩子函数,做前置判断,转账,铸币,销毁
     *
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
