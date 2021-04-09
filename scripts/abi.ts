 import { AbiCoder } from 'web3-eth-abi'

 //const abi = new AbiCoder();
 // 这里为了正常引入abi,浪费了几个小时,这样写。。。
//const abiCoder = (Web3Abi as unknown) as AbiCoder
let abiCoder : AbiCoder = require('web3-eth-abi');

console.log(abiCoder.encodeParameters(['uint256', 'string'], ['2345675643', 'Hello!%']));
console.log(abiCoder.decodeParameters(['uint256', 'string'],'0x000000000000000000000000000000000000000000000000000000008bd02b7b0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000748656c6c6f212500000000000000000000000000000000000000000000000000'));
let log = abiCoder.decodeLog(
    // $ExpectError
    [
        {
            type: 'uint256',
            name: 'myNumber',
            indexed: true
        },
        {
            type: 'uint256',
            name: 'myNumber1',
            indexed: true
        },
        {
            type: 'string',
            name: 'myString'
        },
    ],
    `0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000`,
    [
        '0x0000000000000000000000000000000000000000000000000000000000000010',
        '0x000000000000000000000000000000000000000000000000000000000000f310',
    ]
);
console.log("xxxxxx",log);
log = abiCoder.decodeParameter(
    'uint256',
    '0x0000000000000000000000000000000000000000000000000000000000000010'
);
console.log("xxxxxx",log);
