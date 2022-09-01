// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal
{
    uint256 totalWaves;

    constructor()
    {
        console.log("Ahoy, welcome to the Krusty Krab!");
    }

    function wave() public
    {
        totalWaves += 1;
        console.log("%s sent a wave!", msg.sender); // outputs the wallet address of the user that called the function
    }

    function getTotalWaves() public view returns (uint256)
    {
        console.log("Wave total: %d", totalWaves);
        return totalWaves;
    }
}
