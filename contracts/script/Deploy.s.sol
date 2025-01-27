// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/ESGICertificate.sol";

contract DeployESGICertificate is Script {
    function run() external {
        // Retrieve private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        ESGICertificate certificate = new ESGICertificate();

        // Optional: Setup additional roles or configurations
        // certificate.grantRole(certificate.MINTER_ROLE(), OTHER_ADDRESS);

        vm.stopBroadcast();

        // Log the deployment
        console.log("ESGICertificate deployed at:", address(certificate));
    }
}
