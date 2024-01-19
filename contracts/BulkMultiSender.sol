// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BulkMultiSender {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function sendEth(address[] memory recipients, uint256[] memory amounts) external payable onlyOwner {
        require(recipients.length == amounts.length, "Arrays must have the same length");

        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            uint256 amount = amounts[i];
            payable(to).transfer(amount);
        }
    }
}
