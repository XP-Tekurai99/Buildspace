// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DreamPortal
{
    uint256 totalDreams;
    uint256 private seed; // helps generate a random number

    event NewDream(address indexed from, uint256 timestamp, string message);

    struct Dream
    {
        address waver;
        string message;
        uint256 timestamp;
    }

    Dream[] dreams; // stores structs, thus holds all dreams sent

    mapping(address => uint256) public lastWavedAt; // associates an address with a number

    constructor() payable
    {
        console.log("Welcome to Virtuality");

        seed = (block.timestamp + block.difficulty) % 100; // sets the initial seed
    }

    function dream(string memory _message) public
    {
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15m"); // checks if the current time stamp is at least 15 minutes bigger than the last dream's timestamp

        lastWavedAt[msg.sender] = block.timestamp; // updates the current timestamp for an address


        totalDreams += 1;
        console.log("%s submitted a dream!", msg.sender, _message); // outputs the wallet address of the user that called the function
        
        dreams.push(Dream(msg.sender, _message, block.timestamp)); // inputs dream data into the Dream array

        seed = (block.difficulty + block.timestamp + seed) % 100; // generates a new seed for the next address that sends a wave

        console.log("Random # generated: %d", seed);

        if (seed < 50) // gives a 50% chance that the user wins the prize.
        {
            console.log("%s won!", msg.sender);

            uint256 prize = 0.0001 ether;
            require(
                prize <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool valid, ) = (msg.sender).call{value: prize}("");
            require(valid, "Failed to withdraw money from contract.");
        }

        emit NewDream(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = 0.0001 ether;
        require
        (
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    function getAllDreams() public view returns (Dream[] memory)
    {
        console.log("Dream Total: %d", totalDreams);
        return dreams;
    }

    function getTotalDreams() public view returns (uint256)
    {
        console.log("Dream Total: %d", totalDreams);
        return totalDreams;
    }
}
