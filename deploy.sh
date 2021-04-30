#!/bin/bash

npx hardhat run --network ganache  ./scripts/deploy.ts
#npx hardhat run --network bsctestnet  ./scripts/deploy.ts
#npx hardhat run --network bsc  ./scripts/deploy.ts
#npx hardhat tenderly:verify StudyDelegate=0x211BE2e55B35ed4952EC06F2EF638a41DE489b75 --network rinkeby
#npx hardhat tenderly:push StudyDelegate=0x211BE2e55B35ed4952EC06F2EF638a41DE489b75 --network rinkeby
