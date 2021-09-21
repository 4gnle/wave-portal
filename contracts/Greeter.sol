// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greetings {

  event newWave(address indexed from, uint timestamp, string message);

  event newHighfive(address indexed from, uint timestamp, string message, string name);

  struct Wave {
    address waver;
    string message;
    uint timestamp;
  }

  struct HighFive {
    address highfiver;
    string message;
    string name;
    uint timestamp;
  }

  uint256 totalWaves;
  uint256 highFives;

  Wave[] waves;
  HighFive[] highfives;

  constructor() {
    console.log("WHAT UP, I am a contract and I am also very smart :)");
  }

  function wave(string memory _message) public {
    totalWaves+= 1;

    waves.push(Wave(msg.sender, _message, block.timestamp));

    emit newWave(msg.sender, block.timestamp, _message);
  }

  function highFive(string memory _message, string memory _name) public {
    highFives +=1;

    highfives.push(HighFive(msg.sender, _message, _name, block.timestamp));
    emit newHighfive(msg.sender, block.timestamp, _message, _name);

    uint prizeAmount = 0.001 ether;
    require(prizeAmount <= address(this).balance, 'Trying to withdraw more money than the contract has');

    (bool success,) = (msg.sender).call{value: prizeAmount}("");

    require(success, "Failed to withdraw money from contract."))
  }

  function getTotalWaves() view public returns (uint256) {
    return totalWaves;
  }

  function getHighfives() view public returns (uint256) {
    return highFives;
  }

  function getSentWAVES() view public returns (Wave[] memory) {
    return waves;
  }

  function getSentHIGHFIVES() view public returns (HighFive[] memory) {
    return highfives;
  }
}
