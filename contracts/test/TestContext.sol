// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;

import '../utils/Context.sol';

contract TestContext is Context{

    event Send(address indexed sender,address indexed sender1);

    function msgSender(address sender) public {
        emit Send(_msgSender(),sender);
    }
}

contract TestContextCall  is Context{
    function callSender(TestContext context) public {
         context.msgSender(_msgSender());
    }
}
