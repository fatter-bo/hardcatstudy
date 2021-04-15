// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract ConfigAddress {
  event UpsertConfig(address indexed factoryAddress,address indexed routerAddress,address wethToken,address usdtToken,string blockUrl);
  struct Config {
    // 工厂合约地址
    address factoryAddress;
    // 外围路由合约 Router
    address routerAddress;
    // WETH合约地址
    address wethToken;
    // USDT合约地址
    address usdtToken;

    // 区块浏览器地址
    string blockUrl;
  }

  mapping(address => Config) public configMap;

  constructor() {

  }

  //插入更新
  function upsert(address factoryAddress,address routerAddress,address wethToken,address usdtToken,string memory blockUrl) public {
    require(factoryAddress != address(0),"factoryAddress invalid");
    require(routerAddress != address(0),"routerAddress invalid");
    require(wethToken != address(0),"wethToken invalid");
    require(usdtToken != address(0),"usdtToken invalid");
    Config memory config;
    config.factoryAddress = factoryAddress;
    config.routerAddress = routerAddress;
    config.wethToken = wethToken;
    config.usdtToken = usdtToken;
    config.blockUrl = blockUrl;
    configMap[factoryAddress] = config;
    emit UpsertConfig(factoryAddress,routerAddress,wethToken,usdtToken,blockUrl);
  }

  function updateRouterAddress(address factoryAddress,address routerAddress) public {
    Config memory config  = configMap[factoryAddress];
    upsert(config.factoryAddress,routerAddress,config.wethToken,config.usdtToken,config.blockUrl);
  }

  function getConfig(address factoryAddress) public view returns(Config memory config) {
    return config = configMap[factoryAddress];
  }

  function updateWethToken(address factoryAddress,address wethToken) public {
    Config memory config  = configMap[factoryAddress];
    upsert(config.factoryAddress,config.routerAddress,wethToken,config.usdtToken,config.blockUrl);
  }

  function updateUsdtToken(address factoryAddress,address usdtToken) public {
    Config memory config  = configMap[factoryAddress];
    upsert(config.factoryAddress,config.routerAddress,config.wethToken,usdtToken,config.blockUrl);
  }

  function updateBlockUrl(address factoryAddress,string memory blockUrl) public {
    Config memory config  = configMap[factoryAddress];
    upsert(config.factoryAddress,config.routerAddress,config.wethToken,config.usdtToken,blockUrl);
  }

}
