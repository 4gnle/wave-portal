// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

  uint256 totalWaves;
  uint256 highFives;

  constructor() {
    console.log("WHAT UP, I am a contract and I am also very smart :)");
  }

  function wave() public {
    totalWaves+= 1;
    console.log("%s is waved!", msg.sender);
  }

  function getTotalWaves() view public returns (uint256) {
    console.log("we have %d total waves", totalWaves);
    return totalWaves;
  }

  function getHighfives() view public returns (uint256) {
    console.log("we have %d total highfives", highFives);
    return highFives;
  }

  function waveAndHighFive() public {
    totalWaves +=1;
    highFives +=1;
    console.log("%s is waved and high-fived", msg.sender);
  }
}
