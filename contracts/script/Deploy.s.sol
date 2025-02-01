// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ESGICertificate.sol";

contract DeployESGICertificate is Script {
    function run() external {
        // Retrieve private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Configure before broadcasting
        vm.startBroadcast(deployerPrivateKey);

        // Paramètres gas plus bas
        uint256 gasPrice = 1;
        uint256 gasLimit = 3000000;
        
        // Deploy the contract
        ESGICertificate certificate = new ESGICertificate{gas: gasLimit}();

        vm.stopBroadcast();

        // Log the deployment
        console.log("ESGICertificate deployed at:", address(certificate));
    }
}