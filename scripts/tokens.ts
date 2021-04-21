
export const TOKENS_BSC_TESTNET = [
    {symbol:'tUSDC',address:'0x0b2af20b7ef759b1540a8844740bfe7ef4e5d1de'},
    {symbol:'BUSD',address:'0x0b2af20b7ef759b1540a8844740bfe7ef4e5d1de'},
    {symbol:'WBNB',address:'0xae13d989dac2f0debff460ac112a837c89baa7cd'},
];

export const TOKENS_BSC = [
    {symbol:'USDC',address:'0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'},
    {symbol:'WBNB',address:'0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095'},
    {symbol:'Cake',address:'0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'},
];

export const TOKENS_RINKEBY = [
];

export const TOKENS_MAINNET = [
];

export const TOKENS = {
    bsctestnet:TOKENS_BSC_TESTNET,
    bsc:TOKENS_BSC,
    rinkeby:TOKENS_RINKEBY,
    mainnet:TOKENS_MAINNET,
}
export function getTokensByNetwork(name: string) :Array<{symbol:string,address:string}>|null {
    switch(name){
        case "bsctestnet":
            return TOKENS_BSC_TESTNET;
        case "bsc":
            return TOKENS_BSC;
        case "rinkeby":
            return TOKENS_RINKEBY;
        case "mainnet":
            return TOKENS_MAINNET;
    }
    return null;
}